import { useState, useEffect, useRef, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/grid";
import "./swiperTracksComponent.scss";
import { useTranslation } from "react-i18next";
import { getTracksApi } from "api/music/tracks";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { responsiveBreak } from "utils/componentsConstants";
import RenderTrack from "views/components/basic/renders/renderTrack/RenderTrack";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { FreeMode } from "swiper";

export default function SwiperTracksComponent() {
  const [screenWidth] = useWindowSizeReport();
  const [tracks, setTracks] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    getTracksApi().then((res) => {
      isMounted && res && setTracks(res.tracks);
      console.log(res)
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Suspense fallback={<></>}>
      {screenWidth > responsiveBreak ? (
        <SwiperDesktopTracks tracks={tracks} />
      ) : (
        <SwiperMobileTracks tracks={tracks} />
      )}
    </Suspense>
  );
}

const SwiperDesktopTracks = ({ tracks }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="swiper-tracks-component">
      <div className="swiper-tracks-component__header">
        <TranslateTitle />
        <span className="swiper-tracks-component__header--btn">
          <button ref={prevRef} className="swiper-carousel-button-prev">
            <HiOutlineChevronLeft />
          </button>
          <button ref={nextRef} className="swiper-carousel-button-next">
            <HiOutlineChevronRight />
          </button>
        </span>
      </div>
      <div className="swiper-tracks-component__container">
        <Swiper
          slidesPerView={3}
          grid={{
            rows: 3,
          }}
          spaceBetween={30}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            815: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
            1300: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation, Grid]}
          className="swiper-track-carousel"
        >
          {tracks?.map((track) => {
            return (
              <SwiperSlide key={track._id}>
                <RenderTrack track={track} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

const SwiperMobileTracks = ({ tracks }) => {
  return (
    <div className="swiper-tracks-component">
      <div className="swiper-tracks-component__header">
        <TranslateTitle />
      </div>
      <div className="swiper-tracks-component__container">
        <Swiper
          slidesPerView={1.3}
          spaceBetween={15}
          freeMode={true}
          breakpoints={{
            150: {
              slidesPerView: 1.3,
            },
            515: {
              slidesPerView: 1.3,
            },
          }}
          modules={[FreeMode]}
          className="swiper-track-carousel"
        >
          {tracks?.map((track) => {
            return (
              <SwiperSlide key={track._id}>
                <RenderTrack track={track} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

const TranslateTitle = () => {
  const { t } = useTranslation();

  return (
    <h2 className="swiper-tracks-component__header--title">
      {t("musicpage_besthits")}
    </h2>
  );
};
