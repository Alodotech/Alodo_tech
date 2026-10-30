import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { isListedAdmin } from "@/utils/supabase/isAdmin";
import {
  deleteFallbackUser,
  listFallbackUsers,
  saveFallbackUser,
} from "@/lib/staff/fallbackStore";

type StaffRole = "admin" | "partenaire";

type StaffRow = {
  email: string;
  role: StaffRole;
  createdAt: string | null;
  applicationIds: string[];
};

type MpmeOption = {
  id: string;
  name: string;
  leaderName: string;
  city: string;
  sector: string;
};

function serviceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY !== "your-service-role-key"
      ? process.env.SUPABASE_SERVICE_ROLE_KEY
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function asRole(value: unknown): StaffRole | null {
  return value === "admin" || value === "partenaire" ? value : null;
}

function missingTable(message: string) {
  return /console_users|partner_assignments|schema cache|PGRST205/i.test(message);
}

async function requireAdmin() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email || !(await isListedAdmin(supabase, user.email))) return null;
  return user.email.trim().toLowerCase();
}

async function listStaff(db: NonNullable<ReturnType<typeof serviceClient>>): Promise<StaffRow[]> {
  const [{ data: consoleRows, error: consoleError }, { data: adminRows, error: adminError }] = await Promise.all([
    db.from("console_users").select("email, role, created_at"),
    db.from("admins").select("email, created_at"),
  ]);

  if (consoleError) throw new Error(consoleError.message);
  if (adminError) throw new Error(adminError.message);

  const byEmail = new Map<string, StaffRow>();

  for (const row of consoleRows || []) {
    const email = normalizeEmail(row.email);
    const role = asRole(row.role);
    if (!email || !role) continue;
    byEmail.set(email, { email, role, createdAt: row.created_at || null, applicationIds: [] });
  }

  for (const row of adminRows || []) {
    const email = normalizeEmail(row.email);
    if (!email) continue;
    const existing = byEmail.get(email);
    byEmail.set(email, {
      email,
      role: "admin",
      createdAt: existing?.createdAt || row.created_at || null,
      applicationIds: [],
    });
  }

  return Array.from(byEmail.values()).sort((a, b) => a.email.localeCompare(b.email));
}

async function syncRole(
  db: NonNullable<ReturnType<typeof serviceClient>>,
  email: string,
  role: StaffRole
) {
  const { error: consoleError } = await db
    .from("console_users")
    .upsert({ email, role }, { onConflict: "email" });

  if (consoleError) throw new Error(consoleError.message);

  if (role === "admin") {
    const { error } = await db.from("admins").upsert({ email }, { onConflict: "email" });
    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await db.from("admins").delete().ilike("email", email);
  if (error) throw new Error(error.message);
}

function asIds(value: unknown) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((id): id is string => typeof id === "string" && id.trim().length > 0)));
}

async function syncAssignments(
  db: NonNullable<ReturnType<typeof serviceClient>>,
  email: string,
  role: StaffRole,
  applicationIds: string[]
) {
  const { error: deleteError } = await db.from("partner_assignments").delete().ilike("partner_email", email);
  if (deleteError) throw new Error(deleteError.message);
  if (role !== "partenaire" || applicationIds.length === 0) return;

  const { error } = await db.from("partner_assignments").insert(
    applicationIds.map((applicationId) => ({
      partner_email: email,
      application_id: applicationId,
    }))
  );
  if (error) throw new Error(error.message);
}

async function listAssignments(db: NonNullable<ReturnType<typeof serviceClient>>) {
  const { data, error } = await db.from("partner_assignments").select("partner_email, application_id");
  if (error) throw new Error(error.message);
  const byEmail = new Map<string, string[]>();
  for (const row of data || []) {
    const email = normalizeEmail(row.partner_email);
    if (!email || !row.application_id) continue;
    const current = byEmail.get(email) || [];
    current.push(String(row.application_id));
    byEmail.set(email, current);
  }
  return byEmail;
}

async function listMpmes(db: NonNullable<ReturnType<typeof serviceClient>>): Promise<MpmeOption[]> {
  const { data, error } = await db
    .from("applications")
    .select("id, companies(name, leader_name, city, sector)")
    .order("submitted_at", { ascending: false });
  if (error) throw new Error(error.message);

  return (data || []).map((row: {
    id: string;
    companies?: { name?: string; leader_name?: string; city?: string; sector?: string } | { name?: string; leader_name?: string; city?: string; sector?: string }[] | null;
  }) => {
    const company = Array.isArray(row.companies) ? row.companies[0] : row.companies;
    return {
      id: row.id,
      name: company?.name || "Entreprise",
      leaderName: company?.leader_name || "Dirigeant",
      city: company?.city || "",
      sector: company?.sector || "",
    };
  });
}

async function loadDirectory(db: NonNullable<ReturnType<typeof serviceClient>>) {
  try {
    const users = await listStaff(db);
    const assignments = await listAssignments(db);
    for (const user of users) {
      user.applicationIds = user.role === "partenaire" ? assignments.get(user.email) || [] : [];
    }
    return { users, remote: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!missingTable(message)) throw error;

    const { data: adminRows, error: adminError } = await db.from("admins").select("email, created_at");
    if (adminError) throw new Error(adminError.message);

    const byEmail = new Map<string, StaffRow>();
    for (const user of listFallbackUsers()) {
      byEmail.set(user.email, {
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        applicationIds: user.role === "partenaire" ? user.applicationIds : [],
      });
    }
    for (const row of adminRows || []) {
      const email = normalizeEmail(row.email);
      if (!email) continue;
      byEmail.set(email, {
        email,
        role: "admin",
        createdAt: row.created_at || null,
        applicationIds: [],
      });
    }
    return {
      users: Array.from(byEmail.values()).sort((a, b) => a.email.localeCompare(b.email)),
      remote: false,
    };
  }
}

