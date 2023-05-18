import "./renderTrack.scss";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { joinArtistsName } from "views/utils/joinArtistsName";
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function RenderTrack({ track }: any) {
  const { trackData, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);
  const { name, imageUrl, artists } = track;
  const artistsName = joinArtistsName(artists);
  const { t } = useTranslation();

  const handleClick = () => {
    if (trackData.url !== track.audioUrl) {
      selectCurrentTrack(track);
    } else {
      trackData.isPlaying ? pauseCurrentTrack() : playCurrentTrack()
    }
  };

  return (
    <div className="render-track" onClick={handleClick}>
      <div className="render-track__thumbnail">
        <div className="render-track__thumbnail--picture">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="render-track__thumbnail--btn">
          <button>
            {trackData.url === track.audioUrl && trackData.isPlaying ?
              <MdPause size={20} /> : <MdPlayArrow size={20} />
            }
          </button>
        </div>
      </div>
      <div>
        <p className="render-track__name">{name}</p>
        <p className="render-track__artist">From {artistsName}</p>
      </div>
    </div>
  );
}
