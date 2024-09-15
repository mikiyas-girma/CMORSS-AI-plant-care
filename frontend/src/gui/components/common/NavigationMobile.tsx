import ProfileShortcut from '@/gui/components/common/ProfileShortcut';
import { Link, To, useLocation } from 'react-router-dom';

import { navigationLinks } from '@/gui/pages/dashboard/constants';
import Separator from './Separator';
import TrendingMovies from './TrendingMovies';

type MobileNavType = {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * NavigationMobile
 *
 * Renders a mobile navigation sidebar.
 *
 * @param  showNav - Controls sidebar visibility
 * @param setShowNav - Updates showNav state
 * @returns JSX.Element Mobile navigation sidebar
 */

const NavigationMobile: React.FC<MobileNavType> = ({ showNav, setShowNav }) => {
  const pathname = useLocation().pathname;
  return (
    <aside
      className={`h-full w-full flex-col justify-between bg-white p-6 pt-8 absolute top-0 transition-all duration-500 ease-in-out ${
        showNav ? 'left-0' : '-left-[100%]'
      } z-10`}
    >
      <section className="mt-5">
        {/* Navigation */}
        <nav role="navigation" aria-label="Sidebar Navigation">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.route as To}
                  onClick={() => setShowNav((prev) => !prev)}
                  className={`flex gap-2 px-2 py-3 rounded-md transition-all duration-100 ease-in text-gray-full hover:opacity-75 ${
                    pathname === link.route &&
                    'bg-green-neutral text-primary-green font-bold'
                  }`}
                >
                  <link.icon
                    color={pathname === link.route ? '#20a144' : 'gray'}
                  />
                  <p>{link.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <Separator />

      <div className="my-5">
        <TrendingMovies />
      </div>

      {/* Profile Detail and Logout */}
      <ProfileShortcut username="CMORSS Teammates" />
    </aside>
  );
};

export default NavigationMobile;
