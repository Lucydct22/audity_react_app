import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
import GreyDailyLogo from 'assets/img/png/grey-daily-icon.png'
import './renderPlaylist.scss';

export default function RenderPlaylist({ playlist }: any) {
  const { t } = useTranslation();
  const { _id, name, cover } = playlist;
  const fans = Math.floor(Math.random() * (980000 - 1340 + 1)) + 1340;
  let totalFans = fans.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

  return (
    <Link to={`/playlists/${_id}`} className='render-playlist'>
      <div className='render-playlist__thumbnail'>
        <div className='render-playlist__thumbnail--picture'>
          <img src={cover} alt={name} />
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
        30 {t("musicpage_albumtracks")} - {totalFans} fans
      </p>
    </Link>
  )
}
