type AdminLookup = {
  from: (table: string) => {
    select: (columns: string) => {
      ilike: (column: string, value: string) => {
        limit: (count: number) => PromiseLike<{ data: { id: string }[] | null }>;
      };
    };
  };
};

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
