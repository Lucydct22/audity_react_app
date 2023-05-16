import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import "./renderTrack.scss";
import { MdPause, MdPlayArrow, MdArrowBack } from "react-icons/md";
import { joinArtistsName } from "views/utils/joinArtistsName";
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import CurrentTracklistContext from "context/currentTracklist/CurrentTracklistContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function RenderTrack({ track }: any) {
  const { listId, selectTrack } = useContext(CurrentTracklistContext);
  const { trackData, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);
  const { name, imageUrl, artists } = track;
  const artistsName = joinArtistsName(artists);
  const { t } = useTranslation();

  const handlePlayClick = () => {
    selectCurrentTrack(track);
  };

  return (
    <div className="render-track">
      <div className="render-track__thumbnail">
        <div className="render-track__thumbnail--picture">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="render-track__thumbnail--btn">
          <div className="render-track__thumbnail--btn__play">
            <button>
              {listId !== track?._id ? (
                <div onClick={handlePlayClick}>
                  <MdPlayArrow size={20} />
                  <span>{t("playbutton")}</span>
                </div>
              ) : (
                <>
                  {trackData.isPlaying ? (
                    <div onClick={pauseCurrentTrack}>
                      <MdPause size={20} />
                      <span>{t("pausebutton")}</span>
                    </div>
                  ) : (
                    <div onClick={playCurrentTrack}>
                      <MdPlayArrow size={20} />
                      <span>{t("playbutton")}</span>
                    </div>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="render-track__name">{name}</p>
        <p className="render-track__artist">De {artistsName}</p>
      </div>
    </div>
  );
}
