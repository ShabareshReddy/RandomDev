import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import Logo from "./Logo"
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
    background-image: linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  }
  .swiper-3d .swiper-slide-shadow-right{
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  }
  
  .swiper-pagination-bullet {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .swiper-pagination-bullet-active {
    background-color: #073127;
  }
  .swiper-button-next, .swiper-button-prev {
    color: white;
  }
  `
    return (
        <section className="w-full">
            <style>{css}</style>
            <div className="mx-auto w-full max-w-5xl rounded-[24px] border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm md:rounded-t-[44px]">
                <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-white/5 bg-black/20 p-2 shadow-inner md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-6">

                    {/* Badge */}
                    <div className="absolute left-4 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm md:left-8 backdrop-blur-md shadow-lg z-10">
                        <Logo className="text-emerald-400 w-5 h-5" />
                        <span className="font-bold text-white/90 font-space tracking-wider text-xs">RANDOMDEV</span>
                    </div>

                    <div className="flex flex-col justify-center pb-6 pl-4 pt-16 md:items-center w-full">
                        <div className="flex flex-col items-center text-center gap-1">
                            <h3 className="text-3xl md:text-5xl font-space text-white font-bold tracking-tight">
                                SWIPE. CONNECT.
                            </h3>
                            <h3 className="text-3xl md:text-5xl font-space text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold tracking-tight">
                                BUILD.
                            </h3>
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center gap-4 mt-4">
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
                                    depth: 150,
                                    modifier: 2.5,
                                    slideShadows: true,
                                }}
                                pagination={showPagination}
                                navigation={showNavigation}
                                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                                className="pb-12"
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="size-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={image.src}
                                                className="w-full h-full object-cover"
                                                alt={image.alt}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
