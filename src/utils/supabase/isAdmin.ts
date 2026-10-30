type AdminLookup = {
  from: (table: string) => {
    select: (columns: string) => {
      ilike: (column: string, value: string) => {
        limit: (count: number) => PromiseLike<{ data: { id: string }[] | null }>;
      };
    };
  };
};

export type ConsoleRole = "admin" | "partenaire";

export async function isListedAdmin(
  supabase: AdminLookup,
  email: string | null | undefined
) {
  const normalized = email?.trim().toLowerCase() ?? "";
  if (!normalized.includes("@")) return false;

  const { data } = await supabase
    .from("admins")
    .select("id")
    .ilike("email", normalized)
    .limit(1);

  return Array.isArray(data) && data.length > 0;
}

export async function getConsoleRole(
  supabase: AdminLookup,
  email: string | null | undefined
): Promise<ConsoleRole | null> {
  if (await isListedAdmin(supabase, email)) return "admin";

  const normalized = email?.trim().toLowerCase() ?? "";
  if (!normalized.includes("@")) return null;

  const { data, error } = await (supabase as unknown as {
    from: (table: string) => {
      select: (columns: string) => {
        ilike: (column: string, value: string) => {
          limit: (count: number) => PromiseLike<{
            data: { role?: string }[] | null;
            error: { message: string } | null;
          }>;
        };
      };
    };
  })
    .from("console_users")
    .select("role")
    .ilike("email", normalized)
    .limit(1);

  if (!error && Array.isArray(data) && data.length > 0) {
    if (data[0]?.role === "partenaire") return "partenaire";
    if (data[0]?.role === "admin") return "admin";
  }

  if (typeof window !== "undefined") {
    try {
      const response = await fetch("/api/auth/console-role");
      if (response.ok) {
        const payload = await response.json() as { role?: string };
        if (payload.role === "admin" || payload.role === "partenaire") return payload.role;
      }
    } catch {
      return null;
    }
  }

  return null;
}
