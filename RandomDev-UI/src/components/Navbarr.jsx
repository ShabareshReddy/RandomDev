import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
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
        <div
            className="
                bg-[#073127] fixed top-3 left-1/2 -translate-x-1/2 z-50
                text-white flex items-center
                px-4 sm:px-5
                h-12 sm:h-13 md:h-14
                w-[92%] sm:w-[80%] md:w-[65%] lg:w-[48%] xl:w-[38%]
                shadow-2xl border border-[#0a4d3a]
            "
        >
            {/* ── LEFT: Logo ── */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity shrink-0">
                {/* Icon */}
                <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-full ring-1 ring-white/20">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400"
                    >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                    </svg>
                </div>

                {/* Logo Text */}
                <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight font-space">
                    RandomDev
                </h1>
            </Link>

            {/* ── RIGHT: Auth / Avatar ── */}
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
                {user ? (
                    /* ── Avatar dropdown (logged in) ── */
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar h-9 w-9 sm:h-10 sm:w-10 min-h-0 border border-white/20"
                        >
                            <div className="w-9 sm:w-10 rounded-full">
                                <img
                                    alt="user photo"
                                    src={AVATARS[user.avatar] ?? AVATARS[0]}
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-[#073127] text-white rounded-box z-[1] mt-3 w-48 sm:w-52 p-2 shadow-xl border border-[#0a4d3a]"
                        >
                            <li className="border-b border-white/10 pb-1 mb-1">
                                <span className="font-semibold pointer-events-none opacity-80 text-sm truncate">
                                    {user.firstName}
                                </span>
                            </li>
                            <li><Link to="/profile" className="hover:bg-white/10 text-sm">Profile</Link></li>
                            <li><Link to="/connections" className="hover:bg-white/10 text-sm">Connections</Link></li>
                            <li><Link to="/requests" className="hover:bg-white/10 text-sm">Requests</Link></li>
                            <li><Link to="/chat" className="hover:bg-white/10 text-sm">💬 Messages</Link></li>
                            <li className="border-t border-white/10 pt-1 mt-1">
                                <a onClick={handleLogout} className="text-red-400 hover:bg-white/10 hover:text-red-300 text-sm cursor-pointer">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    /* ── Login / Sign Up links (logged out) ── */
                    <ul className="flex items-center gap-2 sm:gap-4">
                        <li>
                            <Link
                                to="/login"
                                className="text-sm sm:text-sm font-medium font-space hover:text-green-400 transition-colors"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="
                                    px-1 py-1 sm:px-4 sm:py-2
                                    bg-green-400 text-black
                                    text-xs sm:text-sm
                                    font-bold font-space
                                    hover:bg-green-300 transition-colors
                                "
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Navbarr;