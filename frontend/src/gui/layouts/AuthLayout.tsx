import { Navigate, Outlet, useLocation } from 'react-router-dom';
import ContainerLayout from './ContainerLayout';

const AuthLayout = () => {
  const user = true;
  const pathname = useLocation().pathname;

  if (user) return <Navigate to={'/dashboard'} />;
  if (pathname === '/auth') return <Navigate to={'/auth/login'} />;

  return (
    <ContainerLayout>
      <Outlet />
    </ContainerLayout>
  );
};

export default AuthLayout;
