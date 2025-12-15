import { Outlet } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <AdminNavbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
