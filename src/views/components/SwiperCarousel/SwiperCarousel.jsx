import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './swiperCarousel.scss'
import { Navigation, FreeMode, Mousewheel } from "swiper";
import { responsiveBreak } from "utils/componentsConstants";

export default function SwiperCarousel({ playlists }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeWidth)

    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  })

  if (screenWidth >= responsiveBreak) {
    return (
      <>
        <h2>Hello</h2>
        <div ref={prevRef} className="swiper-carousel-button-prev">Prev</div>
        <div ref={nextRef} className="swiper-carousel-button-next">Next</div>
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          mousewheel={true}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          modules={[Navigation, Mousewheel]}
          className="swiper-carousel">
          {playlists?.map(playlist => {
            return <SwiperSlide key={playlist._id}>{playlist.name}</SwiperSlide>
          })}
        </Swiper>
      </>
    )
  }

  return (
    <>
      <h2>Hello</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={15}
        mousewheel={true}
        freeMode={true}
        modules={[Mousewheel, FreeMode]}
        className="swiper-carousel">
        {playlists?.map(playlist => {
          return <SwiperSlide key={playlist._id}>{playlist.name}</SwiperSlide>
        })}
      </Swiper>
    </>
  )

}