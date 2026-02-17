import React from 'react'
import { motion } from 'framer-motion'
import heroGroup from '/hero_group.png'
import chat from '/chat.png'
import hero from '/hero.png'

const Section3 = () => {

  return (
    <section className='relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 overflow-hidden'>

      <div className="container mx-auto px-6 max-w-7xl">

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LARGE CARD - Top Left (Spans 2 rows on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:row-span-2 bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">👉</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-geometric">Swipe & Match</h2>
                </div>
                <p className="text-gray-600 leading-relaxed font-poppins mb-6">
                  Browse through developer profiles just like your favorite dating app. Swipe right to connect with developers who share your interests and tech stack.
                </p>
                <button className="bg-[#073127] text-white px-6 py-3 rounded-full font-medium hover:bg-[#073127]/90 transition-colors">
                  Explore all
                </button>
              </div>

              {/* Image */}
              <div className="mt-auto rounded-2xl overflow-hidden border border-gray-100">
                <img
                  src={heroGroup}
                  alt="Swipe feature"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* CARD 2 - Top Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🤝</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 font-geometric">Smart Connections</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-poppins mb-6">
              Our algorithm matches you with developers based on skills, interests, and collaboration goals.
            </p>

            {/* Small visual element */}
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <img
                src={chat}
                alt="Connect feature"
                className="w-full h-40 object-cover"
              />
            </div>
          </motion.div>

          {/* CARD 3 - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🚀</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 font-geometric">Build Together</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-poppins mb-6">
              Start collaborating on projects, share knowledge, and grow your network in a supportive developer community.
            </p>

            {/* Small visual element */}
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <img
                src={hero}
                alt="Build feature"
                className="w-full h-40 object-cover"
              />
            </div>
          </motion.div>

        </div>

      </div>

      {/* BOTTOM LARGE "RANDOMDEV" TEXT */}
      <div className="w-full flex justify-center mt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[10vw] sm:text-[12vw] md:text-[15vw] font-black tracking-tighter text-[#073127]/10 leading-none select-none font-geometric"
        >
          RANDOMDEV
        </motion.h1>
      </div>

    </section>
  )
}

export default Section3