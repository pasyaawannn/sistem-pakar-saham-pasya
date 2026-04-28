import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { AppShell } from "./AppShell";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  return <AppShell>{children}</AppShell>;
};
