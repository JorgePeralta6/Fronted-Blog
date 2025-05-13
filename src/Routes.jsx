import { lazy } from 'react';

const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const UnauthorizedModal = lazy(() => import('./components/UnauthorizedModal'));
const PublicationsPage = lazy(() => import('./components/publications/PublicationPage'));

const routes = [
    { path: '/', element: <PublicationsPage /> }, // Cambiar Auth a ClientsPage
    { path: '/unauthorized', element: <UnauthorizedModal /> },
];


export default routes