import { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './genresComponent.scss';
import GradientImg1 from '../../../../../../assets/img/gradients/1.jpg'


export default class MultipleItems extends Component {
  state = {
    display: true,
    width: 1800,
  };

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {
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
            slidesToScroll: 1,
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
            <button className='genres-carousel__head--btn__prev' onClick={this.previous}>
              <IoIosArrowBack />
            </button>
            <button className='genres-carousel__head--btn__next' onClick={this.next}>
              <IoIosArrowForward />
            </button>
          </span>
        </div>
        <div className='genres-carousel__container'>
          <Slider ref={c => (this.slider = c)} {...settings}>
            <RenderGenres />
            <RenderGenres />
            <RenderGenres />
            <RenderGenres />
            <RenderGenres />
            <RenderGenres />
            <RenderGenres />
            <RenderGenres />
            <RenderGenres />
            <RenderGenres />
          </Slider>
        </div>
      </div>
    );
  }
}



const RenderGenres = () => {
  const { t } = useTranslation();

  return (
    <section className='genres-carousel__container--section'>
      <div className='genres-carousel__container--section__thumbnail'>
        <img src={GradientImg1} alt="IMG" />
        <Link className='genres-carousel__container--section__thumbnail--description' to={'#'}>Soul</Link>
      </div>
    </section>
  )
}



const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='genres-carousel__head--title'>{t("musicpage_genres")}</h2>;
}
