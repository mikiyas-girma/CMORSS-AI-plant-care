import { formatCustomDate, getTimeOfDayGreeting } from '@/lib/utils';

type HeaderProp = {
  username: string;
};

const DashboardHeader: React.FC<HeaderProp> = ({ username }) => {
  return (
    <section className="flex cursor-default justify-between">
      <div>
        <h2 className="text-2xl font-bold text-primary-green">
          Welcome back, {username}
        </h2>
        <p className="text-sm text-slate-600">Let's get started.</p>
      </div>

      <div className="text-right text-primary-green">
        <p>{getTimeOfDayGreeting()}! 😇</p>
        <p className="text-sm font-medium text-slate-600">
          {formatCustomDate(new Date())}
        </p>
      </div>
    </section>
  );
};

export default DashboardHeader;
