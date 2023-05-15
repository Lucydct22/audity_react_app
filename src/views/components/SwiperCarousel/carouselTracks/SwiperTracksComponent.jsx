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
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Suspense fallback={<></>}>
      {screenWidth > 1200 ? (
        <SwiperMaxTracks tracks={tracks} />
      ) : screenWidth > 1024 ? (
        <Swiper1024Tracks tracks={tracks} />
      ) : screenWidth > 815 ? (
        <Swiper815Tracks tracks={tracks} />
      ) : screenWidth > 590 ? (
        <Swiper560Tracks tracks={tracks} />
      ) : (
        <SwiperMinTracks tracks={tracks} />
      )}
    </Suspense>
  );
}

const SwiperMaxTracks = ({ tracks }) => {
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
      <div className="swiper-tracks-component__container" style={{ height: '280px' }}>
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
          modules={[Navigation, Grid]}
          className="swiper-track-carousel"
        >
          {tracks?.slice(0, 8).map((track) => {
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

const Swiper1024Tracks = ({ tracks }) => {
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
      <div className="swiper-tracks-component__container" style={{ height: '280px' }}>
        <Swiper
          slidesPerView={2}
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
          modules={[Navigation, Grid]}
          className="swiper-track-carousel"
        >
          {tracks?.slice(0, 8).map((track) => {
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

const Swiper815Tracks = ({ tracks }) => {
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
      <div className="swiper-tracks-component__container" style={{ height: '280px' }}>
        <Swiper
          slidesPerView={1}
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
          modules={[Navigation, Grid]}
          className="swiper-track-carousel"
        >
          {tracks?.slice(0, 8).map((track) => {
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

const Swiper560Tracks = ({ tracks }) => {
  return (
    <div className="swiper-tracks-component">
      <div className="swiper-tracks-component__header">
        <TranslateTitle />
      </div>
      <div className="swiper-tracks-component__container" style={{ height: '280px' }}>
        <Swiper
          slidesPerView={2.3}
          spaceBetween={20}
          grid={{
            rows: 3,
          }}
          freeMode={true}
          modules={[FreeMode, Grid]}
          className="swiper-track-carousel"
        >
          {tracks?.slice(0, 8).map((track) => {
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

const SwiperMinTracks = ({ tracks }) => {
  return (
    <div className="swiper-tracks-component">
      <div className="swiper-tracks-component__header">
        <TranslateTitle />
      </div>
      <div className="swiper-tracks-component__container" style={{ height: '280px' }}>
        <Swiper
          slidesPerView={1.2}
          spaceBetween={20}
          grid={{
            rows: 3,
          }}
          freeMode={true}
          modules={[FreeMode, Grid]}
          className="swiper-track-carousel"
        >
          {tracks?.slice(0, 8).map((track) => {
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
