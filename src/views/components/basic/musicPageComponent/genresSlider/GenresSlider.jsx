import { useAuth0 } from '@auth0/auth0-react';
import RenderGenres from './genresRender/RenderGenres';
import { getGenresApi } from 'api/music/genres';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useState, useEffect, useRef, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './genresSlider.scss';
import { Navigation, FreeMode } from "swiper";
import SwiperDesktop from 'views/UI/swiperSettings/swiperDesktop/SwiperDesktop';
import SwiperMobile from 'views/UI/swiperSettings/swiperMobile/SwiperMobile';
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";

export default function GenresSlider() {
  const [screenWidth] = useWindowSizeReport()
  const [genres, setGenres] = useState(undefined)
  const { user } = useAuth0()

  useEffect(() => {
    let isMounted = true;
    const getGenres = async () => {
      getGenresApi().then(async res => {
        isMounted && res && setGenres(res.genres);
      })
    }
    getGenres()
    return () => { isMounted = false }
  }, [user])

  return (
    <Suspense fallback={<></>}>
      {(screenWidth > responsiveBreak) ? (
        <DesktopGenresSlider genres={genres} />
      ) : (
        <MobileGenresSlider genres={genres} />
      )}
    </Suspense>
  )
}

const DesktopGenresSlider = ({ genres }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="genres-carousel">
      <div className="genres-carousel__head">
        <TranslateTitle />
        <span className="genres-carousel__head--btn">
          <button ref={prevRef} className="swiper-carousel-button-prev">
            <HiOutlineChevronLeft />
          </button>
          <button ref={nextRef} className="swiper-carousel-button-next">
            <HiOutlineChevronRight />
          </button>
        </span>
      </div>
      <div className='genres-carousel__container'>
        <SwiperDesktop>
          {genres?.map(genre => {
            return (
              <SwiperSlide key={genre._id}>
                <RenderGenres genre={genre} />
              </SwiperSlide>
            )
          })}
        </SwiperDesktop>
      </div>
    </div>
  )
}

const MobileGenresSlider = ({ genres }) => {
  return (
    <div className="genres-carousel">
      <div className="genres-carousel__head">
        <TranslateTitle />
      </div>
      <div className='genres-carousel__container'>
        <SwiperMobile>
          {genres?.map(genre => {
            return (
              <SwiperSlide key={genre._id}>
                <RenderGenres genre={genre} />
              </SwiperSlide>
            )
          })}
        </SwiperMobile>
      </div>
    </div>
  )
}

const TranslateTitle = () => {
  const { t } = useTranslation();
  return <h2 className='genres-carousel__head--title'>{t("musicpage_genres")}</h2>;
}
