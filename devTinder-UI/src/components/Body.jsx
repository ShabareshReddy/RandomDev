import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      {/* Sidebar with mobile toggle logic */}
      <Sidebar isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto relative">

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden p-4 absolute top-0 left-0 z-20">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-white rounded-full shadow-md text-[#073127]"
          >
            <FaBars size={24} />
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
export default Body;