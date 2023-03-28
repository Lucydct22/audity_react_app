import { useEffect, useState } from 'react';
import { getArtistApi } from '@/api/music/artists';
import RenderArtist from './renderArtist';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './artistsSlider.scss';

export default function ArtistsSlider() {
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
    <div className='carousel-component'>
      <div className='carousel-component__head'>
        <TranslateTitle />
        <span className='carousel-component__head--btn'>
          <button className='carousel-component__head--btn__prev' onClick={previous}>
            <HiOutlineChevronLeft />
          </button>
          <button className='carousel-component__head--btn__next' onClick={next}>
            <HiOutlineChevronRight />
          </button>
        </span>
      </div>
      <div className='carousel-component__container'>
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

//const RenderArtist = ({ artist }) => {
const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='carousel-component__head--title'>{t("musicpage_artirstitle")}</h2>;
}

// const RenderArtist = ({ artist }) => {
//   return (
//     <section className='artist-carousel__container--section'>
//       <div className='artist-carousel__container--section__thumbnail'>
//         <img src={artist.photoUrl} alt={artist.name} />
//       </div>
//       <Link className='artist-carousel__container--section__description' to={'#'}>{artist.name}</Link>
//       <Link className='artist-carousel__container--section__details' to={'#'}>80,165,532 fans</Link>
//     </section>
//   )
// }

/* export const RenderArtist = () => {

  return (
    <section className='carousel-component__container--section'>
      <div className='carousel-component__container--section__thumbnail'>
        <img src={AlbumImg4} alt="IMG" />
      </div>
      <Link className='carousel-component__container--section__description' to={'#'}>La Rosalia</Link>
      <Link className='carousel-component__container--section__details' to={'#'}>80,165,532 fans</Link>
    </section>
  )
} */
