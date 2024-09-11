import { LucideProps } from 'lucide-react';

import { Link, To } from 'react-router-dom';

type LinkProp = {
  index: number;
  route: To;
  pathname: string;
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
};

/**
 * Navigation Link Component
 * @returns Navigation Link
 */

const NavLink: React.FC<LinkProp> = ({
  index,
  route,
  pathname,
  label,
  Icon,
  className,
}) => {
  return (
    <li key={index}>
      <Link
        to={route as To}
        className={`flex gap-2 px-2 py-3 rounded-md transition-all duration-100 ease-in text-gray-full hover:opacity-75 hover:bg-slate-50 ${className} ${
          pathname === route && 'bg-green-neutral text-primary-green font-bold'
        }`}
      >
        <Icon color={pathname === route ? '#20a144' : 'gray'} /> <p>{label}</p>
      </Link>
    </li>
  );
};

export default NavLink;
