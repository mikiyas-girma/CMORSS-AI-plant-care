import LogoHeader from '@/gui/components/common/LogoHeader';
import ProfileShortcut from '@/gui/components/common/ProfileShortcut';
import { Link, To, useLocation } from 'react-router-dom';
import { navigationLinks } from '@/gui/pages/dashboard/constants/index.js';

/**
 * Nagivation Desktop
 * @returns Navigation Component for the Desktop View > 600px
 */

const NagivationMobile = () => {
  const pathname = useLocation().pathname;
  //   const [showMenu, setShowMenu] = useState(true);

  return (
    <aside className="hidden h-full max-w-[300px] flex-col justify-between bg-white p-6 sm:flex">
      <section>
        {/* Logo Header */}
        <LogoHeader />

        {/* Navigation */}
        <nav role="navigation" aria-label="Sidebar Navigation">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.route as To}
                  className={`flex gap-2 px-2 py-3 rounded-md transition-all duration-100 ease-in text-gray-full hover:opacity-75 ${
                    pathname === link.route &&
                    'bg-green-neutral text-primary-green font-bold'
                  }`}
                >
                  <link.icon
                    color={pathname === link.route ? '#20a144' : 'gray'}
                  />{' '}
                  <p>{link.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Profile Detail and Logout */}
      <ProfileShortcut />
    </aside>
  );
};

export default NagivationMobile;
