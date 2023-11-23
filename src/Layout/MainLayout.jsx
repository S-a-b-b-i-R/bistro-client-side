import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const MainLayout = () => {
    const location = useLocation();
    const noHeaderFooter =
        location.pathname.includes("login") ||
        location.pathname.includes("signup");
    return (
        <div className="max-w-screen-xl mx-auto">
            {noHeaderFooter || <Navbar />}
            <Outlet />
            {noHeaderFooter || <Footer />}
        </div>
    );
};

export default MainLayout;
