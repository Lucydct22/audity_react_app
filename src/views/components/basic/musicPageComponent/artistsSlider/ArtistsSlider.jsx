import { getArtistApi } from 'api/music/artists';
import RenderArtist from './renderArtist';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './artistsSlider.scss';
import { Navigation, FreeMode } from "swiper";
import { responsiveBreak } from "utils/componentsConstants";

export default function ArtistsSlider() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [artists, setArtists] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    getArtistApi().then(res => {
      isMounted && res && setArtists(res.artists);
    })
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeWidth)

    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  })

  if (screenWidth > responsiveBreak) {
    return (
      <div className="artists-carousel">
        <div className="artists-carousel__head">
          <TranslateTitle />
          <span className="artists-carousel__head--btn">
            <button ref={prevRef} className="swiper-carousel-button-prev">
              <HiOutlineChevronLeft />
            </button>
            <button ref={nextRef} className="swiper-carousel-button-next">
              <HiOutlineChevronRight />
            </button>
          </span>
        </div>
        <div className='artists-carousel__container'>
          <Swiper
            slidesPerView={5}
            spaceBetween={15}
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
            className="swiper-carousel">
            {artists?.map(artist => {
              return (
                <SwiperSlide key={artist._id}>
                  <RenderArtist artist={artist} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    )
  }

  return (
    <div className="artists-carousel">
      <div className="artists-carousel__head">
        <TranslateTitle />
      </div>
      <div className='artists-carousel__container'>
        <Swiper
          slidesPerView={3.2}
          spaceBetween={15}
          freeMode={true}
          breakpoints={{
            0: {
              slidesPerView: 2.2,
            },
            560: {
              slidesPerView: 2.2,
            }
          }}
          modules={[FreeMode]}
          className="swiper-carousel">
          {artists?.map(artist => {
            return (
              <SwiperSlide key={artist._id}>
                <RenderArtist artist={artist} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='artists-carousel__head--title'>{t("musicpage_artirstitle")}</h2>;
}
