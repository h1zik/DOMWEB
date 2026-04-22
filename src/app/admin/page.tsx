import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminEditor } from "./admin-editor";

export default function AdminPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }
  return <AdminEditor />;
}
