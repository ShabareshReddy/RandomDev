import axios from "axios";
import { AVATARS, BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect } from "react";
import { FaUserPlus, FaCheck, FaTimes } from "react-icons/fa";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) { }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) { }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Animated Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#073127]/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">

        {/* Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="text-center">
            <div className="inline-flex p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md mb-4">
              <FaUserPlus className="text-2xl text-emerald-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-space tracking-tight">Connection Requests</h1>
            <p className="text-zinc-400 font-poppins text-sm mt-2">
              Review incoming requests from other developers
            </p>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center max-w-2xl mx-auto">
            <div className="text-6xl text-zinc-700 mb-6">
              <FaUserPlus />
            </div>
            <h1 className="text-2xl font-bold text-white font-space mb-2">No Pending Requests</h1>
            <p className="text-zinc-400 max-w-md font-poppins">
              Go to Feed to connect with more people and expand your network!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((request) => {
              const { _id, fromUserId } = request;
              const { firstName, lastName, avatar, gender, about, skills } = fromUserId;

              return (
                <div
                  key={_id}
                  className="flex flex-col bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-xl hover:border-emerald-500/30 transition-all duration-300 group"
                >
                  {/* User Info Header with Image */}
                  <div className="p-6 flex items-start gap-5 border-b border-white/5">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0 group-hover:border-emerald-500/50 transition-colors">
                      <img className="w-full h-full object-cover" src={AVATARS[avatar] ?? AVATARS[0]} alt={firstName} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white font-space tracking-wide">{firstName} {lastName}</h2>
                      <div className="text-sm text-emerald-400 font-medium font-poppins mt-1">
                        {gender && <span className="capitalize">{gender}</span>}
                      </div>
                      <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {about || "No bio available"}
                      </p>
                    </div>
                  </div>

                  {/* Skills & Bio */}
                  <div className="p-6 flex-1 bg-black/20">
                    {/* Skills Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {skills && skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-[10px] px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 rounded-full font-mono">{skill}</span>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-auto">
                      <button
                        className="flex-1 py-3 rounded-xl font-bold text-zinc-300 bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all font-poppins text-sm flex items-center justify-center gap-2 group/reject"
                        onClick={() => reviewRequest("rejected", request._id)}
                      >
                        <FaTimes className="group-hover/reject:scale-110 transition-transform" />
                        Reject
                      </button>
                      <button
                        className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/30 transition-all font-poppins text-sm flex items-center justify-center gap-2"
                        onClick={() => reviewRequest("accepted", request._id)}
                      >
                        <FaCheck />
                        Accept
                      </button>
                    </div>
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
export default Requests;