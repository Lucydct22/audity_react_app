import './trackListStyle.scss';
import { useState, useEffect, useRef } from 'react';
import { IoAddOutline, IoEllipsisVerticalSharp } from "react-icons/io5";
import { AiFillHeart, AiOutlineDownload, AiOutlineClockCircle } from "react-icons/ai";
import { responsiveBreak } from "../../../../utils/componentsConstants";
import useWindowSizeReport from "../../../../hooks/useWindowSizeReport";
import { MdPlayArrow } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const TrackItemComponent = ({ id, name, artist, thumbnail, likes, album, time }) => {

  const { t } = useTranslation();
  const windowWidth = useWindowSizeReport();

  const [popperOpen, setPopperOpen] = useState(false);
  let popperRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!popperRef.current.contains(e.target)) {
        setPopperOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <>
      {responsiveBreak < windowWidth ? (
        <tr key={id} className="track-list-item">
          <td className='track-list-item__td-track'><img src={thumbnail} alt={name} />{name}</td>
          <td className='track-list-item__td-icon'><IoAddOutline className='track-list-item__td-icon-item' /></td>
          <td className='track-list-item__td-icon'><AiOutlineDownload className='track-list-item__td-icon-item' /></td>
          <td>{artist}</td>
          <td>{album}</td>
          <td>{time}</td>
          <td className='track-list-item__td-icon'><AiFillHeart className='track-list-item__td-icon-heart' />{likes}</td>
        </tr>
      ) : (
        <div>
          <div key={id} className="track-list-item-mobile" ref={popperRef}>
            <div className="track-list-item-mobile-div">
              <img src={thumbnail} alt={name} />
              <div className="track-list-item-mobile-div__track">
                <span>{name}</span>
                <div className="track-list-item-mobile-div__track-album">
                  <span>{artist} - </span>
                  <span>{album}</span>
                </div>
              </div>
            </div>
            <div className="track-list-item-mobile__icons-mobile">
              <MdPlayArrow className='track-list-item-mobile__icons-mobile__td-icon-arrow' />
              <IoEllipsisVerticalSharp className='track-list-item-mobile__icons-mobile__td-icon-points' onClick={() => setPopperOpen(!popperOpen)} />
            </div>
          </div>
          <div className={`track-list-item-mobile ${popperOpen ? 'popperActive' : 'popperInactive'}`}>
            <div className='track-list-item-mobile__dropbox--wrapper'>
              <div className='track-list-item-mobile__dropbox--wrapper__icon'><IoAddOutline />{t('track_item_playlist')}</div>
              <div className='track-list-item-mobile__dropbox--wrapper__icon'><AiOutlineDownload />{t('track_item_download')}</div>
              <div className='track-list-item-mobile__dropbox--wrapper__icon'><AiFillHeart />{t('track_item_ranking')}{likes}</div>
              <div className='track-list-item-mobile__dropbox--wrapper__icon'><AiOutlineClockCircle />{t('track_item_duration')}{time}</div>
            </div>
          </div>

        </div>
      )
      }
    </>
  )
}

export default TrackItemComponent;