import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAllowed: boolean;
  children: React.ReactNode;
}

export function ProtectedRoute({ isAllowed, children }: ProtectedRouteProps) {
  if (!isAllowed) {
    // Если доступа нет, принудительно редиректим на главную или /login
    return <Navigate to="/router" replace />;
  }

  return <>{children}</>;
}
