import React from "react";
import { motion } from "framer-motion";
import {
  FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws, FaGithub, FaFigma, FaHtml5, FaCss3Alt, FaJs
} from "react-icons/fa";
import {
  SiMongodb, SiPostgresql, SiTypescript, SiTailwindcss, SiKubernetes, SiMysql, SiFirebase, SiVercel, SiNextdotjs
} from "react-icons/si";

const iconsRow1 = [
  { Icon: FaReact, color: "text-blue-400" },
  { Icon: FaNodeJs, color: "text-green-500" },
  { Icon: SiTypescript, color: "text-blue-600" },
  { Icon: SiNextdotjs, color: "text-black" },
  { Icon: SiTailwindcss, color: "text-cyan-400" },
  { Icon: FaPython, color: "text-yellow-500" },
  { Icon: FaJava, color: "text-red-500" },
  { Icon: SiFirebase, color: "text-yellow-400" },
];

const developers = [
  { name: "Sarah K.", role: "Full Stack", image: "https://randomuser.me/api/portraits/women/44.jpg", skill: "React" },
  { name: "James L.", role: "Backend", image: "https://randomuser.me/api/portraits/men/32.jpg", skill: "Node.js" },
  { name: "Elena R.", role: "DevOps", image: "https://randomuser.me/api/portraits/women/65.jpg", skill: "AWS" },
  { name: "Michael C.", role: "Mobile", image: "https://randomuser.me/api/portraits/men/86.jpg", skill: "Flutter" },
  { name: "David W.", role: "Frontend", image: "https://randomuser.me/api/portraits/men/11.jpg", skill: "Vue" },
  { name: "Priya M.", role: "Data Sci", image: "https://randomuser.me/api/portraits/women/28.jpg", skill: "Python" },
  { name: "Tom H.", role: "UI/UX", image: "https://randomuser.me/api/portraits/men/45.jpg", skill: "Figma" },
  { name: "Alex B.", role: "Security", image: "https://randomuser.me/api/portraits/women/68.jpg", skill: "CyberSec" },
];

const MarqueeRow = ({ items, type = "icon", direction = "left", speed = 20 }) => {
  return (
    <div className="flex w-full overflow-hidden relative">
      <motion.div
        className="flex gap-6 whitespace-nowrap py-4"
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity
        }}
      >
        {/* Render items twice to create seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className={`
              bg-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 shrink-0
              ${type === "icon" ? "w-20 h-20 md:w-24 md:h-24" : "w-auto h-20 md:h-24 px-4 min-w-[200px]"}
            `}
          >
            {type === "icon" ? (
              <item.Icon className={`text-4xl md:text-5xl ${item.color}`} />
            ) : (
              <div className="flex items-center gap-4 w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-zinc-100"
                />
                <div className="flex flex-col text-left">
                  <span className="text-zinc-900 font-bold text-sm md:text-base leading-tight">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white bg-black px-1.5 py-0.5 rounded-md">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Section2 = () => {
  return (
    <section className="w-full min-h-[80vh] bg-[#073127] flex flex-col items-center justify-center py-20 relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#073127] to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#073127] to-transparent z-10"></div>

      {/* HEADINGS */}
      <div className="w-full max-w-4xl px-6 flex flex-col items-center text-center mb-16 relative z-20">

        {/* Badge */}
        <div className="mb-8 px-4 py-1.5  border border-white/20 bg-white/10 backdrop-blur-md">
          <span className="text-white/80 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Tech Ecosystem
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-space font-bold text-white mb-6 tracking-tight"
        >
          Built for every stack.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-300 font-instrument max-w-2xl leading-relaxed"
        >
          We understand the hassle of switching tools. That's why we integrate seamlessly with the languages and frameworks you use every day.
        </motion.p>
      </div>

      {/* MARQUEE ROWS */}
      <div className="w-full flex flex-col gap-8 relative z-10 rotate-[-2deg] scale-105">
        <MarqueeRow items={iconsRow1} type="icon" direction="left" speed={40} />
        <MarqueeRow items={developers} type="profile" direction="right" speed={50} />
      </div>

      {/* FOOTER LINK */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-16 relative z-20"
      >
        <button className="text-white/70 hover:text-white font-space border-b border-white/30 hover:border-white transition-all pb-1 text-sm tracking-widest uppercase">
          View All Integrations →
        </button>
      </motion.div>

    </section>
  );
};

export default Section2;