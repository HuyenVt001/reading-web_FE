import HeaderOnly from '../layouts/HeaderOnly';
import MainDivider from '../components/home/MainDivider';
import Login from '../components/login/Login';
import Signup from '../components/signup/SignUp';
import Dashboard from '../components/dashboard/page';
import Profile from '../components/profile/page';
import React from 'react';

const publicRoutes = [
    {
        path: '/',
        component: MainDivider,
        layout: HeaderOnly,
    },
    {
        path: '/login',
        component: Login,
        layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    },
    {
        path: '/signup',
        component: Signup,
        layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    },
];

const protectedRoutes = [
    {
        path: '/dashboard',
        component: Dashboard,
        layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    },
    {
        path: '/profile',
        component: Profile,
        layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    },
];

export { publicRoutes, protectedRoutes };
