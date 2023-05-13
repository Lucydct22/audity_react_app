import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './renderArtist.scss';

export default function RenderArtist({ artist }: any) {
  const [totalFans, setTotalFans] = useState("")
  const { _id, name, imageUrl } = artist;

  useEffect(() => {
    const fans = Math.floor(Math.random() * (980000 - 1340 + 1)) + 1340;
    setTotalFans(fans.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
  }, [])

  return (
    <Link to={`/artists/${_id}`} className='render-artist'>
      <div className='render-artist__thumbnail'>
        <img src={imageUrl} alt={name} />
      </div>
      <p className='render-artist__description'>{name}</p>
      <p className='render-artist__details'>{totalFans} fans</p>
    </Link>
  )
}
