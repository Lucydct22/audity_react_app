import { useState, useEffect, useRef, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './swiperCarousel.scss'
import { useTranslation } from 'react-i18next';
import { getPlaylistApi } from 'api/music/playlists';
import { getAlbumsApi } from 'api/music/albums';
import { getArtistApi } from 'api/music/artists';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { Navigation, FreeMode } from "swiper";
import { responsiveBreak } from "utils/componentsConstants";
import RenderCarouselItem from "./renderCarouselItem/RenderCarouselItem";

export default function SwiperCarousel({ data }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

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
        <DesktopSwiperCarousel data={data} />
      ) : (
        <MobileSwiperCarousel data={data} />
      )}
    </Suspense>
  )
}

const DesktopSwiperCarousel = ({ data }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [playlists, setPlaylists] = useState(undefined)
  const [albums, setAlbums] = useState(undefined)
  const [artists, setArtists] = useState(undefined);
  const [addNewPlaylist, setAddNewPlaylist] = useState({
    "add": {
      _id: "AddOnePlaylist",
      "add": "Function of new add slider carousel",
    },
  })
  const [addNewArtist, setAddNewArtist] = useState({
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
          {dataCarousel()?.map(list => {
            return (
              <SwiperSlide key={list._id}>
                <RenderCarouselItem list={list} type={data} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

const MobileSwiperCarousel = ({ data }) => {
  const [playlists, setPlaylists] = useState(undefined)
  const [albums, setAlbums] = useState(undefined)
  const [artists, setArtists] = useState(undefined);

  function dataCarousel() {
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
  }

  return (
    <div className="swiper-component">
      <div className="swiper-component__header">
        <TranslateTitle data={data} />
      </div>
      <div className='swiper-component__container'>
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
          {dataCarousel()?.map(list => {
            return (
              <SwiperSlide key={list._id}>
                <RenderCarouselItem list={list} type={data} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

const TranslateTitle = ({ data }) => {
  const { t } = useTranslation();

  return <h2 className='swiper-component__header--title'>{t(`library_highlights_${data}`)}</h2>;
}