import { useContext, useEffect, useState } from 'react'
import { IoChevronDownOutline, IoAddOutline, IoShuffleOutline, IoRepeatOutline, IoVolumeMuteOutline, IoVolumeHighOutline } from "react-icons/io5"
import ProgressBar from '../../desktop/playerBComponentDesktop/progressBar/ProgressBar'
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext'
import MyLibraryContext from 'context/myLibrary/MyLibraryContext'
import CurrentTracklistContext from 'context/currentTracklist/CurrentTracklistContext'
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext, MdOutlineQueueMusic } from "react-icons/md";
import './playerTrackDetailsComponentMobile.scss'
import formatToSeconds from 'utils/tracks/formatToSeconds';
import SongPlaceholder from "assets/img/webp/music-placeholder-300.webp";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import PopupAddPlaylistBComponent from '../popupAddPlaylistBComponent/PopupAddPlaylistBComponent'
import { getAlbumsApi } from 'api/music/albums';

const PlayerTrackDetailsComponentMobile = ({ onClose }) => {
  const { t } = useTranslation();
  const [showPopUp, setShowPopUp] = useState(false);
  const [songLike, setSongLike] = useState(false);
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
  const { tracks, likeDislikeTrack } = useContext(MyLibraryContext)
  const { shuffle, shuffleTracklist } = useContext(CurrentTracklistContext);
  const [artists, setArtists] = useState('')
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState('')

  useEffect(() => {
    let isMounted = true
    const artists = currentTrack.artists.map((artist) => artist.name).join(' & ');
    isMounted && setArtists(artists)
    return () => { isMounted = false }
  }, [artists, currentTrack])

  useEffect(() => {
    const haveLike = tracks.content.find((item) => item._id === currentTrack._id)
    haveLike === undefined ? setSongLike(true) : setSongLike(false)
  }, [currentTrack, tracks])

  useEffect(() => {
    const getAlbums = async () => {
      const response = await getAlbumsApi()
      const albumsData = response.albums
      const albumData = albumsData.find((item) => item._id === currentTrack.album)
      if (albumData) {
        setAlbum(albumData.name)
      }
    };
    getAlbums()
  }, [currentTrack, albums, album])


  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <div className={'player-track-details-container'}>
      <div className='player-track-details-container__track-info'>

        <div className='player-track-details-container__track-info__close'>
          <button onClick={onClose}><IoChevronDownOutline /></button>
          <p>{currentTrack.name}</p>
          <span>&nbsp;</span>
        </div>

        <span>
          <img src={currentTrack.imageUrl ? currentTrack.imageUrl : SongPlaceholder} alt='Thumbnail of track' className='player-track-details-container__track-info__img' />
          <div className='player-track-details-container__track-info__data'>
            <p className='player-track-details-container__track-info__data__nameBig'>{currentTrack.name}</p>
            <div className='player-track-details-container__track-info__data__info'>
              <p >{artists} </p>
              <p > {album ? ' - ' + album : ''}</p>
            </div>
          </div>
          
          <div className='player-track-details-container__track-info__track-time'>
            <div className='player-track-details-container__track-info__track-time__timedata'>
              <p>{formatToSeconds(trackData.currentTime)}</p>
              <p>{formatToSeconds(trackData.duration)}</p>
            </div>
            <ProgressBar />
          </div>
          <div className='player-track-details-container__track-info__player-bottom-controls'>
            <button className='player-track-details-container__track-info__player-bottom-controls__like' onClick={() => likeDislikeTrack(currentTrack)}>
              {!songLike ? <AiFillHeart size='2rem' color='#ef5466' /> : <AiOutlineHeart />}
            </button>
            <button className='player-track-details-container__track-info__player-bottom-controls__change' onClick={previousTrack}>
              <MdSkipPrevious />
            </button>
            <button className='player-track-details-container__track-info__player-bottom-controls__play' onClick={trackData.isPlaying ? pauseCurrentTrack : playCurrentTrack}>
              {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>
            <button className='player-track-details-container__track-info__player-bottom-controls__change' onClick={nextTrack}>
              <MdSkipNext />
            </button>
            <button className='player-track-details-container__track-info__player-bottom-controls__add' onClick={() => setShowPopUp(!showPopUp)} >
              <IoAddOutline />
            </button>
          </div>
        </span>

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
      {showPopUp && (
        <PopupAddPlaylistBComponent onClose={handleClosePopUp} />
      )}
    </div>
  )
}

export default PlayerTrackDetailsComponentMobile