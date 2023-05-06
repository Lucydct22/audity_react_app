import { useEffect, useState } from 'react';
import { getPlaylistApi } from 'api/music/playlists';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RenderPlaylist from '../../musicPageComponent/dailyListsSlider/renderPlaylist/RenderPlaylist'
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import './libraryBComponentHighlights.scss';

export default function LibraryBComponentHighlights() {
  let slider = new Slider();
  const [playlists, setPlaylists] = useState(undefined)

  useEffect(() => {
    let isMounted = true;
    getPlaylistApi().then(res => {
      isMounted && res && setPlaylists(res.playlist);
    })
    return () => { isMounted = false }
  }, [])

  function next() {
    slider.slickNext();
  }

  function previous() {
    slider.slickPrev();
  }

  const settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1475,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2
        }
      },
      {
        breakpoint: 1175,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      }
    ]
  };
  return (
    <div className='library-highlights-carousel'>
      <div className='library-highlights-carousel__content'>
        <div className='library-highlights-carousel__content--head'>
          <TranslateTitle />
          <span className='library-highlights-carousel__content--head__btn'>
            <button className='library-highlights-carousel__content--head__btn--prev' onClick={previous}>
              <HiOutlineChevronLeft />
            </button>
            <button className='library-highlights-carousel__content--head__btn--next' onClick={next}>
              <HiOutlineChevronRight />
            </button>
          </span>
        </div>
        <div className='library-highlights-carousel__content--container'>
          {playlists?.length > 0 && (
            <Slider ref={c => (slider = c)} {...settings}>
              {playlists?.map(playlist => {
                return <div key={playlist._id}>{playlist.name}</div>
              })}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
}

const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='library-highlights-carousel__content--head__title'>{t("library_header_body_highlights_playlist_title")}</h2>;
}