import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import './renderArtist.scss';

export default function RenderArtist({ artist }: any) {
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
    <Link to={!isLongPressed ? `/artists/${artist.id}` : '#'} {...bind()} className='render-artist'>
      <div className='render-artist__thumbnail'>
        <img src={artist.photoUrl} alt={artist.name} />
      </div>
      <p className='render-artist__description'>{artist?.name}</p>
      <p className='render-artist__details'>80,165,532 fans</p>
    </Link>
  )
}
