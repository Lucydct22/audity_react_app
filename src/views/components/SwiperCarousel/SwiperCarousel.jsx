import { useState, useEffect, useRef, Suspense } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './swiperCarousel.scss'
import { useTranslation } from 'react-i18next';
import { getPlaylistApi } from 'api/music/playlists';
import { getAlbumsApi } from 'api/music/albums';
import { getArtistApi } from 'api/music/artists';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { responsiveBreak } from "utils/componentsConstants";
import RenderCarouselItem from "./renderCarouselItem/RenderCarouselItem";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import SwiperDesktop from 'views/UI/swiperSettings/swiperDesktop/SwiperDesktop';
import SwiperMobile from 'views/UI/swiperSettings/swiperMobile/SwiperMobile';


export default function SwiperCarousel({ data }) {
  const [screenWidth] = useWindowSizeReport()

  const [playlists, setPlaylists] = useState(undefined)
  const [albums, setAlbums] = useState(undefined)
  const [artists, setArtists] = useState(undefined);
  const [addNewPlaylist] = useState({
    "add": {
      _id: "AddOnePlaylist",
      "add": "Function of new add slider carousel",
    },
  })
  const [addNewArtist] = useState({
    "add": {
      _id: "AddOneArtist",
      "add": "Function of new add slider carousel",
    },
  })

  function dataCarousel() {

    if (data === "playlists") {
      useEffect(() => {
        let isMounted = true;
        getPlaylistApi().then(res => {
          isMounted && res && setPlaylists(res.playlist);
        })
        return () => { isMounted = false }
      }, [])

      const result = Object.values(playlists ? playlists : "");
      const addResult = Object.values(addNewPlaylist ? addNewPlaylist : "");

      const finalPlaylist = [...addResult, ...result];

      return finalPlaylist;
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

    if (data === "artists") {
      useEffect(() => {
        let isMounted = true;
        getArtistApi().then(res => {
          isMounted && res && setArtists(res.artists);
        })
        return () => { isMounted = false }
      }, [])

      const result = Object.values(artists ? artists : "");
      const addResult = Object.values(addNewArtist ? addNewArtist : "");

      const finalArtist = [...addResult, ...result];

      return finalArtist;
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
    <div className="swiper-component">
      <div className="swiper-component__header">
        <TranslateTitle data={data} />
        <span className="swiper-component__header--btn">
          <button ref={prevRef} className="swiper-carousel-button-prev">
            <HiOutlineChevronLeft />
          </button>
          <button ref={nextRef} className="swiper-carousel-button-next">
            <HiOutlineChevronRight />
          </button>
        </span>
      </div>
      <div className='swiper-component__container'>
        <SwiperDesktop>
          {dataCarousel()?.map(list => {
            return (
              <SwiperSlide key={list._id}>
                <RenderCarouselItem list={list} type={data} />
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
    <div className="swiper-component">
      <div className="swiper-component__header">
        <TranslateTitle data={data} />
      </div>
      <div className='swiper-component__container'>
        <SwiperMobile>
          {dataCarousel()?.map(list => {
            return (
              <SwiperSlide key={list._id}>
                <RenderCarouselItem list={list} type={data} />
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

  return <h2 className='swiper-component__header--title'>{t(`library_highlights_${data}`)}</h2>;
}