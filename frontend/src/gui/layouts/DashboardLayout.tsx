import { Navigate, Outlet } from 'react-router-dom';
import NavigationDesktop from '../components/common/NavigationDesktop';
import NavigationMobile from '../components/common/NavigationMobile';
import LogoHeader from '../components/common/LogoHeader';
import { Menu } from 'lucide-react';
import { useState } from 'react';

// Dashboard Layout Component
const DashboardLayout = () => {
  const user = true;

  const [showMobileNav, setShowMobileNav] = useState(false);

  // Implement route client protected route
  if (!user) return <Navigate to={'/auth/login'} />;

  return (
    <main className="flex h-screen w-full max-w-[1350px] gap-3 overflow-hidden bg-gray-neutral font-poppins sm:h-[calc(100dvh-80px)] sm:rounded-lg">
      <NavigationDesktop />

      <section className="w-full overflow-y-auto scrollbar-hide sm:scrollbar-thin">
        {/* Mobile Header */}
        <div
          className="sm:hidden flex justify-between p-5 sm:pt-8 cursor-pointer"
          onClick={() => setShowMobileNav((prev) => !prev)}
        >
          <LogoHeader />
          <Menu
            size={32}
            color="green"
            className="hover:opacity-80 transition-opacity duration-300 z-30"
          />
        </div>

        <NavigationMobile
          showNav={showMobileNav}
          setShowNav={setShowMobileNav}
        />

        {/* Render Children layout nested within the dashboard */}
        <Outlet />
      </section>
    </main>
  );
};

export default DashboardLayout;
