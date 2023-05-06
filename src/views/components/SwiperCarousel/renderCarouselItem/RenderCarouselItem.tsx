import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import './renderCarouselItem.scss';
import GrayPerson from 'assets/img/webp/profile-placeholder-160x160.webp'

export default function RenderCarouselItem({ list, type }: any) {
  const { t } = useTranslation();
  const { _id, cover, name, imageUrl } = list;

  return (
    <Link to={`/${type}/${_id}`} className={type !== "artists" ? 'render-carousel-item' : 'render-carousel-item render-carousel-itemArtist'}>
      <div className='render-carousel-item__thumbnail'>
        <img 
          src={cover ? cover : imageUrl ? imageUrl : GrayPerson} 
          alt="IMG" 
          className={type !== "artists" ? 'render-carousel-item__thumbnail--img' : 'render-carousel-item__thumbnail--imgArtist'}/>
        <div className={type !== "artists" ? 'render-carousel-item__thumbnail--btn' : 'render-carousel-item__thumbnail--btnArtist'}>
          {type !== "artists" ?
            <button className='render-carousel-item__thumbnail--btn__play' type='button'>
              <FaPlay size='14px' color='#191919' />
            </button>
            : null}
          <button className='render-carousel-item__thumbnail--btn__like' type='button'>
            <AiFillHeart size='14px' color='#ca2a36' />
          </button>
        </div>
      </div>
      <p className='render-carousel-item__description'>{name}</p>
      <p className='render-carousel-item__details'>
        30 {t("musicpage_albumtracks")} - 4,165 fans
      </p>
    </Link>
  )
}
