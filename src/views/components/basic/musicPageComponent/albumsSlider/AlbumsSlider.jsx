import { getAlbumsApi } from 'api/music/albums';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import RenderAlbum from './renderAlbum';
import { useState, useEffect, useRef, Suspense } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './albumsSlider.scss';
import SwiperDesktop from 'views/UI/swiperSettings/swiperDesktop/SwiperDesktop';
import SwiperMobile from 'views/UI/swiperSettings/swiperMobile/SwiperMobile';
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";

export default function AlbumsSlider() {
  const [screenWidth] = useWindowSizeReport()
  const [albums, setAlbums] = useState(undefined)

  useEffect(() => {
    let isMounted = true;
    getAlbumsApi().then(res => {
      isMounted && res && setAlbums(res.albums);
    })
    return () => { isMounted = false }
  }, []);

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
        <SwiperDesktop>
          {albums?.map(album => {
            return (
              <SwiperSlide key={album._id}>
                <RenderAlbum album={album} />
              </SwiperSlide>
            )
          })}
        </SwiperDesktop>
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
        <SwiperMobile>
          {albums?.map(album => {
            return (
              <SwiperSlide key={album._id}>
                <RenderAlbum album={album} />
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

  return <h2 className='album-carousel__head--title'>{t("musicpage_albumtitle")}</h2>;
}
