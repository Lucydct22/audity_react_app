import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import './artistComponent.scss';
import AlbumImg1 from '../../../../assets/img/albums/1.jpg';
import AlbumImg2 from '../../../../assets/img/albums/2.jpg';
import AlbumImg3 from '../../../../assets/img/albums/3.jpg';
import AlbumImg4 from '../../../../assets/img/albums/4.jpg';

const ArtistComponent = () => {
  const { t } = useTranslation();

  return (
    <div className='artist-carousel'>
      <h2 className='artist-carousel__title'>{t("musicpage_artirstitle")}</h2>
      <div className='artist-carousel__container'>
        <RenderArtist />
        <RenderArtist />
        <RenderArtist />
        <RenderArtist />
      </div>
    </div>
  )

}

const RenderArtist = () => {

  return (
    <section>
      <div className='artist-carousel__container--thumbnail'>
        <img src={AlbumImg4} alt="IMG"/>
      </div>
      <Link className='artist-carousel__container--description' to={'#'}>La Rosalia Tra Tra</Link>
    </section>
  )
}

export default ArtistComponent;