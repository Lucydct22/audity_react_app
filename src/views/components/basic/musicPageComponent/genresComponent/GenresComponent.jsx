import { useEffect, useState } from 'react';
import { getGenresApi } from '../../../../../api/music/genres';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import './genresComponent.scss';
import IMG from './GenresImages';


export default function GenresComponent() {
  let slider = new Slider();
  const [genres, setGenres] = useState(undefined)

  useEffect(() => {
    let isMounted = true;
    getGenresApi().then(res => {
      isMounted && res && setGenres(res);
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
    <div className='genres-carousel'>
      <div className='genres-carousel__head'>
        <TranslateTitle />
        <span className='genres-carousel__head--btn'>
          <button className='genres-carousel__head--btn__prev' onClick={previous}>
            <HiOutlineChevronLeft />
          </button>
          <button className='genres-carousel__head--btn__next' onClick={next}>
            <HiOutlineChevronRight />
          </button>
        </span>
      </div>
      <div className='genres-carousel__container'>
        {genres && (
          <Slider ref={c => (slider = c)} {...settings}>
            {genres.map(genre => {
              return <RenderGenres key={genre.id} genre={genre} />
            })}
          </Slider>
        )}
      </div>
    </div>
  );
}

const RenderGenres = ({ genre }) => {
  let img = new IMG()

  return (
    <section className='genres-carousel__container--section'>
      <div className='genres-carousel__container--section__thumbnail'>
        <img src={img[genre.id]} alt={genre.name} />
        <p className='genres-carousel__container--section__thumbnail--description' to={'#'}>{genre?.name}</p>
      </div>
    </section>
  )
}

const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='genres-carousel__head--title'>{t("musicpage_genres")}</h2>;
}