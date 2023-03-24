import { useContext, useEffect, useState } from 'react';
import { TrackContext } from '../../../../../context/currentTrack/TrackContext';
import formatToSeconds from '../../../../../utils/tracks/formatToSeconds';
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoAddOutline, IoShuffleOutline, IoRepeatOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import './playerBComponentDesktop.scss'

const PlayerBComponentDesktop = () => {
  const [songLike, setSongLike] = useState(false);
  const [songVolume, setSongVolume] = useState(false);
  const {
    trackData,
    currentTrack,
    initCurrentTrack,
    playCurrentTrack,
    pauseCurrentTrack,
    updateCurrentTime,
    nextTrack,
    previousTrack,
    muteTrack,
    loopTrack
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
          <button onClick={previousTrack} className='page-player-bottom__btn'>
            <MdSkipPrevious />
          </button>
          <button
            onClick={trackData.isPlaying ? pauseCurrentTrack : playCurrentTrack}
            className='page-player-bottom__btn'
          >
            {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>
          <button onClick={nextTrack} className='page-player-bottom__btn'>
            <MdSkipNext />
          </button>
        </div>

        <div className='player-bottom-track'>
          {formatToSeconds(trackData.currentTime)}
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
          {formatToSeconds(trackData.duration)}
        </div>

        <div className='player-bottom-options'>
          <button className='page-player-bottom__btn'>
            <IoShuffleOutline />
          </button>
          <button className='page-player-bottom__btn' onClick={loopTrack}>
            {trackData.hasLoop ? <IoRepeatOutline /> : <IoRepeatOutline />}
          </button>
          <button className='page-player-bottom__btn' onClick={muteTrack}>
            {trackData.isMuted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
          </button>
        </div>

      </div>
    </div>
  )
}

export default PlayerBComponentDesktop;