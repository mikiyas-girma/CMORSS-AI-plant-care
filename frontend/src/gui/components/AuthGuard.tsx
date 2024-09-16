import useAuth from '@/hooks/useAuth';
import { AUTH_PATH, DASHBOARD_PATH } from '@/routes/paths';
import { Navigate, useLocation } from 'react-router-dom';

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuth();

  const { pathname } = useLocation();

  if (
    !user.isAuthenticated &&
    !user.isProcessing &&
    pathname.includes(DASHBOARD_PATH.root)
  )
    return <Navigate to={AUTH_PATH.login} />;

  if (
    user.isAuthenticated &&
    !user.isProcessing &&
    pathname.includes(AUTH_PATH.root)
  ) {
    return <Navigate to={DASHBOARD_PATH.root} />;
  }

  return <>{user.isProcessing ? null : children}</>;
}
