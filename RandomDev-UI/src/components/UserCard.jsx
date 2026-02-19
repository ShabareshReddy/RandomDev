import { AVATARS } from "../utils/constants";
import { FaCheckCircle, FaUserFriends, FaRegImage } from "react-icons/fa";

const UserCard = ({ user }) => {
  const { firstName, lastName, avatar, age, gender, about, skills } = user;

  return (
    <div className="relative w-full h-full bg-black/40 backdrop-blur-xl  overflow-hidden border border-white/10 shadow-2xl group transition-all duration-300">

      {/* Background Image - Full height, acting as the base */}
      <img
        src={AVATARS[avatar] || AVATARS[0]}
        alt={firstName}
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
      />

      {/* Gradient Overlay for Text Readability - Stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white flex flex-col gap-4 z-10">

        {/* Name & Verification */}
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold font-geometric tracking-wide text-white drop-shadow-md">
            {firstName} {lastName}
          </h2>
          <FaCheckCircle className="text-emerald-400 text-xl drop-shadow-md" />
        </div>

        {/* Bio */}
        <div className="bg-white/10 backdrop-blur-sm p-3  border border-white/10">
          <p className="text-sm text-gray-200 font-poppins line-clamp-3 leading-relaxed">
            {about || "No bio available. Just a mysterious developer wandering the coding plains."}
          </p>
        </div>

        {/* Stats & Action Row */}
        <div className="flex items-center justify-between mt-2">
          {/* Stats with Glass Pill */}
          <div className="flex items-center gap-4 text-sm font-medium bg-black/30 px-4 py-2  border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-gray-200">
              <FaUserFriends className="text-emerald-400" />
              <span>{Math.floor(Math.random() * 500) + 100}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <div className="flex items-center gap-1.5 text-gray-200">
              <FaRegImage className="text-blue-400" />
              <span>{Math.floor(Math.random() * 50) + 10}</span>
            </div>
          </div>

          {/* Follow Button */}
          <div className="pointer-events-auto">
            <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-2.5 px-6  shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transition-all flex items-center gap-2 text-sm border border-emerald-400/50">
              Follow <span>+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;