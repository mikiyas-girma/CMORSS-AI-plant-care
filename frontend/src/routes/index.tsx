import { lazy } from 'react';

// dom router
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import AuthLayout from '@/gui/layouts/AuthLayout';
import DashboardLayout from '@/gui/layouts/DashboardLayout';

// components
import Loadable from '@/gui/components/Loadable';
import NotFound from '@/gui/pages/NotFound';
import Journal from '@/gui/pages/dashboard/Journal';

// Import Components

// Authentication
const ResetPassword = Loadable(
  lazy(() => import('@/gui/pages/auth/ResetPassword'))
);
const NewPassword = Loadable(
  lazy(() => import('@/gui/pages/auth/NewPassword'))
);
const SignIn = Loadable(lazy(() => import('@/gui/pages/auth/SignIn')));
const SignUp = Loadable(lazy(() => import('@/gui/pages/auth/Register')));

// DASHBOARD
const DashboardHome = Loadable(
  lazy(() => import('@/gui/pages/dashboard/Home'))
);
const DashboardMyPlants = Loadable(
  lazy(() => import('@/gui/pages/dashboard/MyPlants'))
);
const DashboardChat = Loadable(
  lazy(() => import('@/gui/pages/dashboard/Chat'))
);
const DashboardPlantIdentification = Loadable(
  lazy(() => import('@/gui/pages/dashboard/PlantIdentification'))
);

/**
 * Define Root Redirect
 */
// Root redirection component
const RootRedirect = () => {
  // Check Auth Status and redirect appropriately
  const isAuthenticated = false;
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

/**
 * Define Router for the Application
 * @returns Router Component for Navigation.
 */
export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <RootRedirect />,
    },
    {
      path: 'auth',
      element: <AuthLayout />,
      children: [
        { index: true, element: <Navigate to="/auth/login" replace /> },
        { path: 'login', element: <SignIn /> },
        { path: 'register', element: <SignUp /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
      ],
    },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Navigate to="/dashboard/home" replace /> },
        { path: 'home', element: <DashboardHome /> },
        { path: 'myplants', element: <DashboardMyPlants /> },
        { path: 'chat', element: <DashboardChat /> },
        { path: 'journal', element: <Journal /> },
        {
          path: 'plant-identification',
          element: <DashboardPlantIdentification />,
        },
        {
          path: '*',
          element: (
            <NotFound
              route="/dashboard/home"
              buttonText="Back to dashboard"
              subtext="Route does not exist. Please confirm."
            />
          ),
        },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);
}
