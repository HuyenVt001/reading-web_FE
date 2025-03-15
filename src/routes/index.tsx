import HeaderOnly from '../layouts/HeaderOnly';
import MainDivider from '../components/MainDivider';
import Login from '../components/Login';
import Signup from '../components/SignUp';
import PostStory from '../components/PostStory';
import ManagedStories from '../components/ManagedStories'
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
        path: '/post-story',
        component: PostStory,
        layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    },
    {
        path: '/managed-story',
        component: ManagedStories,
        layout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    }
];

export { publicRoutes, protectedRoutes };
