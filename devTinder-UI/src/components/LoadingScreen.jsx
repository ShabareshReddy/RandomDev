import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
    const text = "RandomDev";

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
            {/* Animated Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[#073127]/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-6"
                >
                    <span className="text-black font-bold text-3xl" style={{ fontFamily: "ephesis" }}>D</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider relative flex" style={{ fontFamily: "ephesis" }}>
                    {text.split("").map((letter, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.1,
                                delay: index * 0.15, // Adjust speed here for typewriter effect
                                ease: "easeIn"
                            }}
                            onAnimationComplete={() => {
                                if (index === text.length - 1 && onComplete) {
                                    setTimeout(onComplete, 800); // 800ms pause after typing finishes before dismissing
                                }
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-4 text-gray-400 font-poppins tracking-widest text-sm uppercase"
                >
                    Finding your peer...
                </motion.p>
            </div>
        </div>
    );
};

export default LoadingScreen;
