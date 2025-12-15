import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}
