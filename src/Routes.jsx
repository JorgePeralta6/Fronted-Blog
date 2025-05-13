import { lazy } from 'react';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const UnauthorizedModal = lazy(() => import('./components/UnauthorizedModal'));
const PublicationsPage = lazy(() => import('./components/publications/PublicationPage'));

const routes = [
    { path: '/', element: <PublicationsPage /> }, // Cambiar Auth a ClientsPage
    { path: '/unauthorized', element: <UnauthorizedModal /> },
    {
        path: '/dashboard/*',
        element: <PrivateRoute allowedRoles={['ADMIN_ROLE', 'EMPLOYEE_ROLE']} />,
        children: [
            { path: '', element: <LandingPage /> }
        ]
    },
];


export default routes