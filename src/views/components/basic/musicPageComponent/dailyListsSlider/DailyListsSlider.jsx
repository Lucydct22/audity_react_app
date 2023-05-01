import { useEffect, useState } from 'react';
import { getPlaylistApi } from 'api/music/playlists';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import './dailyListsSlider.scss';
import AlbumImg2 from 'assets/img/albums/2.jpg';
import GreyDailyLogo from 'assets/img/png/grey-daily-icon.png'

export default function DailyListsSlider() {
  let slider = new Slider();
  const [playlists, setPlaylists] = useState(undefined)

  useEffect(() => {
    let isMounted = true;
    getPlaylistApi().then(res => {
      isMounted && res && setPlaylists(res);
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
    <div className='daily-carousel'>
      <div className='daily-carousel__head'>
        <TranslateTitle />
        <span className='daily-carousel__head--btn'>
          <button className='daily-carousel__head--btn__prev' onClick={previous}>
            <HiOutlineChevronLeft />
          </button>
          <button className='daily-carousel__head--btn__next' onClick={next}>
            <HiOutlineChevronRight />
          </button>
        </span>
      </div>
      <div className='daily-carousel__container'>
        {playlists && (
          <Slider ref={c => (slider = c)} {...settings}>
            {playlists.map(playlist => {
              return <RenderPlaylist key={playlist.id} playlist={playlist} />
            })}
          </Slider>
        )}
      </div>
    </div>
  );
}

const RenderPlaylist = ({ playlist }) => {
  return (
    <section className='daily-carousel__container--section'>
      <div className='daily-carousel__container--section__thumbnail'>
        <div className='daily-carousel__container--section__thumbnail--picture'>
          <img src={AlbumImg2} alt="IMG" />
          <div className='daily-carousel__container--section__thumbnail--picture__fade'></div>
        </div>
        <div className='daily-carousel__container--section__thumbnail--btn'>
          <button className='daily-carousel__container--section__thumbnail--btn__play' type='button'><FaPlay size='14px' color='#191919' /></button>
        </div>
        <div className='daily-carousel__container--section__thumbnail--logo-daily'>
          <img src={GreyDailyLogo} alt="Grey Daily Logo Audity" />
          <p className='daily-carousel__container--section__thumbnail--logo-daily__description'>daily</p>
        </div>
      </div>
      <Link className='daily-carousel__container--section__description' to={'#'}>{playlist.name}</Link>
    </section>
  )
}

const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='daily-carousel__head--title'>{t("musicpage_dailytitle")}</h2>;
}
