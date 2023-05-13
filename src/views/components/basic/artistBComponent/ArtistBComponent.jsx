import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { useTranslation } from 'react-i18next';
import CopyUrl from 'views/UI/copyUrl/CopyUrl';
import { MdPause, MdPlayArrow, MdArrowBack } from "react-icons/md";
import { SlUserFollowing, SlUserFollow } from "react-icons/sl";
import './artistBComponent.scss';

export default function ArtistBComponent({ artist }) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [screenWidth] = useWindowSizeReport()
  const navigate = useNavigate();

  const handlePlayClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleFollowClick = () => {
    setIsFollowing((prevState) => !prevState);
  };

  return (
    <>
      {(screenWidth < responsiveBreak) &&
        <div className="artist-page-back">
          <button onClick={() => navigate(-1)}>
            <MdArrowBack size={27} />
          </button>
        </div>
      }
      <div className="artist-page">
        <img src={artist?.imageUrl} alt="Image description" />
        <section className="artist-page__section">
          <h1>{artist?.name}</h1>
          <p>500.655 Fans</p>
          <div className="artist-page__section--buttons">
            <button className="artist-page__section--buttons__play" onClick={handlePlayClick}>
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
            <CopyUrl className="artist-page__section--buttons__copy-url"/>
            <button className="artist-page__section--buttons__follow" onClick={handleFollowClick}>
              {isFollowing ? <SlUserFollowing color='#ef5466' /> : <SlUserFollow />}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
