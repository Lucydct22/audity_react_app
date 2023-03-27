import { Link } from 'react-router-dom';
import './renderArtist.scss';
import AlbumImg4 from '../../../../../../../assets/img/albums/4.jpg';

export const RenderArtist = ({ artist }) => {

  return (
    <section className='render-artist' >
      <div className='render-artist__thumbnail'>
        <img src={artist.photoUrl} alt={artist.name} />
      </div>
      <Link className='render-artist__description' to={'#'}>{artist?.name}</Link>
      <Link className='render-artist__details' to={'#'}>80,165,532 fans</Link>
    </section>
  )
}
