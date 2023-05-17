import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { responsiveBreak } from "utils/componentsConstants";
import CopyUrl from 'views/UI/copyUrl/CopyUrl';
import { useTranslation } from 'react-i18next';
import { AiOutlineHeart } from "react-icons/ai";
import { MdArrowBack, MdPlayArrow, MdPause } from "react-icons/md";
import './playlistBComponent.scss';
import { Player } from '@lottiefiles/react-lottie-player';
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import CurrentTracklistContext from "context/currentTracklist/CurrentTracklistContext";

export default function PlaylistBComponent({ playlist }) {
  const { listId, selectPlaylist } = useContext(CurrentTracklistContext);
  const { trackData, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [screenWidth] = useWindowSizeReport()
  const navigate = useNavigate();

  const handlePlayClick = () => {
    if (trackData.url !== playlist.tracks[0].audioUrl) {
      selectPlaylist(playlist._id);
      selectCurrentTrack(playlist.tracks[0]);
    } else {
      trackData.isPlaying ? pauseCurrentTrack() : playCurrentTrack()
    }
  };

  const handleLikeClick = () => {
    setIsLiked((prevState) => !prevState);
  }

  return (
    <>
      {(screenWidth < responsiveBreak) &&
        <div className="playlist-page-back">
          <button onClick={() => navigate(-1)}>
            <MdArrowBack size={27} />
          </button>
        </div>
      }
      <div className="playlist-page">
        <img src={playlist?.imageUrl} alt="Image description" />
        <section className="playlist-page__section">
          <h1>{playlist?.name}</h1>
          <p>15 {t('page_pnumber')}</p>
          <div className="playlist-page__section--buttons">
            <button className="playlist-page__section--buttons__play">
              {trackData.isPlaying ? (
                <div onClick={handlePlayClick}>
                  <MdPause size={20} />
                  <span>{t("pausebutton")}</span>
                </div>
              ) : (
                <div onClick={handlePlayClick}>
                  <MdPlayArrow size={20} />
                  <span>{t("playbutton")}</span>
                </div>
              )}
            </button>
            {playlist?.publicAccessible && <CopyUrl className="playlist-page__section--buttons__copy-url" />}
            <button className="playlist-page__section--buttons__like" onClick={handleLikeClick}>
              {isLiked ? <AiOutlineHeart color='#ef5466' /> : <AiOutlineHeart />}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
