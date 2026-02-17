import axios from "axios";
import { AVATARS, BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserFriends, FaCommentDots } from "react-icons/fa";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="text-6xl text-gray-200 mb-4">
          <FaUserFriends />
        </div>
        <h1 className="text-2xl font-bold text-[#073127] font-geometric mb-2">No Connections Yet</h1>
        <p className="text-gray-500 max-w-md">Start swiping and connect with other developers to build your network!</p>
        <Link to="/feed" className="mt-6 px-6 py-3 bg-[#073127] text-white rounded-full hover:bg-[#0a4d3a] transition-all font-medium font-geometric">
          Find Connections
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold text-[#073127] font-geometric">Your Connections</h1>
        <span className="bg-[#073127]/10 text-[#073127] px-3 py-1 rounded-full text-sm font-bold">{connections.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, avatar, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Image Overlay Header */}
              <div className="relative h-48 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={AVATARS[avatar] || AVATARS[0]} alt={firstName} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="font-bold text-xl font-geometric">
                    {firstName} {lastName}
                  </h2>
                  {(age || gender) && (
                    <p className="text-xs opacity-90 font-medium">
                      {age}{gender ? `, ${gender}` : ""}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                  {about || "No bio available"}
                </p>

                <Link to={"/chat/" + _id} className="w-full">
                  <button className="w-full py-2.5 rounded-xl font-semibold text-white bg-[#073127] hover:bg-[#0a4d3a] shadow-md transition-all font-poppins text-sm flex items-center justify-center gap-2">
                    <span>Message</span>
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Connections;