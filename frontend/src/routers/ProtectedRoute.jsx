"use client";

import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * ProtectedRoute wraps around any route/component that
 * requires the user to be logged in.
 *
 * @param {ReactNode} children - Component(s) to render if authenticated
 * @param {string} redirectTo - Path to redirect if not authenticated
 */
export default function ProtectedRoute({ children, redirectTo = "/" }) {
  const { user, loading } = useAuth();

  // Optionally, you can show a loader while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="animate-pulse text-gray-500 dark:text-gray-300">
          Checking authentication...
        </span>
      </div>
    );
  }

  // Redirect if user is not logged in
  if (!user) return <Navigate to={redirectTo} replace />;

  // Render the protected content
  return children;
}
