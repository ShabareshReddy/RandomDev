import React from "react";
import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";

const courses = [
  {
    title: "Data Science & Gen AI",
    desc: "Harness the power of data. Master visualization, predictive modeling, and Generative AI to make smarter decisions and build intelligent systems.",

    tags: ["AI Integrated", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    icon: "📊",
    color: "text-blue-900",
  },
  {
    title: "Data Science & Gen AI",
    desc: "Harness the power of data. Master visualization, predictive modeling, and Generative AI to make smarter decisions and build intelligent systems.",

    tags: ["AI Integrated", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    icon: "📊",
    color: "text-blue-900",
  },
  {
    title: "Data Science & Gen AI",
    desc: "Harness the power of data. Master visualization, predictive modeling, and Generative AI to make smarter decisions and build intelligent systems.",

    tags: ["AI Integrated", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
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
          className="text-4xl md:text-6xl font-space font-black text-white mb-6 tracking-tight"
        >
          Forge Your Path.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl md:text-xl text-zinc-400 font-instrument leading-relaxed"
        >
          Elite curriculums designed for the modern engineer. Stop learning syntax, start building value.
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

                <h3 className="text-3xl md:text-5xl font-space font-bold text-zinc-900 mb-6 tracking-tight">
                  {course.title}
                </h3>

                <p className="text-zinc-600 font-instrument text-lg md:text-xl leading-relaxed max-w-lg">
                  {course.desc}
                </p>
              </div>

              {/* PRICE + BUTTON */}
              <div className="flex items-center justify-between border-t border-zinc-100 pt-8 mt-auto">
                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400 font-medium line-through mb-1 font-mono">
                    {course.oldPrice}
                  </span>
                  <div className="text-3xl font-geometric font-bold text-[#073127]">
                    {course.price}
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE SIDE */}
            <div className="flex-1 order-1 md:order-2 p-3 md:p-4 flex items-center justify-center min-h-[300px] md:min-h-auto">

              {/* OUTER FRAME - Styled like a device/container */}
              <div className="w-full h-full bg-zinc-700 rounded-xl p-3 shadow-inner flex items-center justify-center relative overflow-hidden">

                {/* Subtle sheen on the dark frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none"></div>

                {/* INNER FRAME */}
                <div className="w-full h-full bg-zinc-800 r overflow-hidden shadow-2xl relative group-hover:scale-[0.98] transition-transform duration-700 ease-out">

                  {/* IMAGE */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />

                  {/* OVERLAY VISUALS */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                  {/* FLOATING ICON */}
                  <div className="absolute top-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-3xl shadow-lg z-20 group-hover:rotate-12 transition-transform duration-500">
                    {course.icon}
                  </div>

                  {/* Decorative Elements on Image */}
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
                      <span className="text-white/90 text-xs font-mono">Verified Curriculum</span>
                    </div>
                  </div>

                </div>
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