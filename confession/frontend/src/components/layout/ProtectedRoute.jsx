import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Coffee } from "lucide-react";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-bg flex items-center justify-center text-linear-text">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="size-12 rounded-xl bg-linear-text text-linear-bg flex items-center justify-center shadow-lg">
            <Coffee size={24} strokeWidth={2.5} />
          </div>
          <p className="text-[13px] font-medium text-linear-text-muted tracking-wider uppercase">
            Loading Context...
          </p>
        </div>
      </div>
    );
  }

  // 1. If not logged in, kick to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If logged in but NOT onboarded, kick to onboarding (unless already there)
  if (!user.isOnboarded && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // 3. If logged in AND onboarded, but trying to access onboarding, kick to home
  if (user.isOnboarded && location.pathname === "/onboarding") {
    return <Navigate to="/" replace />;
  }

  // 4. All checks passed, render the requested route
  return <Outlet />;
}
