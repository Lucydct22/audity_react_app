import { useState, useEffect, useRef, Suspense } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './swiperMusicPage.scss';
import { useTranslation } from 'react-i18next';
import { getGenresApi } from "api/music/genres";
import { getPlaylistApi } from 'api/music/playlists';
import { getAlbumsApi } from 'api/music/albums';
import { getArtistApi } from 'api/music/artists';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { responsiveBreak } from "utils/componentsConstants";
import RenderMusicItem from "./renderMusicItem/RenderMusicItem";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import SwiperDesktop from 'views/UI/swiperSettings/swiperDesktop/SwiperDesktop';
import SwiperMobile from 'views/UI/swiperSettings/swiperMobile/SwiperMobile';


export default function SwiperMusicPage({ data }) {
  const [screenWidth] = useWindowSizeReport()

  const [genres, setGenres] = useState(undefined)
  const [playlists, setPlaylists] = useState(undefined)
  const [albums, setAlbums] = useState(undefined)
  const [artists, setArtists] = useState(undefined);

  function dataCarousel() {
    if (data === "genres") {
      useEffect(() => {
        let isMounted = true;
        const getGenres = async () => {
          getGenresApi().then(async res => {
            isMounted && res && setGenres(res.genres);
          })
        }
        getGenres()
        return () => { isMounted = false }
      }, [])
      return genres;
    }
    
    if (data === "artists") {
      useEffect(() => {
        let isMounted = true;
        getArtistApi().then(res => {
          isMounted && res && setArtists(res.artists);
        })
        return () => { isMounted = false }
      }, [])
      return artists;
    }

    if (data === "playlists") {
      useEffect(() => {
        let isMounted = true;
        getPlaylistApi().then(res => {
          isMounted && res && setPlaylists(res.playlist);
        })
        return () => { isMounted = false }
      }, [])
      return playlists;
    }

    if (data === "albums") {
      useEffect(() => {
        let isMounted = true;
        getAlbumsApi().then(res => {
          isMounted && res && setAlbums(res.albums);
        })
        return () => { isMounted = false }
      }, [])
      return albums;
    }

  }

  return (
    <Suspense fallback={<></>}>
      {(screenWidth > responsiveBreak) ? (
        <DesktopSwiperCarousel data={data} dataCarousel={dataCarousel} />
      ) : (
        <MobileSwiperCarousel data={data} dataCarousel={dataCarousel} />
      )}
    </Suspense>
  )
}

const DesktopSwiperCarousel = ({ data, dataCarousel }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="swiper-music-component">
      <div className="swiper-music-component__header">
        <TranslateTitle data={data} />
        <span className="swiper-music-component__header--btn">
          <button ref={prevRef} className="swiper-carousel-button-prev">
            <HiOutlineChevronLeft />
          </button>
          <button ref={nextRef} className="swiper-carousel-button-next">
            <HiOutlineChevronRight />
          </button>
        </span>
      </div>
      <div className='swiper-music-component__container'>
        <SwiperDesktop prevRef={prevRef} nextRef={nextRef} >
          {dataCarousel()?.map(list => {
            return (
              <SwiperSlide key={list._id}>
                <RenderMusicItem list={list} type={data} />
              </SwiperSlide>
            )
          })}
        </SwiperDesktop>
      </div>
    </div>
  )
}


const MobileSwiperCarousel = ({ data, dataCarousel }) => {
  return (
    <div className="swiper-music-component">
      <div className="swiper-music-component__header">
        <TranslateTitle data={data} />
      </div>
      <div className='swiper-music-component__container'>
        <SwiperMobile>
          {dataCarousel()?.map(list => {
            return (
              <SwiperSlide key={list._id}>
                <RenderMusicItem list={list} type={data} />
              </SwiperSlide>
            )
          })}
        </SwiperMobile>
      </div>
    </div>
  )
}

const TranslateTitle = ({ data }) => {
  const { t } = useTranslation();

  return <h2 className='swiper-music-component__header--title'>{t(`library_highlights_${data}`)}</h2>;
}