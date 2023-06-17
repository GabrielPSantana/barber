// Flow
import React from "react";
// Hooks
import { useAuth } from "../contexts/auth";

// Routes
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

const Routes: React.FC = () => {
  const { isSigned } = useAuth();
  if (!isSigned) return <AuthRoutes />;
  return <AppRoutes />;
};

export default Routes;
