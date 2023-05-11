import { useContext, useEffect, useState } from 'react'
import { IoChevronDownOutline, IoAdd, IoHeartOutline, IoShuffleOutline, IoRepeatOutline, IoVolumeMuteOutline, IoVolumeHighOutline } from "react-icons/io5"
import ProgressBar from '../../desktop/playerBComponentDesktop/progressBar/ProgressBar'
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext'
import CurrentTracklistContext from 'context/currentTracklist/CurrentTracklistContext'
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext, MdOutlineQueueMusic } from "react-icons/md";
import './playerTrackDetailsComponentMobile.scss'
import img from 'assets/img/albums/summer-playlist.png'



const PlayerTrackDetailsComponentMobile = ({ showPopUp, handleClosePopUp }: any) => {

  const {
    trackData,
    currentTrack,
    playCurrentTrack,
    pauseCurrentTrack,
    nextTrack,
    previousTrack,
    muteTrack,
    loopTrack,
  } = useContext(CurrentTrackContext);

  const { shuffle, shuffleTracklist } = useContext(CurrentTracklistContext);

  const [artists, setArtists] = useState('')

  useEffect(() => {
    let isMounted = true
    const artists = currentTrack.artists.map((artist: any) => artist.name).join(' & ');
    isMounted && setArtists(artists)
    return () => { isMounted = false }
  }, [])



  return (
    <div className={showPopUp ? 'player-track-details-container container--open' : 'player-track-details-container'}>
      <div className='player-track-details-container__track-info'>
        <div className='player-track-details-container__track-info__close'>
          <button onClick={handleClosePopUp}><IoChevronDownOutline /></button>
          <p>{currentTrack.name}</p>
        </div>
        <img src={img} alt='Thumbnail of track' className='player-track-details-container__track-info__img' />

        <div className='player-track-details-container__track-info__data'>
          <p className='player-track-details-container__track-info__data__nameBig'>{currentTrack.name}</p>
          <div className='player-track-details-container__track-info__data__info'>
            <p>{artists}</p>
            <p>{currentTrack.name}</p>
          </div>
        </div>

        <div className='player-track-details-container__track-info__track-time'>
          <div className='player-track-details-container__track-info__track-time__timedata'>
            <p>{trackData.currentTime}</p>
            <p>{trackData.duration}</p>
          </div>
          <ProgressBar />
        </div>

        <div className='player-track-details-container__track-info__player-bottom-controls'>
          <div className='player-track-details-container__track-info__player-bottom-controls__like'>
            <IoHeartOutline className='' />
          </div>
          <button className='player-track-details-container__track-info__player-bottom-controls__change' onClick={previousTrack}>
            <MdSkipPrevious />
          </button>
          <button className='player-track-details-container__track-info__player-bottom-controls__play' onClick={trackData.isPlaying ? pauseCurrentTrack : playCurrentTrack}>
            {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>
          <button className='player-track-details-container__track-info__player-bottom-controls__change' onClick={nextTrack}>
            <MdSkipNext />
          </button>
          <div className='player-track-details-container__track-info__player-bottom-controls__add'>
            <IoAdd className='' />
          </div>
        </div>

        <div className='player-track-details-container__track-info__add-bottom'>
          <button className='player-track-details-container__track-info__add-bottom_right' onClick={muteTrack}>
            {trackData.isMuted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
          </button>
          <button className='player-track-details-container__track-info__add-bottom_right' onClick={loopTrack}>
            {trackData.hasLoop ? <IoRepeatOutline /> : <IoRepeatOutline color='#C1C1C1' />}
          </button>
          <button className='player-track-details-container__track-info__add-bottom_right' onClick={shuffleTracklist}>
            {shuffle ? <IoShuffleOutline /> : <IoShuffleOutline color='#C1C1C1' />}
          </button>
          <div className='player-track-details-container__track-info__add-bottom__queue-list'>
            <p>Queue list</p>
            <button className=''>
              <MdOutlineQueueMusic />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerTrackDetailsComponentMobile