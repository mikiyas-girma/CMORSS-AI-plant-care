import { AnimatedLogo } from '@/assets';
import { Link } from 'react-router-dom';

const LogoHeader = () => {
  return (
    <Link to={'/'}>
      <section className="text-left flex gap-3 items-center cursor-pointer">
        {/* Logo */}
        <div className="w-[50px] h-[50px] object-contain">
          <AnimatedLogo width={50} height={50} />
        </div>

        {/* Text */}
        <div>
          <h1 className="text-[22px] text-primary-green font-bold">
            AgriCare AI App
          </h1>
          <p className="text-xs text-right text-slate-600 -mt-1">
            ...digitizing plant care.
          </p>
        </div>
      </section>
      <hr className="h-[1px] w-full bg-slate-300 my-4" />
    </Link>
  );
};

export default LogoHeader;
