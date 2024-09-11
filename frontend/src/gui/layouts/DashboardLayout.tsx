import { Outlet } from 'react-router-dom';

// Dashboard Layout Component
const DashboardLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
