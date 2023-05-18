import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './renderAlbum.scss';

export default function RenderAlbum({ album }: any) {
  const [totalFans, setTotalFans] = useState("")
  const { t } = useTranslation();
  const { _id, name, imageUrl } = album;

  useEffect(() => {
    const fans = Math.floor(Math.random() * (980000 - 1340 + 1)) + 1340;
    setTotalFans(fans.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
  }, [])

  return (
    <Link to={`/albums/${_id}`} className='render-album'>
      <div className='render-album__thumbnail'>
        <img src={imageUrl} alt="IMG" />
      </div>
      <p className='render-album__description'>{name}</p>
      <p className='render-album__details'>
        30 {t("musicpage_albumtracks")} - {totalFans} fans
      </p>
    </Link>
  )
}
