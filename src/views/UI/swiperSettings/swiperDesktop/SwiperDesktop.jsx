import { useRef } from "react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function SwiperDesktop({ children }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={32}
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      breakpoints={{
        815: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1300: {
          slidesPerView: 5,
        }
      }}
      modules={[Navigation]}
      className="swiper-carousel"
    >
      {children}
    </Swiper>
  )
}
