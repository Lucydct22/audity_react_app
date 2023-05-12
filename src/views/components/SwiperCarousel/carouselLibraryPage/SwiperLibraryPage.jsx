import { useState, useRef, Suspense, useContext } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import './swiperLibraryPage.scss'
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { responsiveBreak } from "utils/componentsConstants";
import RenderLibraryItem from "./renderLibraryItem/RenderLibraryItem";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import SwiperDesktop from 'views/UI/swiperSettings/swiperDesktop/SwiperDesktop';
import SwiperMobile from 'views/UI/swiperSettings/swiperMobile/SwiperMobile';
import MyLibraryContext from "context/myLibrary/MyLibraryContext";

export default function SwiperLibraryPage({ data }) {
  const { artists, albums, playlists } = useContext(MyLibraryContext)
  const [screenWidth] = useWindowSizeReport()
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
      const result = Object.values(playlists ? [...playlists.userContent, ...playlists.content] : "");
      const addPlaylist = Object.values(addNewPlaylist ? addNewPlaylist : "");

      const finalPlaylist = [...addPlaylist, ...result];

      return finalPlaylist;
    }

    if (data === "albums") {
      return albums.content;
    }

    if (data === "artists") {
      const result = Object.values(artists ? artists.content : "");
      const addArtist = Object.values(addNewArtist ? addNewArtist : "");

      const finalArtist = [...addArtist, ...result];

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
    <div className="swiper-library-component">
      <div className="swiper-library-component__header">
        <TranslateTitle data={data} />
        <span className="swiper-library-component__header--btn">
          <button ref={prevRef} className="swiper-carousel-button-prev">
            <HiOutlineChevronLeft />
          </button>
          <button ref={nextRef} className="swiper-carousel-button-next">
            <HiOutlineChevronRight />
          </button>
        </span>
      </div>
      <div className='swiper-library-component__container'>
        <SwiperDesktop prevRef={prevRef} nextRef={nextRef} >
          {dataCarousel()?.map(list => {
            return (
              <SwiperSlide key={list._id}>
                <RenderLibraryItem list={list} type={data} />
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
    <div className="swiper-library-component">
      <div className="swiper-library-component__header">
        <TranslateTitle data={data} />
      </div>
      <div className='swiper-library-component__container'>
        <SwiperMobile>
          {dataCarousel()?.map(list => {
            return (
              <SwiperSlide key={list._id}>
                <RenderLibraryItem list={list} type={data} />
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

  return <h2 className='swiper-library-component__header--title'>{t(`library_highlights_${data}`)}</h2>;
}