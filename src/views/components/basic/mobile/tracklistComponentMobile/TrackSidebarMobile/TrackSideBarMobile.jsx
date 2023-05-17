import './trackSidebarMobile.scss';
import { IoAddOutline } from "react-icons/io5";
import { AiFillHeart, AiOutlineDownload, AiOutlineClockCircle } from "react-icons/ai";
import { useTranslation } from 'react-i18next';

const TrackSideBarMobile = ({ track, popOpen }) => {
  const { t } = useTranslation();
  const { id, imageUrl, name, artist, album, likes, time } = track;
  
  return (
    <div key={id} className={`track-list-modal-mobile ${popOpen ? 'active-track-modal-mobile' : 'off-track-modal-mobile'}`}>
      <div className="track-list-modal-mobile__wrapper">
        <img src={imageUrl} alt={name} />
        <div className="track-list-item-mobile-pop-div__track">
          <h1>Hello there</h1>
          {/* <span>{name}</span>
          <div className="track-list-item-mobile-pop-div__track-album">
            <span>{artist} - </span>
            <span>{album}</span>
          </div> */}
        </div>
        <div className='track-list-item-mobile-pop-div__dropbox-wrapper'>
          <div className='track-list-item-mobile-pop-div__dropbox-wrapper__line'><IoAddOutline />{t('track_item_playlist')}</div>
          <div className='track-list-item-mobile-pop-div__dropbox-wrapper__line'><AiFillHeart />{t('track_item_ranking')}{likes}</div>
          <div className='track-list-item-mobile-pop-div__dropbox-wrapper__line'><AiOutlineClockCircle />{t('track_item_duration')}{time}</div>
          <div className='track-list-item-mobile-pop-div__dropbox-wrapper__line'><AiOutlineDownload />{t('track_item_download')}</div>
        </div>
      </div>
    </div>
  )
}

export default TrackSideBarMobile