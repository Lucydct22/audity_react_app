import './playlistComponent.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaPlay, FaHeart, FaRegHeart, FaUserPlus, FaUserMinus, FaPause } from "react-icons/fa";
import Spinner from 'views/UI/spinner';
import PlaylistImg from 'assets/img/albums/summer-playlist.png';

const PlaylistComponent = ({ playlistname, playlistQuantity }) => {
  const { t } = useTranslation();
  const { isLoading } = useAuth0();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (isLoading) {
    return <Spinner />
  }

  const handlePlayClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleFollowClick = () => {
    setIsFollowing((prevState) => !prevState);
  };

  const handleLikeClick = () => {
    setIsLiked((prevState) => !prevState);
  }

  return (
    <>
      <div className="playlist-page">
        <div className="playlist-page__image">
          <img src={PlaylistImg} alt="playlist-summer" />
        </div>
        <section className="playlist-page__section">
          <div className="playlist-page__section--details">
            <div className="playlist-page__section--details__title">
              <h1>{playlistname}</h1>
            </div>
            <div className="playlist-page__section--details__songs">
              <p>{playlistQuantity} {t('page_pnumber')}</p>
            </div>
          </div>

          <div className="playlist-page__section--buttons">
            <div className="playlist-page__section--buttons__container">
              <div className="playlist-page__section--buttons__container--play">
                <button className="playlist-page__section--buttons__container--play__btn" onClick={handlePlayClick}>
                  {isPlaying ? (
                    <>
                      <FaPause /> <span>{t('pausebutton')}</span>
                    </>
                  ) : (
                    <>
                      <FaPlay /> <span>{t('playbutton')}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="playlist-page__section--buttons__container--like">
                <button className="playlist-page__section--buttons__container--like__btn" onClick={handleLikeClick}>
                  {isLiked ? (
                    <>
                      <FaHeart style={{ fill: '#cb0000' }} />
                    </>
                  ) : (
                    <>
                      <FaRegHeart />
                    </>
                  )}
                </button>
              </div>
              <div className="playlist-page__section--buttons__container--follow">
                <button className="playlist-page__section--buttons__container--follow__btn" onClick={handleFollowClick}>
                  {isFollowing ? (
                    <>
                      <FaUserMinus />
                    </>
                  ) : (
                    <>
                      <FaUserPlus />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PlaylistComponent;