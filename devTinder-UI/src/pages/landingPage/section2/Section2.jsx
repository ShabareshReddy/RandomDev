import React from "react";
import { CardCarouselParent } from "../../../components/CardCarouselParent"
import { motion } from "framer-motion";
import Logo from "/Logo.png";
const Section2 = () => {

  const images = [
    { src: Logo, alt: "Image 1" },
    { src: "https://legacy.skiper-ui.com/_next/image?url=%2Fcard%2F2.png&w=640&q=75", alt: "Image 2" },
    { src: "https://legacy.skiper-ui.com/_next/image?url=%2Fcard%2F3.png&w=640&q=75", alt: "Image 3" },
    { src: "https://legacy.skiper-ui.com/_next/image?url=%2Fcard%2F1.png&w=640&q=75", alt: "Image 4" },
    { src: "https://legacy.skiper-ui.com/_next/image?url=%2Fcard%2F2.png&w=640&q=75", alt: "Image 5" },
  ];

  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center py-12 overflow-hidden">

      {/* HEADINGS CONTAINER - Same width as carousel */}
      <div className="w-full md:w-[90%] lg:w-[80%] px-6 flex flex-col md:flex-row justify-between items-start mb-16 gap-10 md:gap-0">

        {/* LEFT TEXT GROUP - Own the EDGE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <span className="text-2xl md:text-4xl font-mont tracking-tighter font-bold text-zinc-900 mb-1 italic">Own the</span>

          {/* EDGE with colored highlight in middle */}
          <div className="relative inline-block">
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-none tracking-tight relative z-10 font-geometric px-9">EDGE</span>
            {/* Pink highlight positioned in the middle */}
            <div className="absolute top-1/2 left-0 right-0 h-4 md:h-6 bg-green-900 opacity-70 -translate-y-1/2 rounded-sm"></div>
          </div>
        </motion.div>

        {/* RIGHT TEXT GROUP - Keep the VIBE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col items-start md:items-end"
        >
          <span className="text-2xl md:text-4xl font-normal text-gray-800 mb-1 italic md:text-right">Keep the</span>

          {/* VIBE with colored highlight in middle */}
          <div className="relative inline-block">
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-none tracking-tight relative z-10 font-geometric">VIBE</span>
            {/* Pink highlight positioned in the middle */}
            <div className="absolute top-1/2 left-0 right-0 h-4 md:h-6 bg-[#073127]  -translate-y-1/2 rounded-sm"></div>
          </div>
        </motion.div>
      </div>

      {/* CAROUSEL CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full md:w-[90%] lg:w-[80%]"
      >
        <CardCarouselParent
          images={images}
          autoplayDelay={2000}
          showPagination={true}
          showNavigation={true}
        />
      </motion.div>
    </section>
  );
};

export default Section2;