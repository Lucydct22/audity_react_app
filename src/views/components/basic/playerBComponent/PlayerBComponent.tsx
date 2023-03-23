import { useContext, useEffect, useState } from 'react';
import { TrackContext } from '../../../../context/TrackContext';
import { formatToSecondsTrack } from '../../../../utils/formatToSecondsTrack';
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoAddOutline, IoShuffleOutline, IoRepeatOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import './PlayerBottom.scss'

const PlayerBComponent = () => {
  const [songLike, setSongLike] = useState(false);
  const [songVolume, setSongVolume] = useState(false);
  const {
    trackData,
    currentTrack,
    initCurrentTrack,
    playCurrentTrack,
    pauseCurrentTrack,
    updateCurrentTime
  } = useContext(TrackContext);

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentTime()
    }, 500);
    return () => clearInterval(interval);
  }, [trackData]);

  useEffect(() => {
    initCurrentTrack()
  }, [])

  return (
    <div className='page-player'>
      <div className='player-bottom'>

        <div className='player-bottom-controls'>
          <button className='page-player-bottom__btn'>
            <MdSkipPrevious />
          </button>
          <button
            onClick={trackData.isPlaying ? pauseCurrentTrack : playCurrentTrack}
            className='page-player-bottom__btn'
          >
            {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>
          <button className='page-player-bottom__btn'>
            <MdSkipNext />
          </button>
        </div>

        <div className='player-bottom-track'>
          {formatToSecondsTrack(trackData.currentTime)}
          <div className='player-bottom-track__container'>
            <div className='player-bottom-track__container--heading'>
              <div className='player-bottom-track__container--heading__title'>
                {`${currentTrack.name} - ${currentTrack.artist}`}
              </div>
              <div className='player-bottom-track__container--heading__actions'>
                <button className='page-player-bottom__btn'>
                  <IoAddOutline />
                </button>
                <button className='page-player-bottom__btn' onClick={() => setSongLike(!songLike)}>
                  {songLike ? <AiFillHeart size='1.5rem' color='#ef5466' /> : <AiOutlineHeart />}
                </button>
              </div>
            </div>
            <div className='player-bottom-track__container--seekbar'>
              <hr />
            </div>
          </div>
          {(trackData.duration / 60).toFixed(2)}
        </div>

        <div className='player-bottom-options'>
          <button className='page-player-bottom__btn'>
            <IoShuffleOutline />
          </button>
          <button className='page-player-bottom__btn'>
            <IoRepeatOutline />
          </button>
          <button className='page-player-bottom__btn' onClick={() => setSongVolume(!songVolume)}>
            {songVolume ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
          </button>
        </div>

      </div>
    </div>
  )
}

export default PlayerBComponent;