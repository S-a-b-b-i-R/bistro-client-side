import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import useAdmin from "../Hooks/useAdmin";
import PropTypes from "prop-types";
const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { user, loading } = useAuth();
    const location = useLocation();
    const path = location.pathname;
    if (loading || isAdminLoading) {
        return <div>Loading...</div>;
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate state={path} to="/" replace />;
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;
