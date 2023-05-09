import { getAlbumsApi } from 'api/music/albums';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import RenderAlbum from './renderAlbum';
import { useState, useEffect, useRef, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './albumsSlider.scss';
import { Navigation, FreeMode } from "swiper";
import { responsiveBreak } from "utils/componentsConstants";

export default function AlbumsSlider() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const [albums, setAlbums] = useState(undefined)

  useEffect(() => {
    let isMounted = true;
    getAlbumsApi().then(res => {
      isMounted && res && setAlbums(res.albums);
    })
    return () => { isMounted = false }
  }, []);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeWidth)

    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  })

  return (
    <Suspense fallback={<></>}>
      {(screenWidth > responsiveBreak) ? (
        <DesktopAlbumsSlider albums={albums} />
      ) : (
        <MobileAlbumsSlider albums={albums} />
      )}
    </Suspense>
  )
}

const DesktopAlbumsSlider = ({ albums }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

const MobileAlbumsSlider = ({ albums }) => {
  return (
    <div className="album-carousel">
      <div className="album-carousel__head">
        <TranslateTitle />
      </div>
      <div className='album-carousel__container'>
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
