import { useState } from 'react';
import { Link } from 'react-router-dom';
import './trackSidebarMobile.scss';
import { useTranslation } from 'react-i18next';
import formatToSeconds from "utils/tracks/formatToSeconds";
import PopupAddPlaylistBComponent from '../../popupAddPlaylistBComponent/PopupAddPlaylistBComponent';

const TrackSideBarMobile = ({ track, artist, popOpen }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { t } = useTranslation();
  const { id, imageUrl, name, album, rating, duration } = track;

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };
  
  return (
    <>
      <div key={id} className={`track-list-modal-mobile ${popOpen ? 'active-track-modal-mobile' : 'off-track-modal-mobile'}`}>
        <div className="track-list-modal-mobile__wrapper">
          <div className="track-list-modal-mobile__wrapper--song-info">
            <img src={imageUrl} alt={name ? name : track.uploadByUser.name} />
            <span>
              <p>{name ? name : track.uploadByUser.name}</p>
              <span>{artist ? artist : track.uploadByUser.artists}</span>
              <span>{album?.name}</span>
            </span>
          </div>
          <div className='track-list-modal-mobile__wrapper--dropbox-wrapper'>
            <span>
              {name && <div onClick={() => setShowPopUp(!showPopUp)}>{t('track_item_playlist')}</div>}
              <Link to={track.audioUrl}>{t('track_item_download')}</Link>
            </span>
            <span>
              <div>{t('track_item_ranking')}: {rating ? `${rating} likes` : `0 likes`}</div>
              {duration && <div>{t('track_item_duration')}: {formatToSeconds(duration)}</div>}
            </span>
          </div>
        </div>
      </div>
      {showPopUp && (
        <PopupAddPlaylistBComponent onClose={handleClosePopUp} />
      )}
    </>
  )
}

export default TrackSideBarMobile