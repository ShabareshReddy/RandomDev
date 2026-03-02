import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AVATARS, BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

/* ── Shuffle icon SVG ── */
const ShuffleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-4 h-4">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
  </svg>
);

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [avatar, setAvatar] = useState(user.avatar ?? 0);
  const [imgVisible, setImgVisible] = useState(true);
  const [skills, setSkills] = useState((user.skills || []).join(", "));
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const generateRandomAvatar = () => {
    let next;
    do { next = Math.floor(Math.random() * AVATARS.length); } while (next === avatar);
    setAvatar(next);
    setImgVisible(false);
    setTimeout(() => setImgVisible(true), 50);
  };

  const saveProfile = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile",
        {
          firstName,
          lastName,
          avatar,
          gender,
          about,
          skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500/70 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all text-white text-sm font-poppins placeholder-zinc-600";

  const labelClass = "block text-xs text-zinc-400 mb-1.5 font-poppins font-medium uppercase tracking-wide";

  return (
    <div className="h-full overflow-y-auto bg-[#0a0a0a] text-white flex items-start justify-center px-4 py-6 relative">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-emerald-900/10 blur-[100px] rounded-full" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold font-space text-white tracking-tight">Edit Profile</h1>
          <p className="text-zinc-500 text-xs font-poppins mt-1">Customize how developers see you on RandomDev</p>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">

          {/* ── Avatar Section ── */}
          <div className="flex flex-col items-center mb-5">
            {/* Avatar circle */}
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-full ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-[#0a0a0a] overflow-hidden shadow-xl shadow-emerald-900/30 bg-zinc-800">
                <img
                  src={AVATARS[avatar] ?? AVATARS[0]}
                  alt="Your avatar"
                  className="w-full h-full object-cover transition-opacity duration-300"
                  style={{ opacity: imgVisible ? 1 : 0 }}
                  onLoad={() => setImgVisible(true)}
                />
              </div>
              {/* Green ping dot */}
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
            </div>

            {/* Generate button */}
            <button
              onClick={generateRandomAvatar}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 text-xs font-semibold font-poppins rounded-full transition-all duration-200 cursor-pointer"
            >
              <ShuffleIcon />
              Generate Random Avatar
            </button>
          </div>

          {/* ── Form Fields ── */}
          <div className="flex flex-col gap-3">

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="John"
                  className={inputClass}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Doe"
                  className={inputClass}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className={labelClass}>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={inputClass}
                style={{ colorScheme: "dark" }}
              >
                <option value="" disabled className="bg-zinc-900">Select gender</option>
                <option value="male" className="bg-zinc-900">Male</option>
                <option value="female" className="bg-zinc-900">Female</option>
                <option value="other" className="bg-zinc-900">Other</option>
              </select>
            </div>

            {/* About */}
            <div>
              <label className={labelClass}>About</label>
              <textarea
                value={about}
                rows={3}
                placeholder="Tell others about yourself and your dev goals…"
                className={`${inputClass} resize-none`}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {/* Skills */}
            <div>
              <label className={labelClass}>Skills</label>
              <input
                type="text"
                value={skills}
                placeholder="React, Node.js, Python, Go…"
                className={inputClass}
                onChange={(e) => setSkills(e.target.value)}
              />
              <p className="text-zinc-600 text-xs font-poppins mt-1.5">Separate skills with commas</p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-xs font-poppins font-medium -mt-1">{error}</p>
            )}

            {/* Save button */}
            <button
              onClick={saveProfile}
              disabled={isLoading}
              className="w-full mt-2 py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold font-poppins text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Saving…
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 8 12 12 14 14" />
                  </svg>
                  Save Profile
                </>
              )}
            </button>

          </div>
        </div>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-emerald-500 text-black px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-semibold font-poppins text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Profile saved successfully!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditProfile;