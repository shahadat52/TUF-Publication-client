/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";

const Navbar = () => {
    const dispatch = useAppDispatch()
    const { token, user } = useAppSelector((state: any) => state?.auth?.auth);
    const cart = useAppSelector((state) => state.auth.cart)
    console.log(cart);
    const length = cart?.products?.length
    const navItems = [
        <li className="mr-8 text-lg">
            <NavLink to={`/`}>PUBLICATION</NavLink>
        </li>,
        <li className="mr-8 text-lg">
            <NavLink to={`/gift`}>GIFT</NavLink>
        </li>
    ];

    const handleLogOut = () => {
        dispatch(logOut())
    }
    return (
        <div className="">
            <div className="navbar bg-primary">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navItems}
                            {
                                token && user?.role === 'admin' || user?.role === 'superAdmin' && <li key="about" className="mr-8 text-lg">
                                    <NavLink to={`/dashboard`}>DASHBOARD</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                    <a className="flex  items-center text-lg text-">
                        <img src="/logo.png" className='w-[70px] h-16 rounded-xl mx-1 ' alt="Logo" />
                        <span className=" font-semibold"> TUF - Publication Department </span>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="mx-5 w-full menu menu-horizontal px-1 font-semibold ">
                        {navItems}
                        {
                            token && user?.role === 'admin' || user?.role === 'superAdmin' && <li key="about" className="mr-8 text-lg">
                                <NavLink to={`/dashboard`}>DASHBOARD</NavLink>
                            </li>
                        }
                    </ul>
                </div>
                <div className="navbar-end">


                    <div className="flex ">
                        <NavLink to={`/cart`} className="text-4xl"><FaShoppingCart /></NavLink>
                        <p className="mr-8 mt-[-15px] text-green-500 font-bold text-2xl">{length}</p>
                    </div>


                    {
                        token && user ? <button className="btn" onClick={handleLogOut}>Logout</button> : <NavLink to={`/login`} className="btn">Login</NavLink>
                    }
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>

                </div>
            </div>
        </div>
    );
};

export default Navbar;