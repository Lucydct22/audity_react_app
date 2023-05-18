import './trackSidebarMobile.scss';
import { useTranslation } from 'react-i18next';
import formatToSeconds from "utils/tracks/formatToSeconds";

const TrackSideBarMobile = ({ track, artist, popOpen }) => {
  const { t } = useTranslation();
  const { id, imageUrl, name, album, rating, duration } = track;

  return (
    <div key={id} className={`track-list-modal-mobile ${popOpen ? 'active-track-modal-mobile' : 'off-track-modal-mobile'}`}>
      <div className="track-list-modal-mobile__wrapper">
        <div className="track-list-modal-mobile__wrapper--song-info">
          <img src={imageUrl} alt={name} />
          <span>
            <p>{name}</p>
            <span>{artist}</span>
            <span>{album.name}</span>
          </span>
        </div>
        <div className='track-list-modal-mobile__wrapper--dropbox-wrapper'>
          <span>
            <div>{t('track_item_playlist')}</div>
            <div>{t('track_item_download')}</div>
          </span>
          <span>
            <div>{t('track_item_ranking')}: {rating > 1 ? `${rating} likes` : `${rating} like`}</div>
            <div>{t('track_item_duration')}: {formatToSeconds(duration)}</div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default TrackSideBarMobile