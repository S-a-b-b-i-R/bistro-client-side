import { NavLink, Outlet } from "react-router-dom";
import { FaCartShopping, FaUtensils, FaUsers } from "react-icons/fa6";
import { FaHome, FaCalendarAlt, FaListUl } from "react-icons/fa";
import { RiReservedFill } from "react-icons/ri";
import { MdRateReview, MdPayment } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex min-h-screen">
            {/* dashboard side-bar */}
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu p-4">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminhome">
                                    <FaHome />
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/additems">
                                    <FaUtensils />
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageitems">
                                    <FaListUl />
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaCalendarAlt />
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers />
                                    All Usere
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/cart">
                                    <FaCartShopping />
                                    My Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/userhome">
                                    <FaHome />
                                    User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reservation">
                                    <RiReservedFill />
                                    Reservation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/review">
                                    <MdRateReview />
                                    Add a Review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymenthistory">
                                    <MdPayment />
                                    Payment History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaCalendarAlt />
                                    My Bookings
                                </NavLink>
                            </li>
                        </>
                    )}
                    <div className="divider"></div>
                    {/* common navlinks */}
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <RiContactsLine />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 bg-blue-100">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
