import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode } from "swiper";

export default function SwiperMobile({ children }) {
  return (
    <Swiper
      slidesPerView={3.3}
      spaceBetween={15}
      freeMode={true}
      breakpoints={{
        150: {
          slidesPerView: 2.3,
        },
        515: {
          slidesPerView: 3.3,
        },
      }}
      modules={[FreeMode]}
      className="swiper-carousel"
    >
      {children}
    </Swiper>
  )
}
