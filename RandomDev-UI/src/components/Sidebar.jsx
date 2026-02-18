import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, AVATARS } from "../utils/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { FaHome, FaUserFriends, FaUserPlus, FaUser, FaSignOutAlt, FaTimes } from "react-icons/fa";

const Sidebar = ({ isOpen, close }) => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const navItems = [
        { path: "/feed", label: "Feed", icon: <FaHome /> },
        { path: "/connections", label: "Connections", icon: <FaUserFriends /> },
        { path: "/requests", label: "Requests", icon: <FaUserPlus /> },
        { path: "/profile", label: "Profile", icon: <FaUser /> },
    ];

    if (!user) return null;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={close}
                ></div>
            )}

            <div className={`
                fixed md:static inset-y-0 left-0 z-40
                w-64 bg-black border-r border-white/10
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                flex flex-col h-full font-geometric text-white
            `}>

                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-white/10">
                    <Link to="/feed" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <span className="text-black font-bold text-lg">D</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-wider text-white">
                            RandomDev
                        </h1>
                    </Link>
                    <button onClick={close} className="md:hidden text-gray-400 hover:text-red-500">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* User Profile Summary */}
                <div className="p-6 flex flex-col items-center border-b border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20 mb-3">
                        <img
                            alt="user photo"
                            src={AVATARS[user.avatar] || AVATARS[0]}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="font-bold text-lg text-white tracking-wide">{user.firstName}</h2>
                    <p className="text-xs text-emerald-400 capitalize bg-emerald-500/10 px-3 py-1 rounded-full mt-1 border border-emerald-500/20">
                        {user.gender || "Developer"}
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-6 px-4 flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => close()}
                                className={`
                                    flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 border border-emerald-400/20"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }
                                `}
                            >
                                <span className={`text-xl ${isActive ? "text-white" : "text-gray-500 group-hover:text-emerald-400 transition-colors"}`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Footer / Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-medium border border-transparent hover:border-red-500/20"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
