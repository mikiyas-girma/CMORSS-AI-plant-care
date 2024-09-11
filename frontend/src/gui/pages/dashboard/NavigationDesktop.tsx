import LogoHeader from '@/gui/components/common/LogoHeader';
import ProfileShortcut from '@/gui/components/common/ProfileShortcut';
import { useLocation } from 'react-router-dom';
import { navigationLinks } from './constants/index';
import NavLink from '@/gui/components/common/NavLinks';

/**
 * Nagivation Desktop
 * @returns Navigation Component for the Desktop View > 600px
 */

const NavigationDesktop = () => {
  const pathname = useLocation().pathname;

  return (
    <aside className="hidden h-full w-[300px] min-w-[300px] flex-col justify-between bg-white p-6 sm:flex">
      <section>
        {/* Logo Header */}
        <LogoHeader />

        {/* Navigation */}
        <nav role="navigation" aria-label="Sidebar Navigation">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link, index) => (
              <NavLink
                index={index}
                route={link.route}
                pathname={pathname}
                label={link.label}
                Icon={link.icon}
              />
            ))}
          </ul>
        </nav>
      </section>

      {/* Profile Detail and Logout */}
      <ProfileShortcut username="CMORSS Teammates" />
    </aside>
  );
};

export default NavigationDesktop;
