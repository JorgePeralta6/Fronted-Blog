import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(!user){
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
      }
      
    return <Outlet />;

}

export default PrivateRoute
