import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const IllustrationPanel = () => (
  <div className="hidden md:flex md:w-1/2 relative flex-col items-center justify-center overflow-hidden bg-[#071a0f] rounded-r-2xl gap-6 px-8">

    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: "linear-gradient(#34d39920 1px, transparent 1px), linear-gradient(90deg, #34d39920 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />

    <div
      className="absolute rounded-full"
      style={{
        width: "340px",
        height: "340px",
        background: "radial-gradient(circle, #22c55e55 0%, #16a34a22 50%, transparent 75%)",
        filter: "blur(8px)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -60%)",
      }}
    />

    <div className="relative z-10 w-[300px] h-[280px] flex items-center justify-center">
      <img
        src="https://storyset.com/illustration/programming/rafiki?color=green"
        alt="Developer illustration"
        className="w-full h-full object-contain"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentNode.innerHTML = `
            <svg viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
              <circle cx="200" cy="155" r="130" fill="#22c55e" opacity="0.18"/>
              <circle cx="200" cy="155" r="100" fill="#22c55e" opacity="0.12"/>
              <!-- Desk -->
              <rect x="80" y="230" width="240" height="14" rx="7" fill="#1a3a25"/>
              <rect x="120" y="244" width="12" height="40" rx="4" fill="#1a3a25"/>
              <rect x="268" y="244" width="12" height="40" rx="4" fill="#1a3a25"/>
              <!-- Laptop base -->
              <rect x="110" y="210" width="180" height="22" rx="6" fill="#111"/>
              <rect x="115" y="212" width="170" height="18" rx="4" fill="#1c1c1c"/>
              <!-- Laptop screen -->
              <rect x="120" y="120" width="160" height="92" rx="8" fill="#111"/>
              <rect x="126" y="126" width="148" height="80" rx="5" fill="#0d1f12"/>
              <!-- Code lines on screen -->
              <rect x="134" y="136" width="60" height="5" rx="2" fill="#34d399" opacity="0.9"/>
              <rect x="134" y="146" width="90" height="5" rx="2" fill="#6ee7b7" opacity="0.7"/>
              <rect x="142" y="156" width="70" height="5" rx="2" fill="#34d399" opacity="0.6"/>
              <rect x="134" y="166" width="50" height="5" rx="2" fill="#6ee7b7" opacity="0.5"/>
              <rect x="142" y="176" width="80" height="5" rx="2" fill="#34d399" opacity="0.4"/>
              <rect x="134" y="186" width="40" height="5" rx="2" fill="#6ee7b7" opacity="0.3"/>
              <!-- Developer body -->
              <ellipse cx="200" cy="275" rx="50" ry="20" fill="#0f2d1a" opacity="0.4"/>
              <rect x="175" y="210" width="50" height="65" rx="10" fill="#1a5c36"/>
              <!-- Arms -->
              <rect x="148" y="218" width="30" height="14" rx="7" fill="#c8904a"/>
              <rect x="222" y="218" width="30" height="14" rx="7" fill="#c8904a"/>
              <!-- Head -->
              <circle cx="200" cy="92" r="32" fill="#c8904a"/>
              <!-- Hair -->
              <path d="M172 82 Q200 55 228 82 Q224 68 200 62 Q176 68 172 82Z" fill="#2d1a0a"/>
              <!-- Eyes -->
              <circle cx="190" cy="90" r="4" fill="#2d1a0a"/>
              <circle cx="210" cy="90" r="4" fill="#2d1a0a"/>
              <circle cx="191" cy="89" r="1.5" fill="white"/>
              <circle cx="211" cy="89" r="1.5" fill="white"/>
              <!-- Smile -->
              <path d="M192 100 Q200 107 208 100" stroke="#2d1a0a" stroke-width="2" fill="none" stroke-linecap="round"/>
              <!-- Floating code badges -->
              <rect x="55" y="130" width="44" height="22" rx="6" fill="#1a3a25" stroke="#34d399" stroke-width="1"/>
              <text x="77" y="145" text-anchor="middle" fill="#34d399" font-size="10" font-family="monospace">&lt;/&gt;</text>
              <rect x="300" y="110" width="44" height="22" rx="6" fill="#1a3a25" stroke="#34d399" stroke-width="1"/>
              <text x="322" y="125" text-anchor="middle" fill="#34d399" font-size="10" font-family="monospace">{ }</text>
              <rect x="60" y="180" width="44" height="22" rx="6" fill="#1a3a25" stroke="#6ee7b7" stroke-width="1"/>
              <text x="82" y="195" text-anchor="middle" fill="#6ee7b7" font-size="9" font-family="monospace">npm</text>
              <rect x="295" y="165" width="50" height="22" rx="6" fill="#1a3a25" stroke="#6ee7b7" stroke-width="1"/>
              <text x="320" y="180" text-anchor="middle" fill="#6ee7b7" font-size="9" font-family="monospace">git</text>
            </svg>
          `;
        }}
      />
    </div>

    <div className="relative z-10 text-center px-4">
      <h3 className="text-white text-xl font-bold font-space tracking-tight mb-2">
        Find your perfect dev match
      </h3>
      <p className="text-zinc-400 text-sm font-poppins leading-relaxed">
        Connect, collaborate, and build amazing things<br />with like-minded developers worldwide
      </p>
    </div>

    <div className="relative z-10 flex gap-6 mt-2">
      {[["5+", "Developers"], ["10+", "Connections daily"], ["0★", "Rating"]].map(([val, label]) => (
        <div key={label} className="text-center">
          <div className="text-emerald-400 font-bold text-sm font-space">{val}</div>
          <div className="text-zinc-600 text-xs font-poppins">{label}</div>
        </div>
      ))}
    </div>

  </div>
);


