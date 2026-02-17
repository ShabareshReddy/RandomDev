import axios from "axios";
import { AVATARS, BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect, useState } from "react";

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

  if (requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <h1 className="text-2xl font-bold text-gray-400 font-geometric">No Pending Requests</h1>
        <p className="text-gray-500 font-poppins mt-2">Go to Feed to connect with more people!</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-[#073127] font-geometric mb-8 text-center">Connection Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((request) => {
          const { _id, fromUserId } = request;
          const { firstName, lastName, avatar, age, gender, about, skills } = fromUserId;

          return (
            <div
              key={_id}
              className="flex flex-col bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* User Info Header with Image */}
              <div className="p-4 flex items-center gap-4 border-b border-gray-50">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#073127]/10 flex-shrink-0">
                  <img className="w-full h-full object-cover" src={AVATARS[avatar] || AVATARS[0]} alt={firstName} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 font-geometric">{firstName} {lastName}</h2>
                  <div className="text-sm text-gray-500 font-medium">
                    {age && <span>{age}, </span>}
                    {gender && <span className="capitalize">{gender}</span>}
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <p className="text-gray-600 text-sm mt-3 line-clamp-2 min-h-[40px]">
                  {about || "No bio available"}
                </p>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {skills && skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 flex gap-3 mt-auto">
                <button
                  className="flex-1 py-2.5 rounded-xl font-semibold text-red-500 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all font-poppins text-sm"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-[#073127] hover:bg-[#0a4d3a] shadow-md hover:shadow-lg transition-all font-poppins text-sm"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Requests;