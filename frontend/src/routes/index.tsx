import { Suspense, lazy } from 'react';

import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// components
import LoadingScreen from '../gui/components/LoadingScreen';
// layouts
import AuthLayout from '../gui/layouts/AuthLayout';
import DashboardLayout from '../gui/layouts/Dashboard';
import DashboardPlantIdentificationLayout from '../gui/layouts/PlantIdentificationLayout';

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <Index />,
        },
        {
            path: 'auth',
            element: <AuthLayout />,
            children: [
                {
                    path: 'login',
                    element: <SignIn />,
                },
                {
                    path: 'register',
                    element: <SignUp />,
                },
                { path: 'reset-password', element: <ResetPassword /> },
                { path: 'new-password', element: <NewPassword /> },
            ],
        },
        {
            path: 'dashboard',
            element: <DashboardLayout />,
            children: [
                {
                    element: <Navigate to="/dashboard/home" replace />,
                    index: true,
                },
                {
                    path: 'home',
                    element: <DashboardHome />,
                },
                {
                    path: 'chat',
                    element: <DashboardChat />,
                },
                {
                    path: 'plant-identification',
                    element: <DashboardPlantIdentificationLayout />,
                    children: [
                        {
                            element: <Navigate to="/plant-identification/chat" replace />,
                            index: true,
                        },
                        {
                            path: 'chat',
                            element: <DashboardPlantIdentificationChat />,
                        },
                        {
                            path: 'uploading',
                            element: <DashboardPlantIdentificationUploading />,
                        },
                    ],
                },
            ],
        },

        { path: '*', element: <Navigate to="/404" replace /> },
    ])
}

// IMPORT COMPONENTS

// AUTHENTICATION
const ResetPassword = Loadable(lazy(() => import('../gui/pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../gui/pages/auth/NewPassword')));
const SignIn = Loadable(lazy(() => import('../gui/pages/auth/signin/SignIn')));
const SignUp = Loadable(lazy(() => import('../gui/pages/auth/register/Register')));

// Main
const Index = Loadable(lazy(() => import('../gui/pages/index')));

// DASHBOARD
const DashboardHome = Loadable(lazy(() => import('../gui/pages/dashboard/Home')));
const DashboardChat = Loadable(lazy(() => import('../gui/pages/dashboard/Chat')));
const DashboardPlantIdentificationChat = Loadable(lazy(() => import('../gui/pages/dashboad/PlantIdentification')));
const DashboardPlantIdentificationUploading = Loadable(lazy(() => import('../gui/pages/account/PlantIdentificationUploading')));
