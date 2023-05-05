import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import './renderGenres.scss'

export default function RenderGenres({ genre }: any) {
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
    <Link to={!isLongPressed ? `/genres/${genre._id}` : '#'} {...bind()} className='render-genre'>
      <div className='render-genre__thumbnail'>
        <img src={genre.thumbnail} alt={genre.name} />
        <p className='render-genre__thumbnail--description'>{genre?.name}</p>
      </div>
    </Link>
  )
}
