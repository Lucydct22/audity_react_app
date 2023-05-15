import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { responsiveBreak } from "utils/componentsConstants";
import CopyUrl from 'views/UI/copyUrl/CopyUrl';
import { useTranslation } from 'react-i18next';
import { AiOutlineHeart } from "react-icons/ai";
import { IoShuffleOutline } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import './playlistBComponent.scss';
import { Player } from '@lottiefiles/react-lottie-player';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';

export default function PlaylistBComponent({ playlist }) {
  const { t } = useTranslation();
  const { trackData } = useContext(CurrentTrackContext)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [screenWidth] = useWindowSizeReport()
  const navigate = useNavigate();

  const handlePlayClick = () => {
    setIsPlaying(true);
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
            <button className="playlist-page__section--buttons__play" onClick={handlePlayClick}>
              {(screenWidth < responsiveBreak) && <Player
                src='https://assets8.lottiefiles.com/private_files/lf30_oMQCYI.json'
                loop
                autoplay
                style={{ height: '40px', width: '27px' }}
                className={isPlaying && trackData.isPlaying ? "playlist-page-show-playing" : "playlist-page__section--buttons__play--playing"}
              />}
              {(screenWidth > responsiveBreak) && <Player
                src='https://assets8.lottiefiles.com/private_files/lf30_oMQCYI.json'
                loop
                autoplay
                style={{ height: '40px', width: '27px' }}
                className={isPlaying && trackData.isPlaying ? "playlist-page-show-playing" : "playlist-page__section--buttons__play--playing"}
              />}
              <IoShuffleOutline size={22} className={isPlaying && trackData.isPlaying ? "playlist-page__section--buttons__play--onBtn playlist-page-show-onBtn" : "playlist-page__section--buttons__play--onBtn"} />
              <span>{t('pausebutton')}</span>
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
