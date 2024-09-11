import { lazy } from 'react';
// dom router
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import AuthLayout from '@/gui/layouts/AuthLayout';
import DashboardLayout from '@/gui/layouts/DashboardLayout';
// components
import Loadable from '@/gui/components/Loadable';

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
                    element: <DashboardPlantIdentificationChat />,
                },
            ],
        },

        { path: '*', element: <Navigate to="/404" replace /> },
    ])
}

// IMPORT COMPONENTS

// AUTHENTICATION
const ResetPassword = Loadable(lazy(() => import('@/gui/pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('@/gui/pages/auth/NewPassword')));
const SignIn = Loadable(lazy(() => import('@/gui/pages/auth/SignIn')));
const SignUp = Loadable(lazy(() => import('@/gui/pages/auth/Register')));

// Main
const Index = Loadable(lazy(() => import('../gui/pages/index')));

// DASHBOARD
const DashboardHome = Loadable(lazy(() => import('@/gui/pages/dashboard/Home')));
const DashboardChat = Loadable(lazy(() => import('@/gui/pages/dashboard/Chat')));
const DashboardPlantIdentificationChat = Loadable(lazy(() => import('@/gui/pages/dashboard/PlantIdentification')));
