import { getPlaylistApi } from 'api/music/playlists';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import RenderPlaylist from './renderPlaylist/RenderPlaylist';
import { useState, useEffect, useRef, Suspense } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './dailyListsSlider.scss';
import SwiperDesktop from 'views/UI/swiperSettings/swiperDesktop/SwiperDesktop';
import SwiperMobile from 'views/UI/swiperSettings/swiperMobile/SwiperMobile';
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";

export default function DailyListsSlider() {
  const [screenWidth] = useWindowSizeReport()
  const [playlists, setPlaylists] = useState(undefined)

  useEffect(() => {
    let isMounted = true;
    getPlaylistApi().then(res => {
      isMounted && res && setPlaylists(res.playlist);
    })
    return () => { isMounted = false }
  }, [])

  return (
    <Suspense fallback={<></>}>
      {(screenWidth > responsiveBreak) ? (
        <DesktopPlaylistsSlider playlists={playlists} />
      ) : (
        <MobilePlaylistsSlider playlists={playlists} />
      )}
    </Suspense>
  )
}

const DesktopPlaylistsSlider = ({ playlists }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
        <SwiperDesktop>
          {playlists?.map(playlist => {
            return (
              <SwiperSlide key={playlist._id}>
                <RenderPlaylist playlist={playlist} />
              </SwiperSlide>
            )
          })}
        </SwiperDesktop>
      </div>
    </div>
  )
}
const MobilePlaylistsSlider = ({ playlists }) => {
  return (
    <div className="daily-carousel">
      <div className="daily-carousel__head">
        <TranslateTitle />
      </div>
      <div className='daily-carousel__container'>
        <SwiperMobile>
          {playlists?.map(playlist => {
            return (
              <SwiperSlide key={playlist._id}>
                <RenderPlaylist playlist={playlist} />
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

  return <h2 className='daily-carousel__head--title'>{t("musicpage_dailytitle")}</h2>;
}
