import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminNavbar() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">SkillForge Admin</h1>

      <div className="flex items-center gap-4">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/projects">Projects</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/certificates">Certificates</Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
