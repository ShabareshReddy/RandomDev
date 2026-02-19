import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AVATARS, BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbarr = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-[#073127] fixed top-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-[70%] md:w-[60%] lg:w-[40%] z-50 text-white h-14  flex items-center px-4 sm:px-6 shadow-2xl border border-[#0a4d3a]">

            {/* LEFT SIDE */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                {/* DEV KONNEKT LOGO */}
                <div className="relative flex items-center justify-center w-8 h-8 bg-white/10 rounded-full ring-1 ring-white/20">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-emerald-400"
                    >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                    </svg>
                </div>

                {/* LOGO TEXT */}
                <h1 className="text-lg sm:text-xl font-bold tracking-wider font-space">
                    RandomDev
                </h1>
            </Link>

            {/* RIGHT SIDE */}
            <div className="ml-auto flex items-center gap-4">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar h-10 w-10 min-h-0 border border-white/20"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="user photo"
                                    src={AVATARS[user.avatar] || AVATARS[0]}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[#073127] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-[#0a4d3a]"
                        >
                            <li className="border-b border-white/10 pb-1 mb-1">
                                <span className="font-semibold pointer-events-none opacity-80">
                                    {user.firstName}
                                </span>
                            </li>
                            <li><Link to="/profile" className="hover:bg-white/10">Profile</Link></li>
                            <li><Link to="/connections" className="hover:bg-white/10">Connections</Link></li>
                            <li><Link to="/requests" className="hover:bg-white/10">Requests</Link></li>
                            <li className="border-t border-white/10 pt-1 mt-1">
                                <a onClick={handleLogout} className="text-red-400 hover:bg-white/10 hover:text-red-300">Logout</a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <ul className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-space items-center">
                        <Link to="/login" className="hover:text-emerald-200 transition-colors">
                            Login
                        </Link>
                        <Link to="/login" className="px-4 py-2 bg-emerald-500 text-black font-space hover:bg-emerald-400 transition-colors font-bold">
                            Sign Up
                        </Link>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Navbarr;