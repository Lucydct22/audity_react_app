import "./TrackItemComponentDesktop.scss";
import { IoAddOutline } from "react-icons/io5";
import { AiFillHeart, AiOutlineDownload } from "react-icons/ai";
import SongPlaceholder from "assets/img/webp/music-placeholder-300.webp";
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import { useContext } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

const TrackListDesktopComponent = ({
  id,
  index,
  name,
  artist,
  thumbnail,
  likes,
  time,
  album,
  audioUrl,
  track,
}) => {
  const { trackData, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);

  const handleClick = () => {
    if (trackData.url !== audioUrl) {
      selectCurrentTrack(track);
    } else {
      trackData.isPlaying ? pauseCurrentTrack() : playCurrentTrack();
    }
  };

  return (
    <div className="track-list">
      {id && name && time ? (
        <div key={id} className="track-list--item">
          <div className="track-list--item__track" onClick={handleClick}>
            <span className="track-list--item__track--index">{index + 1}</span>
            <span className="track-list--item__track--img">
              <img src={thumbnail ? thumbnail : SongPlaceholder} alt={name} />
              <div className="track-list--item__track--img__btn">
                <button>
                  {trackData.url === audioUrl && trackData.isPlaying ? (
                    <MdPause size={20} />
                  ) : (
                    <MdPlayArrow size={20} />
                  )}
                </button>
              </div>
            </span>
            <span className="track-list--item__track--name">{name}</span>
          </div>
          <div className="track-list--item__icons">
            <span className="track-list--item__icons--heart">
              <AiFillHeart size={25} color="#a2a2ad" />
              {likes}
            </span>
            <span className="track-list-item__icons--library">
              <IoAddOutline size={25} color="#a2a2ad" />
            </span>
            <span className="track-list--item__icons--download">
              <AiOutlineDownload size={25} color="#a2a2ad" />
            </span>
          </div>
          <span className="track-list--item__artist">
            {artist ? artist : "-"}
          </span>
          <span className="track-list--item__album">{album ? album : "-"}</span>
          <span className="track-list--item__time">{time}</span>
        </div>
      ) : (
        <p>
          This playlist looks empty... Find some tracks to add to your playlist
        </p>
      )}
    </div>
  );
};

export default TrackListDesktopComponent;
