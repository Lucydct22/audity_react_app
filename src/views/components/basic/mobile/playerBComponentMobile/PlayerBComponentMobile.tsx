import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/user/UserContext";
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';
import PlayerTrackDetailsComponentMobile from '../playerTrackDetailsComponentMobile/PlayerTrackDetailsComponentMobile';
import { MdPause, MdPlayArrow, MdSkipNext } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import './playerBComponentMobile.scss'
import { message } from 'antd';

const PlayerBComponentMobile = () => {
  const [songLike, setSongLike] = useState(false);
  const {
    trackData,
    currentTrack,
    playCurrentTrack,
    pauseCurrentTrack,
    nextTrack
  } = useContext(CurrentTrackContext);
  const { tracks, likeDislikeTrack } = useContext(MyLibraryContext)
  const { isAuthenticated } = useAuth0()
  const { dbUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [showPopUp, setShowPopUp] = useState(false);
  const [artists, setArtists] = useState('')
  const [isGuest, setIsGuest] = useState(true)

  const handleGuest = () => {
    navigate('/offers')
    message.info('Login or create an Audity account')
  }

  useEffect(() => {
    setIsGuest(false)
    if (!isAuthenticated) {
      setIsGuest(true)
    }
  }, [dbUser]);

  useEffect(() => {
    let isMounted = true
    const artists = currentTrack.artists.map((artist: any) => artist.name).join(' & ');
    isMounted && setArtists(artists)
    return () => { isMounted = false }
  }, [currentTrack])

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
            <button className='player-bottom-controls-mobile__btn' onClick={() => isGuest ? handleGuest() : likeDislikeTrack(currentTrack)}>
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