import { getAlbumsApi } from 'api/music/albums';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import RenderAlbum from './renderAlbum';
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './albumsSlider.scss';
import { Navigation, FreeMode } from "swiper";
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from 'hooks/useWindowSizeReport';

export default function AlbumsSlider() {
  const windowWidth = useWindowSizeReport();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [albums, setAlbums] = useState(undefined)

  useEffect(() => {
    let isMounted = true;
    getAlbumsApi().then(res => {
      isMounted && res && setAlbums(res.albums);
    })
    return () => { isMounted = false }
  }, []);

  if (windowWidth >= responsiveBreak) {
    return (
      <div className="album-carousel">
        <div className="album-carousel__head">
          <TranslateTitle />
          <span className="album-carousel__head--btn">
            <button ref={prevRef} className="swiper-carousel-button-prev">
              <HiOutlineChevronLeft />
            </button>
            <button ref={nextRef} className="swiper-carousel-button-next">
              <HiOutlineChevronRight />
            </button>
          </span>
        </div>
        <div className='album-carousel__container'>
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
            {albums?.map(album => {
              return (
                <SwiperSlide key={album._id}>
                  <RenderAlbum album={album} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    )
  }

  return (
    <div className="album-carousel">
      <div className="album-carousel__head">
        <TranslateTitle />
      </div>
      <div className='album-carousel__container'>
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
          {albums?.map(album => {
            return (
              <SwiperSlide key={album._id}>
                <RenderAlbum album={album} />
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

  return <h2 className='album-carousel__head--title'>{t("musicpage_albumtitle")}</h2>;
}
