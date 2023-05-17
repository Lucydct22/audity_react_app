import { useState, useEffect, useContext, useRef } from "react";
import SongPlaceholder from "assets/img/webp/music-placeholder-300.webp";
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';
import TrackSideBarMobile from "./TrackSidebarMobile/TrackSideBarMobile";
import "./trackItemComponentMobile.scss";
import { RxDotsVertical } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";

const TrackListMobileComponent = ({
  id,
  name,
  artist,
  thumbnail,
  likes,
  time,
  album,
  audioUrl,
  track,
}) => {
  const { trackData, currentTrack, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);
  const { playlists, tracks, postPlaylist, putTrackToPlaylist, likeDislikeTrack } = useContext(MyLibraryContext)
  const [popOpen, setPopperOpen] = useState(false);
  const [songLike, setSongLike] = useState(false);

  let popperRef = useRef();

  const handleClick = () => {
    if (trackData.url !== audioUrl) {
      selectCurrentTrack(track);
    } else {
      trackData.isPlaying ? pauseCurrentTrack() : playCurrentTrack();
    }
  };

  useEffect(() => {
    const haveLike = tracks.content.find((item) => item._id === track._id)
    haveLike === undefined ? setSongLike(true) : setSongLike(false)
  }, [track, tracks])

  return (
    <>
      <div key={id} className="track-list-item-mobile" ref={popperRef}>
        <div className="track-list-item-mobile__content" onClick={handleClick}>
          <img src={thumbnail ? thumbnail : SongPlaceholder} alt={name} />
          <div className="track-list-item-mobile__content--text">
            <div>{name}</div>
            <span>{artist}</span>
          </div>
        </div>
        <div className="track-list-item-mobile__icons">
          <button onClick={() => likeDislikeTrack(track)} className="track-list-item-mobile__icons--play" >
            {!songLike ? <AiFillHeart color='#ef5466' /> : <CiHeart />}
          </button>
          <RxDotsVertical
            className="track-list-item-mobile__icons--dots"
            onClick={() => setPopperOpen(!popOpen)}
          />
        </div>
      </div>
    </>
  );
};

export default TrackListMobileComponent;
