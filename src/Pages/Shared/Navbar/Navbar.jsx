import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("logged out");
                Swal.fire({
                    icon: "success",
                    title: "Logged out!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const navLinks = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/menu">Menu</NavLink>
            </li>
            <li>
                <NavLink to="/order/salads">Order</NavLink>
            </li>
            <li>
                <Link to="/dashboard">
                    <button className="flex felx-row gap-2 items-center">
                        <FaShoppingCart />
                        <div className="badge badge-secondary">
                            +{cart.length}
                        </div>
                    </button>
                </Link>
            </li>
            {user && isAdmin && (
                <li>
                    <NavLink to="/dashboard/adminhome">Dashboard</NavLink>
                </li>
            )}
            {user && !isAdmin && (
                <li>
                    <NavLink to="/dashboard/userhome">Dashboard</NavLink>
                </li>
            )}

            {user ? (
                <li>
                    <a className="" onClick={handleLogout}>
                        Log Out
                    </a>
                </li>
            ) : (
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar bg-black bg-opacity-20 fixed z-10 text-white max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
                    >
                        {navLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Bistro BOSS</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;
