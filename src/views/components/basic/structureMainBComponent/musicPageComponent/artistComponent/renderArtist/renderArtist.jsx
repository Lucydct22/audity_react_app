import { Link } from 'react-router-dom';
import './renderArtist.scss';

export const RenderArtist = ({ artist }) => {

  return (
    <Link to={`${artist.id}`}>
      <section className='render-artist' >
        <div className='render-artist__thumbnail'>
          <img src={artist.photoUrl} alt={artist.name} />
        </div>
        <p className='render-artist__description'>{artist?.name}</p>
        <p className='render-artist__details'>80,165,532 fans</p>
      </section>
    </Link>
  )
}
