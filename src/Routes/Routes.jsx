import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/MenuPage/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PrivateRoutes from "./PrivateRoutes";
import AllUsers from "../Pages/Dashboard/Cart/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/menu",
                element: (
                    <PrivateRoutes>
                        <Menu />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/order/:category",
                element: <Order />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoutes>
                <Dashboard />
            </PrivateRoutes>
        ),
        children: [
            {
                path: "userhome",
                element: <UserHome />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            //admin routes
            {
                path: "adminhome",
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },
            {
                path: "users",
                element: (
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>
                ),
            },
            {
                path: "additems",
                element: (
                    <AdminRoute>
                        <AddItems />
                    </AdminRoute>
                ),
            },
            {
                path: "manageitems",
                element: (
                    <AdminRoute>
                        <ManageItems />
                    </AdminRoute>
                ),
            },
            {
                path: "updateitems/:id",
                element: (
                    <AdminRoute>
                        <UpdateItem />
                    </AdminRoute>
                ),
            },
            {
                path: "payment",
                element: <Payment />,
            },
            {
                path: "paymenthistory",
                element: <PaymentHistory />,
            },
        ],
    },
]);

export default Routes;
