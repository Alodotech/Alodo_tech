import fs from "fs";
import path from "path";

export type StoredRole = "admin" | "partenaire";

export type StoredStaffUser = {
  email: string;
  role: StoredRole;
  createdAt: string;
  applicationIds: string[];
};

const filePath = path.join(process.cwd(), "data", "console-staff.json");

function readUsers(): StoredStaffUser[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as { users?: StoredStaffUser[] };
    return Array.isArray(parsed.users) ? parsed.users : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredStaffUser[]) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify({ users }, null, 2));
}

export function listFallbackUsers() {
  return readUsers();
}

export function readFallbackRole(email: string): StoredRole | null {
  return readUsers().find((user) => user.email === email)?.role ?? null;
}

export function saveFallbackUser(email: string, role: StoredRole, applicationIds: string[], createdAt?: string | null) {
  const users = readUsers().filter((user) => user.email !== email);
  users.push({
    email,
    role,
    createdAt: createdAt || new Date().toISOString(),
    applicationIds: role === "partenaire" ? applicationIds : [],
  });
  writeUsers(users);
}

export function deleteFallbackUser(email: string) {
  writeUsers(readUsers().filter((user) => user.email !== email));
}
