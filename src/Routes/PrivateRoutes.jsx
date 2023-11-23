import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/UseAuth";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const path = location.pathname;
    // console.log("private", path);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (user) {
        return children;
    }
    return <Navigate state={path} to="/login" />;
};

PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
