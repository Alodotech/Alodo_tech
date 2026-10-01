import { redirect } from "next/navigation";

export default function MpmeLoginPage() {
  // En aucun cas les MPME n'ont accès à un login / dashboard actuellement
  redirect("/mpme");
}