const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    try {
      if (isSignup) {
        const res = await axios.post(
          `${BASE_URL}/signup`,
          { firstName, lastName, emailId: email, password, gender },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/profile");
      } else {
        const res = await axios.post(
          `${BASE_URL}/login`,
          { emailId: email, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/profile");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0d0d0d] p-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl h-[88vh] max-h-[700px] flex flex-col md:flex-row overflow-hidden rounded-2xl relative z-10"
      >

        <div className="w-full md:w-1/2 flex flex-col justify-center overflow-y-auto bg-[#111111] rounded-l-2xl">
          <div className="p-8 md:p-10 max-w-md mx-auto w-full">

            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-emerald-500/20  flex items-center justify-center border border-emerald-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-400">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <span className="text-white font-space font-bold tracking-tight text-lg">RandomDev</span>
            </div>

            <motion.div
              key={isSignup ? "signup" : "login"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-extrabold text-white font-space tracking-tight mb-1">
                {isSignup ? "Create account" : "Welcome back"}
              </h2>
              <p className="text-zinc-500 text-sm font-poppins mb-7">
                {isSignup
                  ? "Join the community of top developers"
                  : "Enter your credentials to continue"}
              </p>
            </motion.div>


            <motion.form
              key={isSignup ? "signup-form" : "login-form"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-4"
              onSubmit={handleAuth}
            >

              {isSignup && (
                <>
                  <div className="flex gap-3">
                    <div className="w-1/2">
                      <label className="block mb-1.5 text-zinc-400 text-xs font-poppins uppercase tracking-wide">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10  focus:border-emerald-500/60 focus:bg-white/8 focus:outline-none transition-all font-poppins text-sm text-white placeholder-zinc-600"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block mb-1.5 text-zinc-400 text-xs font-poppins uppercase tracking-wide">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10  focus:border-emerald-500/60 focus:outline-none transition-all font-poppins text-sm text-white placeholder-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5 text-zinc-400 text-xs font-poppins uppercase tracking-wide">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-emerald-500/60 focus:outline-none transition-all font-poppins text-sm text-white"
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="" disabled className="bg-zinc-900">Select</option>
                      <option value="male" className="bg-zinc-900">Male</option>
                      <option value="female" className="bg-zinc-900">Female</option>
                      <option value="other" className="bg-zinc-900">Other</option>
                    </select>
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block mb-1.5 text-zinc-400 text-xs font-poppins uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10  focus:border-emerald-500/60 focus:outline-none transition-all font-poppins text-sm text-white placeholder-zinc-600"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1.5 text-zinc-400 text-xs font-poppins uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10  focus:border-emerald-500/60 focus:outline-none transition-all font-poppins text-sm text-white placeholder-zinc-600"
                />
                {!isSignup && (
                  <div className="mt-1.5 text-right">
                    <button type="button" className="text-xs text-zinc-500 hover:text-emerald-400 font-poppins transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              {/* Error */}
              {errorMessage && (
                <p className="text-red-400 text-sm font-semibold font-poppins">{errorMessage}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-1 py-3 bg-green-500 hover:bg-green-600 disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold transition-all duration-200 font-poppins text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    {/* Spinner */}
                    <svg
                      className="animate-spin h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    {isSignup ? "Creating account..." : "Signing in..."}
                  </>
                ) : (
                  isSignup ? "Create Account" : "Sign In"
                )}
              </button>
            </motion.form>

            {/* Divider */}
            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-white/8" />
              <span className="px-4 text-xs text-zinc-600 font-poppins">OR</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Toggle */}
            <p className="text-center text-sm text-zinc-500 font-poppins">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => { setIsSignup(!isSignup); setErrorMessage(null); }}
                className="ml-2 text-emerald-400 font-semibold hover:underline transition-colors cursor-pointer"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>

          </div>
        </div>

        {/* ── RIGHT: Illustration Panel ── */}
        <IllustrationPanel />

      </motion.div>
    </div>
  );
};

export default Login;