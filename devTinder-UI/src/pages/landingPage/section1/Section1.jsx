import React, { useState } from 'react'
import Navbarr from '../../../components/Navbarr'
import { motion } from 'framer-motion'
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom'

const Section1 = () => {
  const navigate = useNavigate()
  const handleGetStarted = () => {
    navigate('/login')
  }
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setMouse({
      x: x * 0.01,
      y: y * 0.01,
    })
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-white py-12"
    >

      <Navbarr />

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-grid grid-fade"></div>

      {/* SOFT FADE */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/80"></div>

      {/* FLOATING PROFILE AVATARS */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">

        {/* Avatar 1 - Top Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute left-[12%] top-[18%] transition-transform duration-300"
          style={{ transform: `translate(${mouse.x * -3}px, ${mouse.y * -3}px)` }}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-pink-400 to-pink-600">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Small pointer triangle - bottom right */}
            <div className="absolute -bottom-2 -right-2 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-gray-800 border-r-[12px] border-r-transparent"></div>
          </div>
        </motion.div>

        {/* Avatar 2 - Top Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="absolute right-[15%] top-[15%] transition-transform duration-300"
          style={{ transform: `translate(${mouse.x * -2}px, ${mouse.y * -2}px)` }}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Small pointer triangle - bottom left */}
            <div className="absolute -bottom-2 -left-2 w-0 h-0 border-r-[12px] border-r-transparent border-t-[12px] border-t-gray-800 border-l-[12px] border-l-transparent"></div>
          </div>
        </motion.div>

        {/* Avatar 3 - Left Bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute left-[8%] bottom-[30%] transition-transform duration-300"
          style={{ transform: `translate(${mouse.x * -1.5}px, ${mouse.y * -1.5}px)` }}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Small pointer triangle - top right */}
            <div className="absolute -top-2 -right-2 w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-gray-800 border-r-[12px] border-r-transparent"></div>
          </div>
        </motion.div>

        {/* Avatar 4 - Right Bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute right-[10%] bottom-[35%] transition-transform duration-300"
          style={{ transform: `translate(${mouse.x * -2.5}px, ${mouse.y * -2.5}px)` }}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500">
              <img
                src="https://i.pravatar.cc/150?img=58"
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Small pointer triangle - top left */}
            <div className="absolute -top-2 -left-2 w-0 h-0 border-r-[12px] border-r-transparent border-b-[12px] border-b-gray-800 border-l-[12px] border-l-transparent"></div>
          </div>
        </motion.div>

      </div>

      {/* CENTER CONTENT */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        {/* HEADING - Simplified */}
        <motion.div
          variants={itemVariants}
          className="px-8 py-12 md:px-16 md:py-20 "
        >
          <h1 className="font-geometric font-extrabold text-[#073127] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Find Your Tribe,
            <br />
            Build Your Network.
          </h1>
          <p className="text-black font-instrument text-xl mt-4">Connect with like-minded professionals and expand your network.</p>
        </motion.div>


        {/* GET STARTED BUTTON */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            flex items-center gap-2
            bg-[#073127] text-white font-medium
            px-8 py-3
            rounded-full mt-8
            border-2 border-transparent
            hover:border-[#073127]
            hover:bg-transparent
            hover:text-[#073127]
            transition-all duration-300
            text-base md:text-lg
            shadow-lg hover:shadow-xl
          "
        >
          <span onClick={handleGetStarted}>Get Started</span>
          <GoArrowUpRight className="text-lg" />
        </motion.button>

        {/* TWO TEXT CARDS BELOW BUTTON */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl w-full"
        >
          {/* Card 1 */}
          <div className="bg-white/80 backdrop-blur-md border-2 border-[#073127]/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="font-geometric font-bold text-[#073127] text-xl mb-3">Connect Instantly</h3>
            <p className="text-black font-instrument font-semibold text-md leading-relaxed">
              Match with developers who share your interests and start collaborating on exciting projects.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/80 backdrop-blur-md border-2 border-[#073127]/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="font-geometric font-bold text-[#073127] text-xl mb-3">Grow Together</h3>
            <p className="text-black font-instrument font-bold text-md leading-loose">
              Build meaningful connections and level up your skills with a supportive community.
            </p>
          </div>
        </motion.div>

      </motion.div>

    </section>
  )
}

export default Section1