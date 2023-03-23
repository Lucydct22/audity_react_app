import { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import './artistComponent.scss';
import AlbumImg4 from '../../../../../../assets/img/albums/4.jpg';

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
            <button className='artist-carousel__head--btn__prev' onClick={this.previous}>
              <HiOutlineChevronLeft />
            </button>
            <button className='artist-carousel__head--btn__next' onClick={this.next}>
              <HiOutlineChevronRight />
            </button>
          </span>
        </div>
        <div className='artist-carousel__container'>
          <Slider ref={c => (this.slider = c)} {...settings}>
            <RenderArtist />
            <RenderArtist />
            <RenderArtist />
            <RenderArtist />
            <RenderArtist />
            <RenderArtist />
            <RenderArtist />
            <RenderArtist />
            <RenderArtist />
            <RenderArtist />
          </Slider>
        </div>
      </div>
    );
  }
}



const RenderArtist = () => {

  return (
    <section className='artist-carousel__container--section'>
      <div className='artist-carousel__container--section__thumbnail'>
        <img src={AlbumImg4} alt="IMG" />
      </div>
      <Link className='artist-carousel__container--section__description' to={'#'}>La Rosalia</Link>
      <Link className='artist-carousel__container--section__details' to={'#'}>80,165,532 fans</Link>
    </section>
  )
}



const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='artist-carousel__head--title'>{t("musicpage_artirstitle")}</h2>;
}
