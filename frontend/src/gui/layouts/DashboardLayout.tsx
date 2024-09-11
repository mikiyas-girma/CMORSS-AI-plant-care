import { Navigate, Outlet } from 'react-router-dom';
import NavigationDesktop from '../pages/dashboard/NavigationDesktop';

// Dashboard Layout Component
const DashboardLayout = () => {
  const user = true;

  // Implement route client protected route
  if (!user) return <Navigate to={'/auth/login'} />;

  return (
    <main className="w-full max-w-[1300px] h-[calc(100dvh-80px)] bg-gray-neutral rounded-lg overflow-hidden">
      <NavigationDesktop />

      {/* Render Children layout nested within the dashboard */}
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
