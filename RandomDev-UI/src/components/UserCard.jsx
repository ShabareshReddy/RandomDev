import { AVATARS } from "../utils/constants";
import { FaCheckCircle, FaHeart, FaTimes } from "react-icons/fa";

const UserCard = ({ user, onLike, onPass }) => {
  const { firstName, lastName, avatar, gender, about, skills } = user;

  const primarySkill = skills && skills.length > 0 ? skills[0] : null;
  const roleTitle = primarySkill ? `${primarySkill} Developer` : "Software Developer";

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">

      <img
        src={AVATARS[avatar] ?? AVATARS[0]}
        alt={firstName}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 30%, rgba(10,10,10,0.1) 60%, transparent 100%)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-4 flex flex-col gap-2.5 z-10">

        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-white font-space tracking-tight drop-shadow-md">
            {firstName} {lastName}
          </h2>
          <FaCheckCircle className="text-emerald-400 text-base flex-shrink-0" />
        </div>

        <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full w-fit border border-emerald-500/30 font-mono backdrop-blur-sm">
          {roleTitle}
        </span>
        <p className="text-zinc-300 text-xs leading-relaxed line-clamp-2 font-poppins">
          {about || "Passionate developer crafting amazing things."}
        </p>

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 4).map((s, i) => (
              <span
                key={i}
                className="text-[10px] bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/15 font-mono backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-1">
          <button
            onClick={onPass}
            className="flex-1 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-red-500/25 hover:text-red-400 hover:border-red-500/30 transition-all font-poppins text-sm flex items-center justify-center gap-2"
          >
            <FaTimes className="text-xs" />
            Ignore
          </button>
          <button
            onClick={onLike}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all font-poppins text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/60"
          >
            <FaHeart className="text-xs" />
            Interested
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserCard;