import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import RenderGenres from './genresRender/RenderGenres';
import { getGenresApi } from 'api/music/genres';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import './genresSlider.scss';


export default function GenresSlider() {
  let slider = new Slider();
  const [genres, setGenres] = useState(undefined)
  const { user, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    let isMounted = true;
    const getGenres = async () => {
      const token = await getAccessTokenSilently()
      token && getGenresApi(token).then(async res => {
        isMounted && res && setGenres(res.genres);
      })
    }
    getGenres()
    return () => { isMounted = false }
  }, [user])

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
        {genres?.length > 0 && (
          <Slider ref={c => (slider = c)} {...settings}>
            {genres?.map(genre => {
              return <RenderGenres key={genre._id} genre={genre} />
            })}
          </Slider>
        )}
      </div>
    </div>
  );
}

const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='genres-carousel__head--title'>{t("musicpage_genres")}</h2>;
}