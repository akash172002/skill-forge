import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function AuthRedirect() {
  return isLoggedIn() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
