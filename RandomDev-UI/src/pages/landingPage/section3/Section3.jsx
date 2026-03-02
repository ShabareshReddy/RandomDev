import React from "react";
import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";


const courses = [
  {
    title: "Dev Connections",
    desc: "Discover and connect with developers across technologies. Grow your professional network, explore profiles, and build meaningful collaborations within the RandomDev community.",

    tags: ["Networking", "Community"],
    image: "/Feed.png",
    icon: "📊",
    color: "text-blue-900",
  },
  {
    title: "Connection Requests",
    desc: "Send, receive, and manage connection requests. Build your trusted developer circle and expand opportunities through mutual collaborations.",

    tags: ["Networking", "Requests"],
    image: "/connections.png",
    icon: "📊",
    color: "text-blue-900",
  },
  {
    title: "Real-Time Communication",
    desc: "Chat in real time, discuss projects, share ideas, and collaborate effectively through seamless developer messaging.",

    tags: ["Messaging", "Real-Time"],
    image:
      "/chatimg.png",
    icon: "📊",
    color: "text-blue-900",
  },
];

const Section3 = () => {
  return (
    <section className="w-full min-h-screen bg-zinc-900 py-24 px-4 md:px-8 lg:px-16 flex flex-col items-center gap-20 relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] pointer-events-none"></div>

      {/* HEADING */}
      <div className="text-center max-w-3xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl  md:text-6xl font-space font-extrabold  text-white mb-6 tracking-tight"
        >
          Connect • Collaborate • Communicate
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl md:text-xl text-zinc-400 font-instrument leading-relaxed"
        >
          From connection requests to real-time communication — RandomDev brings developers together.
        </motion.p>
      </div>

      {/* CARDS */}
      <div className="flex flex-col gap-16 w-full max-w-6xl relative z-10">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group w-full bg-zinc-300 rounded-lg p-2 border border-zinc-800 shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500 flex flex-col md:flex-row overflow-hidden"
          >
            {/* LEFT CONTENT */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between order-2 md:order-1 gap-8">

              <div>
                {/* TAGS */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {course.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-4 py-1.5 ${course.color} bg-opacity-50 text-xs font-bold font-mono tracking-widest uppercase rounded-full border border-current opacity-80`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-3xl md:text-5xl font-space font-bold text-zinc-900 mb-6 tracking-tighter">
                  {course.title}
                </h3>

                <p className="text-zinc-700 font-instrument text-sm md:text-xl leading-relaxed max-w-lg">
                  {course.desc}
                </p>
              </div>


            </div>

            {/* RIGHT IMAGE SIDE */}
            <div className="flex-1 order-1 md:order-2 p-3 md:p-4 h-[280px] md:h-full flex items-stretch">

              {/* OUTER FRAME */}
              <div className="w-full h-full rounded-md overflow-hidden bg-zinc-900 shadow-inner">

                {/* IMAGE — fills the frame completely */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />

              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* FOOTER TEXT */}
      <div className="w-full mt-24 flex justify-center items-center relative z-10 select-none pb-10">
        <h1
          className="text-[15vw] leading-[0.8] font-space font-black tracking-tighter text-transparent transition-all duration-700 ease-out cursor-pointer
          [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] 
          hover:[-webkit-text-stroke:0px] 
          hover:text-zinc-700 hover:drop-shadow-[0_0_30px_rgba(7,49,39,0.5)]"
        >
          RandomDev
        </h1>
      </div>

    </section>
  );
};

export default Section3;