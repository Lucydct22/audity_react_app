import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { MdPause, MdPlayArrow, MdArrowBack } from "react-icons/md";
import { SlUserFollowing, SlUserUnfollow } from "react-icons/sl";
import { AiOutlineHeart } from "react-icons/ai";
import './artistBComponent.scss';


export default function ArtistBComponent({ artist }) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [screenWidth] = useWindowSizeReport()

  const handlePlayClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleFollowClick = () => {
    setIsFollowing((prevState) => !prevState);
  };

  return (
    <>
      {(screenWidth < responsiveBreak) &&
        <Link to={"/explore"} className="artist-page-back">
          <MdArrowBack size={27} />
        </Link>
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
            <button className="artist-page__section--buttons__like" onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? <AiOutlineHeart color='#ef5466' /> : <AiOutlineHeart />}
            </button>
            <button className="artist-page__section--buttons__follow" onClick={handleFollowClick}>
              {isFollowing ? <SlUserUnfollow /> : <SlUserFollowing color='#ef5466' />}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
