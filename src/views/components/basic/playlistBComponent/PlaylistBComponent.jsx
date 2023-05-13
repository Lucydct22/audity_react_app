import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { responsiveBreak } from "utils/componentsConstants";
import CopyUrl from 'views/UI/copyUrl/CopyUrl';
import { useTranslation } from 'react-i18next';
import { AiOutlineHeart } from "react-icons/ai";
import { MdPause, MdPlayArrow, MdArrowBack } from "react-icons/md";
import './playlistBComponent.scss';

export default function PlaylistBComponent({ playlist }) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [screenWidth] = useWindowSizeReport()
  const navigate = useNavigate();

  const handlePlayClick = () => {
    setIsPlaying((prevState) => !prevState);
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
              {isPlaying ? (
                <>
                  <MdPause size={20} />
                  <span>{t('pausebutton')}</span>
                </>
              ) : (
                <>
                  <MdPlayArrow size={20} />
                  <span>{t('playbutton')}</span>
                </>
              )}
            </button>
            <CopyUrl className="playlist-page__section--buttons__copy-url" />
            <button className="playlist-page__section--buttons__like" onClick={handleLikeClick}>
              {isLiked ? <AiOutlineHeart color='#ef5466' /> : <AiOutlineHeart />}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
