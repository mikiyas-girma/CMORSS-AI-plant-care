import { Navigate, Outlet } from 'react-router-dom';
import NavigationDesktop from '../pages/dashboard/NavigationDesktop';
import ContainerLayout from './ContainerLayout';

// Dashboard Layout Component
const DashboardLayout = () => {
  const user = true;

  // Implement route client protected route
  if (!user) return <Navigate to={'/auth/login'} />;

  return (
    <ContainerLayout>
      <main className="w-full max-w-[1300px] h-[calc(100dvh-80px)] bg-gray-neutral rounded-lg overflow-hidden flex gap-3">
        {/* Navigation for Desktop - Might create a separate one for Mobile  < sm:breakpoint */}
        <NavigationDesktop />

        {/* Render Children layout nested within the dashboard */}
        <Outlet />
      </main>
    </ContainerLayout>
  );
};

export default DashboardLayout;
