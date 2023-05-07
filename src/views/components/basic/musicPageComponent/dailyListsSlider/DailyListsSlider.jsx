import { getPlaylistApi } from 'api/music/playlists';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import RenderPlaylist from './renderPlaylist/RenderPlaylist';
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './dailyListsSlider.scss';
import { Navigation, FreeMode } from "swiper";
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from 'hooks/useWindowSizeReport';

export default function DailyListsSlider() {
  const windowWidth = useWindowSizeReport();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [playlists, setPlaylists] = useState(undefined)

  useEffect(() => {
    let isMounted = true;
    getPlaylistApi().then(res => {
      isMounted && res && setPlaylists(res.playlist);
    })
    return () => { isMounted = false }
  }, [])

  if (windowWidth >= responsiveBreak) {
    return (
      <div className="daily-carousel">
        <div className="daily-carousel__head">
          <TranslateTitle />
          <span className="daily-carousel__head--btn">
            <button ref={prevRef} className="swiper-carousel-button-prev">
              <HiOutlineChevronLeft />
            </button>
            <button ref={nextRef} className="swiper-carousel-button-next">
              <HiOutlineChevronRight />
            </button>
          </span>
        </div>
        <div className='daily-carousel__container'>
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
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1175: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1475: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            modules={[Navigation]}
            className="swiper-carousel">
            {playlists?.map(playlist => {
              return (
                <SwiperSlide key={playlist._id}>
                  <RenderPlaylist playlist={playlist} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    )
  }

  return (
    <div className="daily-carousel">
      <div className="daily-carousel__head">
        <TranslateTitle />
      </div>
      <div className='daily-carousel__container'>
        <Swiper
          slidesPerView={3.3}
          spaceBetween={25}
          freeMode={true}
          breakpoints={{
            150: {
              slidesPerView: 2.2,
              spaceBetween: 15,
            },
            560: {
              slidesPerView: 2.2,
              spaceBetween: 15,
            },
            814: {
              slidesPerView: 3.3,
              spaceBetween: 25,
            }
          }}
          modules={[FreeMode]}
          className="swiper-carousel">
          {playlists?.map(playlist => {
            return (
              <SwiperSlide key={playlist._id}>
                <RenderPlaylist playlist={playlist} />
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

  return <h2 className='daily-carousel__head--title'>{t("musicpage_dailytitle")}</h2>;
}
