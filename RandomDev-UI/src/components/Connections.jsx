import axios from "axios";
import { AVATARS, BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserFriends, FaCommentDots, FaCheckCircle, FaRegImage } from "react-icons/fa";

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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Animated Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#073127]/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <FaUserFriends className="text-2xl text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-space tracking-tight">Your Connections</h1>
            <p className="text-zinc-400 font-poppins text-sm mt-1">
              You have <span className="text-emerald-400 font-bold">{connections.length}</span> connection{connections.length !== 1 && 's'}
            </p>
          </div>
        </div>

        {connections.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="text-6xl text-zinc-700 mb-6">
              <FaUserFriends />
            </div>
            <h1 className="text-2xl font-bold text-white font-space mb-2">No Connections Yet</h1>
            <p className="text-zinc-400 max-w-md font-poppins mb-8">Start swiping and connect with other developers to build your network!</p>
            <Link to="/feed" className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-full hover:shadow-lg hover:shadow-emerald-500/20 transition-all font-medium font-poppins tracking-wide">
              Find Connections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {connections.map((connection) => {
              const { _id, firstName, lastName, avatar, age, gender, about } =
                connection;

              return (
                <div
                  key={_id}
                  className="relative h-[450px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group shadow-2xl hover:border-emerald-500/30 transition-all duration-500"
                >
                  {/* Full Background Image */}
                  <img
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                    src={AVATARS[avatar] || AVATARS[0]}
                    alt={firstName}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>

                  {/* Content Container */}
                  <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-4 z-20">

                    {/* Name & Badge */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold font-space text-white drop-shadow-lg">
                          {firstName} {lastName}
                        </h2>
                        <FaCheckCircle className="text-emerald-400 text-lg drop-shadow-md" />
                      </div>
                      <p className="text-emerald-400 font-poppins text-xs font-medium tracking-wide">
                        {gender || "Developer"} {age && `• ${age}`}
                      </p>
                    </div>

                    {/* Bio Snippet */}
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <p className="text-zinc-300 text-xs font-poppins line-clamp-2 leading-relaxed">
                        {about || "No bio available. Just a mysterious developer."}
                      </p>
                    </div>

                    {/* Action Button */}
                    <Link to={"/chat/" + _id} className="w-full">
                      <button className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/30 transition-all font-poppins text-sm flex items-center justify-center gap-2">
                        <FaCommentDots className="text-lg" />
                        <span>Message</span>
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Connections;