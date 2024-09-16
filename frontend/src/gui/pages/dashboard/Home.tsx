import Separator from '@/gui/components/common/Separator';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import WeatherWidget from '@/gui/components/dashboard-home/WeatherWidget';
import { quickShortcuts } from './constants';
import QuickLink from '@/gui/components/dashboard-home/QuickLink';
import DashboardHeader from '@/gui/components/dashboard-home/DashboardHeader';
import PlantOfTheDay from '@/gui/components/dashboard-home/PlantOfTheDay';
import SectionHeader from '@/gui/components/common/SectionHeader';
import ChatHistoryList from '@/gui/components/dashboard-home/ChatHistoryList';

/**
 * Dashboard Overview
 * @returns
 */
export default function DashboardHome() {
  const user = {
    name: useSelector((state: RootState) => state.user.currentUser?.firstName) || '',
  };

  // Render Widgets
  return (
    <div className="scrollbar-thin h-full w-full p-4 sm:p-8">
      <DashboardHeader username={user.name} />

      <Separator className="h-[2px] bg-slate-300" />

      <section className="flex flex-wrap gap-3 lg:-mb-2">
        <WeatherWidget />
        <PlantOfTheDay />
      </section>

      {/* Shortcut to Other Sections */}
      <SectionHeader title="Quick Shortcuts" />

      <section className="flex flex-wrap gap-4 md:justify-stretch justify-center xl:grid xl:grid-cols-4 xl:gap-4">
        {quickShortcuts.map((item, index) => (
          <QuickLink
            key={index}
            image={item.image}
            title={item.title}
            className={item.className}
            description={item.description}
            route={item.route}
          />
        ))}
      </section>

      {/* Load Last 3 chat Histories */}
      <SectionHeader title="Most Recent Chat History" />
      <ChatHistoryList />
    </div>
  );
}
