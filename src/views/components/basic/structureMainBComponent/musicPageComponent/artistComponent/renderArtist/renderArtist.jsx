import { Link } from 'react-router-dom';
import './renderArtist.scss';

export const RenderArtist = ({ artist }) => {

  return (
    <section className='render-artist' >
      <div className='render-artist__thumbnail'>
        <img src={artist.photoUrl} alt={artist.name} />
      </div>
      <Link className='render-artist__description' to={`${artist.id}`}>{artist?.name}</Link>
      <p className='render-artist__details'>80,165,532 fans</p>
    </section>
  )
}
