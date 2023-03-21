import React, { useState, Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import './albumComponent.scss';
import AlbumImg1 from '../../../../assets/img/albums/1.jpg';
import AlbumImg2 from '../../../../assets/img/albums/2.jpg';
import AlbumImg3 from '../../../../assets/img/albums/3.jpg';

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
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
    };
    return (
      <div className='Album'>
        <button className="button" onClick={this.previous}>
          Previous
        </button>
        <button className="button" onClick={this.next}>
          Next
        </button>
        <Slider ref={c => (this.slider = c)} {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
        </Slider>
      </div>
    );
  }
}

/*

const AlbumComponent = () => {
  const { t } = useTranslation();

  return (
    <div className='album-carousel'>
      <h2 className='album-carousel__title'>{t("musicpage_albumtitle")}</h2>
      <div className='album-carousel__container'>
        <RenderAlbum />
        <RenderAlbum />
        <RenderAlbum />
        <RenderAlbum />
      </div>
      <h2 className='album-carousel__title'>{t("musicpage_albumtitle2")}</h2>
      <div className='album-carousel__container'>
        <RenderAlbum />
        <RenderAlbum />
        <RenderAlbum />
        <RenderAlbum />
      </div>
    </div>
  )

}

const RenderAlbum = () => {
const { t } = useTranslation();
  return (
    <section>
      <div className='album-carousel__container--thumbnail'>
        <img src={AlbumImg1} alt="IMG"/>
        <div className='album-carousel__container--thumbnail__btn'>
          <button className='album-carousel__container--thumbnail__btn--play' type='button'><FaPlay size='14px' color='#191919'/></button>
          <button className='album-carousel__container--thumbnail__btn--like' type='button'><AiOutlineHeart size='14px' color='#191919'/></button>
        </div>
      </div>
      <Link className='album-carousel__container--description' to={'#'}>Baladas 00's</Link>
      <Link className='album-carousel__container--details' to={'#'}>30 {t("musicpage_albumtracks")} - 4,165 fans</Link>
    </section>
  )
}

export default AlbumComponent;

*/