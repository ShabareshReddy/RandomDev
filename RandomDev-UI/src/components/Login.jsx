import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (isSignup) {
        // Sign Up Logic
        const res = await axios.post(
          `${BASE_URL}/signup`,
          { firstName, lastName, emailId: email, password, age, gender },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/feed");
      } else {
        // Login Logic
        const res = await axios.post(
          `${BASE_URL}/login`,
          { emailId: email, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/feed");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#073127]/10  blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#073127]/10  blur-[120px] pointer-events-none"></div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border-2 border-[#073127]/10"
      >

        {/* LEFT SIDE - Developer SVG */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#073127] to-[#0a4d3a] relative hidden md:flex items-center justify-center p-10 overflow-hidden">

          {/* SVG Illustration */}
          <svg viewBox="0 0 500 500" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
            {/* Background circles */}
            <circle cx="250" cy="250" r="200" fill="rgba(255,255,255,0.05)" />
            <circle cx="250" cy="250" r="150" fill="rgba(255,255,255,0.05)" />

            {/* Laptop base */}
            <rect x="120" y="280" width="260" height="15" rx="5" fill="#1a1a1a" />
            <rect x="100" y="295" width="300" height="8" rx="4" fill="#1a1a1a" />

            {/* Laptop screen */}
            <rect x="140" y="140" width="220" height="150" rx="8" fill="#1a1a1a" />
            <rect x="150" y="150" width="200" height="120" rx="4" fill="#0d0d0d" />

            {/* Code lines on screen */}
            <rect x="160" y="165" width="60" height="4" rx="2" fill="#4ade80" opacity="0.8" />
            <rect x="160" y="180" width="100" height="4" rx="2" fill="white" opacity="0.6" />
            <rect x="160" y="195" width="80" height="4" rx="2" fill="white" opacity="0.6" />
            <rect x="160" y="210" width="120" height="4" rx="2" fill="#4ade80" opacity="0.8" />
            <rect x="160" y="225" width="90" height="4" rx="2" fill="white" opacity="0.6" />
            <rect x="160" y="240" width="70" height="4" rx="2" fill="#4ade80" opacity="0.8" />

            {/* Developer person */}
            <circle cx="250" cy="350" r="25" fill="white" opacity="0.9" />
            <rect x="235" y="375" width="30" height="50" rx="8" fill="white" opacity="0.9" />

            {/* Coffee cup */}
            <rect x="320" y="270" width="30" height="35" rx="4" fill="white" opacity="0.8" />
            <ellipse cx="335" cy="268" rx="15" ry="5" fill="rgba(255,255,255,0.6)" />
            <path d="M 350 280 Q 360 280 360 290" stroke="white" strokeWidth="3" fill="none" opacity="0.6" />

            {/* Floating code brackets */}
            <text x="80" y="120" fontSize="40" fill="white" opacity="0.3" fontFamily="monospace">{"<>"}</text>
            <text x="380" y="180" fontSize="35" fill="white" opacity="0.3" fontFamily="monospace">{"{}"}</text>
            <text x="90" y="380" fontSize="30" fill="#4ade80" opacity="0.4" fontFamily="monospace">{"</>"}</text>
          </svg>
        </div>

        {/* RIGHT FORM SIDE - Made scrollable */}
        <div className=" text-black w-full md:w-1/2 flex flex-col bg-white max-h-[90vh] md:max-h-none overflow-y-auto">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="max-w-md mx-auto w-full">

              {/* TITLE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-3xl font-extrabold mb-2 text-[#073127] font-space tracking-tight">
                  {isSignup ? "Create Account" : "Welcome Back"}
                </h2>

                <p className="text-black mb-6 font-poppins text-sm">
                  {isSignup
                    ? "Join the community of top developers"
                    : "Enter your credentials to access your account"}
                </p>
              </motion.div>

              {/* FORM */}
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-4"
                onSubmit={handleAuth}
              >

                {/* NAME (Signup only) */}
                {isSignup && (
                  <>
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <label className="block mb-1.5 font-medium text-black font-poppins text-sm">First Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border-2 border-gray-300  focus:border-[#073127] focus:bg-white focus:outline-none transition-all font-poppins text-sm text-black"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block mb-1.5 font-medium text-black font-poppins text-sm">Last Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 focus:border-[#073127] focus:bg-white focus:outline-none transition-all font-poppins text-sm text-black"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <label className="block mb-1.5 font-medium text-black font-poppins text-sm">Age</label>
                        <input
                          type="number"
                          placeholder="25"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border-2 border-gray-300  focus:border-[#073127] focus:bg-white focus:outline-none transition-all font-poppins text-sm text-black"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block mb-1.5 font-medium text-black font-poppins text-sm">Gender</label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border-2 border-gray-300  focus:border-[#073127] focus:bg-white focus:outline-none transition-all font-poppins text-sm text-black"
                        >
                          <option value="" disabled>Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* EMAIL */}
                <div className="w-full">
                  <label className="block mb-1.5 font-medium text-black font-poppins text-sm">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 bg-white border-2 border-gray-300  focus:border-[#073127] focus:bg-white focus:outline-none transition-all font-poppins text-sm text-black"
                  />
                </div>

                {/* PASSWORD */}
                <div className="w-full">
                  <label className="block mb-1.5 font-medium text-black font-poppins text-sm">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-white border-2 border-gray-300  focus:border-[#073127] focus:bg-white focus:outline-none transition-all font-poppins text-sm text-black"
                  />
                  {!isSignup && (
                    <div className="mt-1.5 text-right">
                      <button type="button" className="text-xs text-[#073127] hover:underline font-poppins">
                        Forgot password?
                      </button>
                    </div>
                  )}
                </div>

                {errorMessage && <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 bg-[#073127] text-white  font-semibold hover:bg-[#0a4d3a] transition-all duration-300 shadow-lg hover:shadow-xl font-poppins text-sm cursor-pointer"
                >
                  {isSignup ? "Sign Up" : "Login"}
                </button>
              </motion.form>

              {/* DIVIDER */}
              <div className="flex items-center my-5">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-xs text-gray-500 font-poppins">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* TOGGLE LOGIN/SIGNUP */}
              <p className="mt-6 text-center text-sm text-gray-600 font-poppins">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setErrorMessage(null);
                  }}
                  className="ml-2 text-[#073127] font-semibold hover:underline transition-colors cursor-pointer"
                >
                  {isSignup ? "Login" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;