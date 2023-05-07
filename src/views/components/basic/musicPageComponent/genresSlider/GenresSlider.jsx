import { useAuth0 } from '@auth0/auth0-react';
import RenderGenres from './genresRender/RenderGenres';
import { getGenresApi } from 'api/music/genres';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './genresSlider.scss';
import { Navigation, FreeMode } from "swiper";
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from 'hooks/useWindowSizeReport';


export default function GenresSlider() {
  const windowWidth = useWindowSizeReport();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [genres, setGenres] = useState(undefined)
  const { user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    let isMounted = true;
    const getGenres = async () => {
      const token = await getAccessTokenSilently()
      token && getGenresApi(token).then(async res => {
        isMounted && res && setGenres(res.genres);
      })
    }
    getGenres()
    return () => { isMounted = false }
  }, [user])

  if (windowWidth >= responsiveBreak) {
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
            {genres?.map(genre => {
              return (
                <SwiperSlide key={genre._id}>
                  <RenderGenres genre={genre} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    )
  }

  return (
    <div className="genres-carousel">
      <div className="genres-carousel__head">
        <TranslateTitle />
      </div>
      <div className='genres-carousel__container'>
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
            {genres?.map(genre => {
              return (
                <SwiperSlide key={genre._id}>
                  <RenderGenres genre={genre} />
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

  return <h2 className='genres-carousel__head--title'>{t("musicpage_genres")}</h2>;
}
