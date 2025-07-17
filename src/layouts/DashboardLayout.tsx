
import { useState } from "react";
import Navbar from "../components/Navbar";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
    const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Order Management - Collapsible */}
                        <li className="text-lg">
                            <div
                                className="cursor-pointer flex justify-between items-center"
                                onClick={() => setIsOrderMenuOpen(!isOrderMenuOpen)}
                            >
                                <span>Order Management</span>
                                <svg
                                    className={`w-4 h-4 transform transition-transform duration-300 ${isOrderMenuOpen ? "rotate-90" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>

                            {
                                isOrderMenuOpen && (
                                    <ul

                                        className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out bg-white mb-2 p-2 rounded-md`}

                                    >
                                        <li>
                                            <NavLink to="/dashboard/orders/publication" className="pl-2">Orders Management PUB.</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/orders/annual" className="pl-2">Orders Management ANU.</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/orders/delivery/pending/publications" className="pl-2">Delivery Pending Publication</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/orders/delivery/pending/annual" className="pl-2">Delivery Pending Annual</NavLink>
                                        </li>
                                    </ul>
                                )
                            }
                        </li>

                        {/* Other Menu Items */}
                        <li className="text-lg">
                            <NavLink to="/dashboard/products">Product Management</NavLink>
                        </li>
                        <li className="text-lg">
                            <NavLink to="/dashboard/notice">Notice Management</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
