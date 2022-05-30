import Homepage from '../components/Homepage/Homepage';
import Dashboard from '../components/Dashboard/Dashboard';

export const publicRoutes = [{ path: '/', component: <Homepage /> }];

export const privateRoutes = [{ path: '/dashboard', component: <Dashboard /> }];
