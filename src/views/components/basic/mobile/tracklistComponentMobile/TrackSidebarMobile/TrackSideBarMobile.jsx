import './trackSidebarMobile.scss';
import { IoAddOutline } from "react-icons/io5";
import { AiFillHeart, AiOutlineDownload, AiOutlineClockCircle } from "react-icons/ai";
import { useTranslation } from 'react-i18next';

const TrackSideBarMobile = ({ popOpen, id, likes, time, thumbnail, name, artist, album }) => {

  const { t } = useTranslation();

  return (
    <div key={id} className={`track-list-item-mobile ${popOpen ? 'popActive' : 'popInactive'}`}>
      <div className="track-list-item-mobile-pop-div">
        <img src={thumbnail} alt={name} />
        <div className="track-list-item-mobile-pop-div__track">
          <span>{name}</span>
          <div className="track-list-item-mobile-pop-div__track-album">
            <span>{artist} - </span>
            <span>{album}</span>
          </div>
        </div>
      </div>
      <div className='track-list-item-mobile-pop-div__dropbox-wrapper'>
        <div className='track-list-item-mobile-pop-div__dropbox-wrapper__line'><IoAddOutline />{t('track_item_playlist')}</div>
        <div className='track-list-item-mobile-pop-div__dropbox-wrapper__line'><AiFillHeart />{t('track_item_ranking')}{likes}</div>
        <div className='track-list-item-mobile-pop-div__dropbox-wrapper__line'><AiOutlineClockCircle />{t('track_item_duration')}{time}</div>
        <div className='track-list-item-mobile-pop-div__dropbox-wrapper__line'><AiOutlineDownload />{t('track_item_download')}</div>
      </div>
    </div>
  )
}

export default TrackSideBarMobile