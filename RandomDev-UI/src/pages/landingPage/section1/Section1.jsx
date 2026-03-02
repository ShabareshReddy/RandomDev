import React, { useState, useEffect } from 'react'
import Navbarr from '../../../components/Navbarr'
import { motion, AnimatePresence } from 'framer-motion'
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom'

/* ── Words that cycle in the heading ── */
const CYCLING_WORDS = ["Network", "Networth"]

const Section1 = () => {
  const navigate = useNavigate()
  const handleGetStarted = () => navigate('/login')

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [wordIndex, setWordIndex] = useState(0)

  /* Auto-cycle every 2.2 s */
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) * 0.01,
      y: (e.clientY - rect.top - rect.height / 2) * 0.01,
    })
  }

  /* Framer variants */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  /* Slide-up enter / slide-down exit for cycling word */
  const wordVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: "0%", opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-white py-12"
    >
      <Navbarr />

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-grid grid-fade" />

      {/* SOFT FADE */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/80" />

      {/* CENTER CONTENT */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        {/* ── HEADING ── */}
        <motion.div
          variants={itemVariants}
          className="px-8 py-12 md:px-16 tracking-tighter md:py-20"
        >
          {/* Static first line */}
          <h1 className="font-space font-extrabold text-[#073127] tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl ">
            Find Your Tribe,
          </h1>

          {/* Second line: "Build Your [WORD]." with animated word */}
          <h1 className="font-space font-extrabold text-[#073127] tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mt-1 flex items-center justify-center gap-3 flex-wrap">
            <span>Build Your</span>

            {/* Animated word container – clipped so text slides in/out cleanly */}
            <span
              className="relative inline-flex tracking-tight items-center justify-center overflow-hidden"
              style={{ minWidth: "7ch" }}
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={CYCLING_WORDS[wordIndex]}
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="inline-block bg-green-500 tracking-tighter transition-colors rotate-[0.5] text-black/90 font-space px-1.5 rounded-sm py-0.5"
                >
                  {CYCLING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>

          </h1>

          <p className="text-black font-instrument   text-xl sm:text-2xl mt-5">
            Connect with like-minded professionals and expand your network.
          </p>
        </motion.div>

        {/* ── GET STARTED BUTTON ── */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="
            flex items-center gap-1
            bg-[#073127] text-white font-space font-medium
            px-6 py-2.5 mt-4
            border-2 border-transparent
            hover:text-green-400
            transition-all duration-300
            text-base md:text-lg
            shadow-lg hover:shadow-xl
          "
        >
          <span>Get Started</span>
          <GoArrowUpRight className="text-lg" />
        </motion.button>

        {/* ── TWO FEATURE CARDS ── */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl w-full"
        >
          {/* Card 1 */}
          <div className="bg-[#073127] backdrop-blur-md border border-white/10 p-8 shadow-2xl hover:shadow-emerald-900/40 hover:-translate-y-1 transition-all duration-300 group text-left">
            <h3 className="font-space tracking-tight font-bold text-white text-xl mb-3 group-hover:text-green-400 transition-colors">
              Connect Instantly
            </h3>
            <p className="text-zinc-300 font-instrument text-md">
              Match with developers who share your interests and start collaborating on exciting projects.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#073127] backdrop-blur-md border border-white/10 p-8 shadow-2xl hover:shadow-emerald-900/40 hover:-translate-y-1 transition-all duration-300 text-left group">
            <h3 className="font-space tracking-tight font-bold text-white text-xl mb-3 group-hover:text-green-400 transition-colors">
              Grow Together
            </h3>
            <p className="text-zinc-300 font-instrument font-medium text-md">
              Build meaningful connections and level up your skills with a supportive community.
            </p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

export default Section1