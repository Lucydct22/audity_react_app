import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
import GreyDailyLogo from 'assets/img/png/grey-daily-icon.png'
import './renderPlaylist.scss';

export default function RenderPlaylist({ playlist }: any) {
  const { t } = useTranslation();
  const { _id, name, imageUrl, tracks } = playlist;

  return (
    <Link to={`/playlists/${_id}`} className='render-playlist'>
      <div className='render-playlist__thumbnail'>
        <div className='render-playlist__thumbnail--picture'>
          <img src={imageUrl} alt={name} />
        </div>
        <div className='render-playlist__thumbnail--btn'>
          <div className='render-playlist__thumbnail--btn__play'><FaPlay size='14px' color='#191919' /></div>
        </div>
        <div className='render-playlist__thumbnail--logo-daily'>
          <img src={GreyDailyLogo} alt="Grey Daily Logo Audity" />
          <p className='render-playlist__thumbnail--logo-daily__description'>daily</p>
        </div>
      </div>
      <p className='render-playlist__description'>{name}</p>
      <p className='render-playlist__details'>
        {tracks.length} {t("musicpage_albumtracks")} - 103.456 fans
      </p>
    </Link>
  )
}
