import { Link } from 'react-router-dom';
import './renderArtist.scss';

export default function RenderArtist({ artist }: any) {
  const { _id, name, imageUrl } = artist;
  const fans = Math.floor(Math.random() * (95000000 - 120000 + 1)) + 12000;
  let totalFans = fans.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  

  return (
    <Link to={`/artists/${artist._id}`} className='render-artist'>
      <div className='render-artist__thumbnail'>
        <img src={imageUrl} alt={name} />
      </div>
      <p className='render-artist__description'>{name}</p>
      <p className='render-artist__details'>{totalFans} fans</p>
    </Link>
  )
}
