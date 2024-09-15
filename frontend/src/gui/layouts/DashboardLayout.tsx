import { Navigate, Outlet } from 'react-router-dom';
import NavigationDesktop from '../components/common/NavigationDesktop';

// Dashboard Layout Component
const DashboardLayout = () => {
  const user = true;

  // Implement route client protected route
  if (!user) return <Navigate to={'/auth/login'} />;

  return (
    <main className="flex h-screen w-full max-w-[1300px] gap-3 overflow-hidden bg-gray-neutral font-poppins sm:h-[calc(100dvh-80px)] sm:rounded-lg">
      {/* Navigation for Desktop - Might create a separate one for Mobile  < sm:breakpoint */}
      <NavigationDesktop />

      {/* Render Children layout nested within the dashboard */}
      <section className="w-full overflow-y-auto">
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
