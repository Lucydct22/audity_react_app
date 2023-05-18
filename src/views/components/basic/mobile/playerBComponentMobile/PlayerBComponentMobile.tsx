import { useContext, useState, useEffect } from 'react';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import { MdPause, MdPlayArrow, MdSkipNext } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import './playerBComponentMobile.scss'
import PlayerTrackDetailsComponentMobile from '../playerTrackDetailsComponentMobile/PlayerTrackDetailsComponentMobile';
import UserContext from 'context/user/UserContext';
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';

const PlayerBComponentMobile = () => {
  const { dbUser } = useContext(UserContext)
  const [songLike, setSongLike] = useState(false);
  const {
    trackData,
    currentTrack,
    playCurrentTrack,
    pauseCurrentTrack,
    nextTrack
  } = useContext(CurrentTrackContext);
  const { tracks, likeDislikeTrack } = useContext(MyLibraryContext)
  const [showPopUp, setShowPopUp] = useState(false);
  const [artists, setArtists] = useState('')

  useEffect(() => {
    let isMounted = true
    const artists = currentTrack.artists.map((artist: any) => artist.name).join(' & ');
    isMounted && setArtists(artists)
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    const haveLike = tracks.content.find((item: any) => item._id === currentTrack._id)
    haveLike === undefined ? setSongLike(true) : setSongLike(false)
  }, [currentTrack, tracks])

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <>
      <div className='page-player-mobile' >
        <div className='player-bottom-mobile'>
          <div className='player-bottom-controls-mobile'>
            <button
              onClick={trackData.isPlaying ? pauseCurrentTrack : playCurrentTrack}
              className='player-bottom-controls-mobile__controls-action'
            >
              {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>
          </div>

          <div className='player-bottom-track-mobile' onClick={() => setShowPopUp(true)} >
            <div className='player-bottom-track-mobile__title'>
              {currentTrack.name}
            </div>
            <div className='player-bottom-track-mobile__artist'>
              {artists}
            </div>
          </div>

          <div className='player-bottom-controls-mobile'>
            <button className='player-bottom-controls-mobile__btn' onClick={() => likeDislikeTrack(currentTrack)}>
              {!songLike ? <AiFillHeart size='1.5rem' color='#ef5466' /> : <AiOutlineHeart />}
            </button>
            <button onClick={nextTrack} className='player-bottom-controls-mobile__controls-action'>
              <MdSkipNext />
            </button>
          </div>
        </div>
      </div>
      {showPopUp && <PlayerTrackDetailsComponentMobile onClose={handleClosePopUp} />}
    </>
  )
}

export default PlayerBComponentMobile;