import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
import AlbumImg2 from 'assets/img/albums/2.jpg';
import GreyDailyLogo from 'assets/img/png/grey-daily-icon.png'
import './renderPlaylist.scss';

export default function RenderPlaylist({ playlist }: any) {
  const { t } = useTranslation();
  const { _id, name, cover } = playlist;
  console.log(playlist);
  

  const [isLongPressed, setIsLongPressed] = useState(false);

  const callback = React.useCallback(() => {
    setIsLongPressed(true)
  }, []);
  const bind = useLongPress(callback, {
    onCancel: e => setIsLongPressed(false),
    threshold: 260,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.BOTH
  });

  return (
    <Link to={!isLongPressed ? `/playlists/${_id}` : '#'} {...bind()} className='render-playlist'>
      <div className='render-playlist__thumbnail'>
        <div className='render-playlist__thumbnail--picture'>
          <img src={cover} alt="IMG" />
          <div className='render-playlist__thumbnail--picture__fade'></div>
        </div>
        <div className='render-playlist__thumbnail--btn'>
          <button className='render-playlist__thumbnail--btn__play' type='button'><FaPlay size='14px' color='#191919' /></button>
        </div>
        <div className='render-playlist__thumbnail--logo-daily'>
          <img src={GreyDailyLogo} alt="Grey Daily Logo Audity" />
          <p className='render-playlist__thumbnail--logo-daily__description'>daily</p>
        </div>
      </div>
      {/* <Link className='render-playlist__description' to={'#'}>{name}</Link> */}
    </Link>
  )
}
