import { useContext, useEffect, useState } from 'react';
import { TrackContext } from '../../../../../context/currentTrack/TrackContext';
import { formatToSecondsTrack } from '../../../../../utils/formatToSecondsTrack';
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoAddOutline, IoShuffleOutline, IoRepeatOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import './playerBComponentMobile.scss'

const PlayerBComponentMobile = () => {
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
          <button
            onClick={trackData.isPlaying ? pauseCurrentTrack : playCurrentTrack}
            className='player-bottom-controls__controls-action'
          >
            {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>
        </div>

        <div className='player-bottom-track'>
          <div className='player-bottom-track__title'>
            {currentTrack.name}
          </div>
          <div className='player-bottom-track__artist'>
            {currentTrack.artist}
          </div>
        </div>

        <div className='player-bottom-controls'>
          <button className='player-bottom-controls__btn' onClick={() => setSongLike(!songLike)}>
            {songLike ? <AiFillHeart size='1.5rem' color='#fff' /> : <AiOutlineHeart />}
          </button>
          <button className='player-bottom-controls__controls-action'>
            <MdSkipNext />
          </button>
        </div>

      </div>
    </div>
  )
}

export default PlayerBComponentMobile;