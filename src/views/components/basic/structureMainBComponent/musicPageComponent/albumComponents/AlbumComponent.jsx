import { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import './albumComponent.scss';
import AlbumImg1 from '../../../../../../assets/img/albums/1.jpg';

export default class MultipleItems extends Component {

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
      <div className='album-carousel'>
        <div className='album-carousel__head'>
          <TranslateTitle />
          <span className='album-carousel__head--btn'>
            <button className='album-carousel__head--btn__prev' onClick={this.previous}>
              <HiOutlineChevronLeft />
            </button>
            <button className='album-carousel__head--btn__next' onClick={this.next}>
              <HiOutlineChevronRight />
            </button>
          </span>
        </div>
        <div className='album-carousel__container'>
          <Slider ref={c => (this.slider = c)} {...settings}>
            <RenderAlbum />
            <RenderAlbum />
            <RenderAlbum />
            <RenderAlbum />
            <RenderAlbum />
            <RenderAlbum />
            <RenderAlbum />
            <RenderAlbum />
            <RenderAlbum />
            <RenderAlbum />
          </Slider>
        </div>
      </div>
    );
  }
}



const RenderAlbum = () => {
  const { t } = useTranslation();

  return (
    <section className='album-carousel__container--section'>
      <div className='album-carousel__container--section__thumbnail'>
        <img src={AlbumImg1} alt="IMG" />
        <div className='album-carousel__container--section__thumbnail--btn'>
          <button className='album-carousel__container--section__thumbnail--btn__play' type='button'><FaPlay size='14px' color='#191919' /></button>
          <button className='album-carousel__container--section__thumbnail--btn__like' type='button'><AiOutlineHeart size='14px' color='#191919' /></button>
        </div>
      </div>
      <Link className='album-carousel__container--section__description' to={'#'}>Baladas 00's</Link>
      <Link className='album-carousel__container--section__details' to={'#'}>30 {t("musicpage_albumtracks")} - 4,165 fans</Link>
    </section>
  )
}



const TranslateTitle = () => {
  const { t } = useTranslation();

  return <h2 className='album-carousel__head--title'>{t("musicpage_albumtitle")}</h2>;
}
