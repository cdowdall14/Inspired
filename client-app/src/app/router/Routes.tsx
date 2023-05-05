import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import ActivityDashboard from '../features/activities/ActivityDashboard';
import ActivityDetails from '../features/activities/details/ActivityDetail';
import ActivityForm from '../features/activities/form/ActivityForm';

import App from '../layout/App';
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'manage/:id', element: <ActivityForm key='manage' /> },

            { path: '*', element: <Navigate replace to='/not-found' /> },
        ],
    },
];
export const router = createBrowserRouter(routes);
