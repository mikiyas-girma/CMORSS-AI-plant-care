import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const user = true;
  const pathname = useLocation().pathname;

  if (user) return <Navigate to={'/dashboard'} />;
  if (pathname === '/auth') return <Navigate to={'/auth/login'} />;

  // Return Children routes as Outlet
  return <Outlet />;
};

export default AuthLayout;
