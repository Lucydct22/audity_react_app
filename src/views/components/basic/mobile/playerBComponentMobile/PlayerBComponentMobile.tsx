import { useContext, useEffect, useState, useEffect, useRef } from 'react';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
// import formatToSeconds from 'utils/tracks/formatToSeconds';
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { IoAddOutline, IoShuffleOutline, IoRepeatOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import './playerBComponentMobile.scss'
import PlayerTrackDetailsComponentMobile from '../playerTrackDetailsComponentMobile/PlayerTrackDetailsComponentMobile';

const PlayerBComponentMobile = () => {

  const [songLike, setSongLike] = useState(false);
  const {
    trackData,
    currentTrack,
    playCurrentTrack,
    pauseCurrentTrack,
    nextTrack
  } = useContext(CurrentTrackContext);
  const artists = currentTrack.artist.map(artist => artist.name).join(' & ');

  const [showPopUp, setShowPopUp] = useState(false);
 
//Cambiar posicion setShowPopUp
  return (
    <>
    <div className='page-player-mobile' onClick={() => setShowPopUp(!showPopUp)}>
      <div className='player-bottom-mobile'>
        <div className='player-bottom-controls-mobile'>
          <button
            onClick={trackData.isPlaying ? pauseCurrentTrack : playCurrentTrack}
            className='player-bottom-controls-mobile__controls-action'
          >
            {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>
        </div>

        <div className='player-bottom-track-mobile' >
          <div className='player-bottom-track-mobile__title'>
            {currentTrack.name}
          </div>
          <div className='player-bottom-track-mobile__artist'>
            {artists}
          </div>
        </div>

        <div className='player-bottom-controls-mobile'>
          <button className='player-bottom-controls-mobile__btn' onClick={() => setSongLike(!songLike)}>
            {songLike ? <AiFillHeart size='1.5rem' color='#fff' /> : <AiOutlineHeart />}
          </button>
          <button onClick={nextTrack} className='player-bottom-controls-mobile__controls-action'>
            <MdSkipNext />
          </button>
        </div>
      </div>
    </div>

    {showPopUp && <PlayerTrackDetailsComponentMobile/>}

    </>
  )
}

export default PlayerBComponentMobile;