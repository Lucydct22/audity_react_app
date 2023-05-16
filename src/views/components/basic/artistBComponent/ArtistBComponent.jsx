import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { useTranslation } from "react-i18next";
import CopyUrl from "views/UI/copyUrl/CopyUrl";
import { MdArrowBack, MdPlayArrow, MdPause } from "react-icons/md";
import { SlUserFollowing, SlUserFollow } from "react-icons/sl";
import { IoShuffleOutline } from "react-icons/io5";
import "./artistBComponent.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import CurrentTracklistContext from "context/currentTracklist/CurrentTracklistContext";

export default function ArtistBComponent({ artist }) {
  const { listId, selectArtist } = useContext(CurrentTracklistContext);
  const { trackData, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [screenWidth] = useWindowSizeReport();
  const navigate = useNavigate();

  const handlePlayClick = () => {
    selectArtist(artist._id);
    selectCurrentTrack(artist.tracks[0]);
    setIsPlaying(true);
  };

  const handleFollowClick = () => {
    setIsFollowing((prevState) => !prevState);
  };

  return (
    <>
      {screenWidth < responsiveBreak && (
        <div className="artist-page-back">
          <button onClick={() => navigate(-1)}>
            <MdArrowBack size={27} />
          </button>
        </div>
      )}
      <div className="artist-page">
        <img src={artist?.imageUrl} alt="Image description" />
        <section className="artist-page__section">
          <h1>{artist?.name}</h1>
          <p>500.655 Fans</p>
          <div className="artist-page__section--buttons">
            <button
              className="artist-page__section--buttons__play" onClick={handlePlayClick}
            >
              {/* {listId !== artist?._id ? (
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
              )} */}

              {(screenWidth < responsiveBreak) && <Player
                src='https://assets8.lottiefiles.com/private_files/lf30_oMQCYI.json'
                loop
                autoplay
                style={{ height: '40px', width: '27px' }}
                className={isPlaying && trackData.isPlaying ? "artist-page-show-playing" : "artist-page__section--buttons__play--playing"}
              />}
              {(screenWidth > responsiveBreak) && <Player
                src='https://assets8.lottiefiles.com/private_files/lf30_oMQCYI.json'
                loop
                autoplay
                style={{ height: '40px', width: '27px' }}
                className={isPlaying && trackData.isPlaying ? "artist-page-show-playing" : "artist-page__section--buttons__play--playing"}
              />}
              <IoShuffleOutline size={22} className={isPlaying && trackData.isPlaying ? "artist-page__section--buttons__play--onBtn artist-page-show-onBtn" : "artist-page__section--buttons__play--onBtn"} />
              <span>{t('pausebutton')}</span>
            </button>
            <CopyUrl className="artist-page__section--buttons__copy-url" />
            <button
              className="artist-page__section--buttons__follow"
              onClick={handleFollowClick}
            >
              {isFollowing ? (
                <SlUserFollowing color="#ef5466" />
              ) : (
                <SlUserFollow />
              )}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
