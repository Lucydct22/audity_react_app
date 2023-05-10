import { getArtistApi } from 'api/music/artists';
import RenderArtist from './renderArtist';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useState, useEffect, useRef, Suspense } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './artistsSlider.scss';
import SwiperDesktop from 'views/UI/swiperSettings/swiperDesktop/SwiperDesktop';
import SwiperMobile from 'views/UI/swiperSettings/swiperMobile/SwiperMobile';
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";

export default function ArtistsSlider() {
  const [screenWidth] = useWindowSizeReport()
  const [artists, setArtists] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    getArtistApi().then(res => {
      isMounted && res && setArtists(res.artists);
    })
    return () => { isMounted = false }
  }, [])

  return (
    <Suspense fallback={<></>}>
      {(screenWidth > responsiveBreak) ? (
        <DesktopArtistsSlider artists={artists} />
      ) : (
        <MobileArtistsSlider artists={artists} />
      )}
    </Suspense>
  )
}

const DesktopArtistsSlider = ({ artists }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
        <SwiperDesktop>
          {artists?.map(artist => {
            return (
              <SwiperSlide key={artist._id}>
                <RenderArtist artist={artist} />
              </SwiperSlide>
            )
          })}
        </SwiperDesktop>
      </div>
    </div>
  )
}

const MobileArtistsSlider = ({ artists }) => {
  return (
    <div className="artists-carousel">
      <div className="artists-carousel__head">
        <TranslateTitle />
      </div>
      <div className='artists-carousel__container'>
        <SwiperMobile>
          {artists?.map(artist => {
            return (
              <SwiperSlide key={artist._id}>
                <RenderArtist artist={artist} />
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

  return <h2 className='artists-carousel__head--title'>{t("musicpage_artirstitle")}</h2>;
}
