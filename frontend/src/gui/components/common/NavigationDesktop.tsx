import LogoHeader from '@/gui/components/common/LogoHeader';
import ProfileShortcut from '@/gui/components/common/ProfileShortcut';
import { useLocation } from 'react-router-dom';
import { navigationLinks } from '../../pages/dashboard/constants/index';
import NavLink from '@/gui/components/common/NavLinks';
import TrendingMovies from './TrendingMovies';

/**
 * Nagivation Desktop
 * @returns Navigation Component for the Desktop View > 600px
 */

const NavigationDesktop = () => {
  const pathname = useLocation().pathname;

  return (
    <aside className="hidden h-full w-[300px] min-w-[250px] md:min-w-[300px] flex-col justify-between overflow-y-auto bg-white p-6 sm:flex overflow-x-hidden">
      <section>
        {/* Logo Header */}
        <LogoHeader />

        {/* Navigation */}
        <nav role="navigation" aria-label="Sidebar Navigation">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link, index) => (
              <NavLink
                key={index}
                route={link.route}
                pathname={pathname}
                label={link.label}
                Icon={link.icon}
              />
            ))}
          </ul>
        </nav>
      </section>

      {/* Just for fun and some points for us lol */}
      <TrendingMovies />

      {/* Profile Detail and Logout */}
      <ProfileShortcut />
    </aside>
  );
};

export default NavigationDesktop;
