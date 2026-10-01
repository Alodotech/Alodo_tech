import { redirect } from "next/navigation";

export default function MpmeDashboardPage() {
  // En aucun cas les MPME n'ont accès à un dashboard actuellement
  redirect("/mpme");
}
