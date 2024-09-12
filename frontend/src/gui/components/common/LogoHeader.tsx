import { AnimatedLogo } from '@/assets';
import { Link } from 'react-router-dom';
import Separator from './Separator';

const LogoHeader = () => {
  return (
    <Link to={'/'}>
      <section className="flex cursor-pointer items-center gap-3 text-left">
        {/* Logo */}
        <div className="w-[35px] h-[35px] md:h-[50px] md:w-[50px] object-contain">
          <AnimatedLogo />
        </div>

        {/* Text */}
        <div>
          <h1 className="text-[18px] md:text-[22px] font-bold text-primary-green">
            AgriCare AI App
          </h1>
          <p className="-mt-1 text-right text-[10px] md:text-xs text-slate-600">
            ...digitizing plant care.
          </p>
        </div>
      </section>
      <Separator />
    </Link>
  );
};

export default LogoHeader;
