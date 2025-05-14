import { lazy } from 'react';

const PublicationsPage = lazy(() => import('./components/publications/PublicationPage'));

const routes = [
    { path: '/', element: <PublicationsPage /> }
];


export default routes