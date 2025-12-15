import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/Login";
import AdminDashboard from "./pages/Dashboard";
import AdminLayout from "./AdminLayout";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Users from "./pages/Users";
import Certificates from "./pages/Certificates";

export default function AdminApp() {
  return (
    <Routes>
      {/* Login */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected Admin Area */}
      <Route
        path=""
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="users" element={<Users />} />
        <Route path="certificates" element={<Certificates />} />
      </Route>
    </Routes>
  );
}
