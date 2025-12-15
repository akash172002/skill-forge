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

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Root auto-redirect */}
        <Route path="/" element={<AuthRedirect />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
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
  );
}
