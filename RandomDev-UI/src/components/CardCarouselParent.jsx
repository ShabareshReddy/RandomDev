import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { FaMagic } from "react-icons/fa"
import { FaArrowDown } from 'react-icons/fa';
import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from "swiper/modules"

export const CardCarouselParent = ({
    images,
    autoplayDelay = 1500,
    showPagination = true,
    showNavigation = true,
}) => {
    const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `
    return (
        <section className="w-full">
            <style>{css}</style>
            <div className="mx-auto w-full max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
                <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">

                    {/* Badge Replacement */}
                    <div className="absolute left-4 top-6 flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-3 py-1 text-sm md:left-6 backdrop-blur-sm">
                        <FaMagic className="text-yellow-500" />
                        <span className="font-medium text-black font-fugaz">RANDOMDEV</span>
                    </div>

                    <div className="flex flex-col justify-center pb-2 pl-4 pt-14 md:items-center">
                        <div className="flex gap-2">
                            <div>
                                <h3 className="text-4xl font-fugaz text-black opacity-85 font-bold tracking-tight">
                                    SWIPE
                                </h3>
                                <h3 className="text-4xl font-fugaz text-black opacity-85 font-bold tracking-tight">
                                    CONNECT & BUILD
                                </h3>

                            </div>
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center gap-4">
                        <div className="w-full">
                            <Swiper
                                spaceBetween={50}
                                autoplay={{
                                    delay: autoplayDelay,
                                    disableOnInteraction: false,
                                }}
                                effect={"coverflow"}
                                grabCursor={true}
                                centeredSlides={true}
                                loop={true}
                                slidesPerView={"auto"}
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2.5,
                                }}
                                pagination={showPagination}
                                navigation={
                                    showNavigation
                                        ? {
                                            nextEl: ".swiper-button-next",
                                            prevEl: ".swiper-button-prev",
                                        }
                                        : undefined
                                }
                                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="size-full rounded-3xl overflow-hidden">
                                            <img
                                                src={image.src}
                                                className="w-full h-full object-cover rounded-xl"
                                                alt={image.alt}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                                {/* Duplicate slides for seamless loop effect if needed, though Swiper 'loop={true}' handles it. 
                                    Keeping simple for now. 
                                */}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
