import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
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
                        {/* Sidebar content here */}
                        <li key="review" className="mr-8 text-lg">
                            <NavLink to="/dashboard/orders">Order Management</NavLink>
                        </li>
                        <li key="review" className="mr-8 text-lg">
                            <NavLink to="/dashboard/products">Product Management</NavLink>
                        </li>
                        <li key="review" className="mr-8 text-lg">
                            <NavLink to="/dashboard/notice">Notice Management</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;