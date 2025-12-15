import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UploadProject from "./pages/user/UploadProject";
import Certificates from "./pages/user/Certificates";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserDashboard from "./pages/user/Dashboard";
import AuthRedirect from "./routes/AuthRedirect";
import MyProjects from "./pages/user/MyProjects";
import AdminApp from "./admin/AdminApp";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />

      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<AuthRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <UploadProject />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/certificates"
                element={
                  <ProtectedRoute>
                    <Certificates />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/my-projects"
                element={
                  <ProtectedRoute>
                    <MyProjects />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </>
        }
      />
    </Routes>
  );
}