async function saveAccount(
  db: NonNullable<ReturnType<typeof serviceClient>>,
  email: string,
  role: StaffRole,
  applicationIds: string[],
  createdAt?: string | null
) {
  try {
    await syncRole(db, email, role);
    await syncAssignments(db, email, role, applicationIds);
    deleteFallbackUser(email);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!missingTable(message)) throw error;
    if (role === "admin") {
      const { error: adminError } = await db.from("admins").upsert({ email }, { onConflict: "email" });
      if (adminError) throw new Error(adminError.message);
    } else {
      await db.from("admins").delete().ilike("email", email);
    }
    saveFallbackUser(email, role, applicationIds, createdAt);
  }
}

export async function GET() {
  const actor = await requireAdmin();
  if (!actor) return NextResponse.json({ message: "Accès réservé aux administrateurs." }, { status: 403 });

  const db = serviceClient();
  if (!db) return NextResponse.json({ message: "Supabase n'est pas configuré." }, { status: 500 });

  try {
    const mpmes = await listMpmes(db);
    const { users } = await loadDirectory(db);
    return NextResponse.json({ users, mpmes, actor });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lecture impossible.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const actor = await requireAdmin();
  if (!actor) return NextResponse.json({ message: "Accès réservé aux administrateurs." }, { status: 403 });

  const body = await request.json().catch(() => null);
  const email = normalizeEmail(body?.email);
  const role = asRole(body?.role);
  if (!isEmail(email) || !role) {
    return NextResponse.json({ message: "Indiquez un e-mail valide et un rôle." }, { status: 400 });
  }

  const db = serviceClient();
  if (!db) return NextResponse.json({ message: "Supabase n'est pas configuré." }, { status: 500 });

  try {
    const { users } = await loadDirectory(db);
    if (users.some((user) => user.email === email)) {
      return NextResponse.json({ message: "Cet e-mail est déjà enregistré." }, { status: 409 });
    }
    await saveAccount(db, email, role, role === "partenaire" ? asIds(body?.applicationIds) : []);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Enregistrement impossible.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const actor = await requireAdmin();
  if (!actor) return NextResponse.json({ message: "Accès réservé aux administrateurs." }, { status: 403 });

  const body = await request.json().catch(() => null);
  const currentEmail = normalizeEmail(body?.currentEmail);
  const email = normalizeEmail(body?.email);
  const role = asRole(body?.role);
  if (!isEmail(currentEmail) || !isEmail(email) || !role) {
    return NextResponse.json({ message: "Indiquez un e-mail valide et un rôle." }, { status: 400 });
  }

  const db = serviceClient();
  if (!db) return NextResponse.json({ message: "Supabase n'est pas configuré." }, { status: 500 });

  try {
    const { users, remote } = await loadDirectory(db);
    const current = users.find((user) => user.email === currentEmail);
    if (!current) return NextResponse.json({ message: "Compte introuvable." }, { status: 404 });

    if (email !== currentEmail && users.some((user) => user.email === email)) {
      return NextResponse.json({ message: "Cet e-mail est déjà utilisé." }, { status: 409 });
    }

    if (currentEmail === actor && role !== "admin") {
      return NextResponse.json({ message: "Vous ne pouvez pas retirer votre propre accès administrateur." }, { status: 400 });
    }

    const adminCount = users.filter((user) => user.role === "admin").length;
    if (current.role === "admin" && role !== "admin" && adminCount <= 1) {
      return NextResponse.json({ message: "Il doit rester au moins un administrateur." }, { status: 400 });
    }

    if (email !== currentEmail) {
      if (remote) {
        await db.from("console_users").delete().ilike("email", currentEmail);
        await db.from("admins").delete().ilike("email", currentEmail);
        await db.from("partner_assignments").delete().ilike("partner_email", currentEmail);
      }
      deleteFallbackUser(currentEmail);
    }

    await saveAccount(
      db,
      email,
      role,
      role === "partenaire" ? asIds(body?.applicationIds) : [],
      current.createdAt
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Modification impossible.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const actor = await requireAdmin();
  if (!actor) return NextResponse.json({ message: "Accès réservé aux administrateurs." }, { status: 403 });

  const body = await request.json().catch(() => null);
  const email = normalizeEmail(body?.email);
  if (!isEmail(email)) {
    return NextResponse.json({ message: "E-mail invalide." }, { status: 400 });
  }
  if (email === actor) {
    return NextResponse.json({ message: "Vous ne pouvez pas supprimer votre propre compte." }, { status: 400 });
  }

  const db = serviceClient();
  if (!db) return NextResponse.json({ message: "Supabase n'est pas configuré." }, { status: 500 });

  try {
    const { users, remote } = await loadDirectory(db);
    const current = users.find((user) => user.email === email);
    if (!current) return NextResponse.json({ message: "Compte introuvable." }, { status: 404 });

    const adminCount = users.filter((user) => user.role === "admin").length;
    if (current.role === "admin" && adminCount <= 1) {
      return NextResponse.json({ message: "Il doit rester au moins un administrateur." }, { status: 400 });
    }

    deleteFallbackUser(email);
    if (remote) {
      const { error: consoleError } = await db.from("console_users").delete().ilike("email", email);
      if (consoleError && !missingTable(consoleError.message)) throw new Error(consoleError.message);
      const { error: assignmentError } = await db.from("partner_assignments").delete().ilike("partner_email", email);
      if (assignmentError && !missingTable(assignmentError.message)) throw new Error(assignmentError.message);
    }
    const { error: adminError } = await db.from("admins").delete().ilike("email", email);
    if (adminError) throw new Error(adminError.message);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Suppression impossible.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
