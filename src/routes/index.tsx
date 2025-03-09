import HeaderOnly from '../layouts/HeaderOnly';
import MainDivider from '../components/home/MainDivider';
import Login from '../components/login/Login';
import React from 'react';
import Signup from '../components/signup/SignUp';

const publicRoutes = [
    {
        path: '/',
        component: MainDivider,
        layout: HeaderOnly,
    },
    { path: '/auth/signin', component: Login, layout: ({ children }: { children: React.ReactNode }) => <>{children}</> },
    { path: '/auth/signup', component: Signup, layout: ({ children }: { children: React.ReactNode }) => <>{children}</> },
];
export { publicRoutes };
