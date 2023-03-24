import { useEffect, useState } from 'react';
import { getArtistApi } from '../../../../../../api/music/artists';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import './artistComponent.scss';

export default function ArtistSlider() {
  let slider = new Slider();
  const [artists, setArtists] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    getArtistApi().then(res => {
      isMounted && res && setArtists(res);
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
          slidesToScroll: 1,
          initialSlide: 2
        }
      }
    ]
  };

  return (
    <div className='artist-carousel'>
      <div className='artist-carousel__head'>
        <TranslateTitle />
        <span className='artist-carousel__head--btn'>
          <button className='artist-carousel__head--btn__prev' onClick={previous}>
            <HiOutlineChevronLeft />
          </button>
          <button className='artist-carousel__head--btn__next' onClick={next}>
            <HiOutlineChevronRight />
          </button>
        </span>
      </div>
      <div className='artist-carousel__container'>
        {artists && (
          <Slider ref={c => (slider = c)} {...settings}>
            {artists.map(artist => {
              return <RenderArtist key={artist.id} artist={artist} />
            })}
          </Slider>
        )}
      </div>
    </div>
  );
}

const RenderArtist = ({ artist }) => {
  return (
    <section className='artist-carousel__container--section'>
      <div className='artist-carousel__container--section__thumbnail'>
        <img src={artist.photoUrl} alt={artist.name} />
      </div>
      <Link className='artist-carousel__container--section__description' to={'#'}>{artist.name}</Link>
      <Link className='artist-carousel__container--section__details' to={'#'}>80,165,532 fans</Link>
    </section>
  )
}

const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='artist-carousel__head--title'>{t("musicpage_artirstitle")}</h2>;
}
