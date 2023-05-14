import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { responsiveBreak } from "utils/componentsConstants";
import { useTranslation } from 'react-i18next';
import { AiOutlineHeart } from "react-icons/ai";
import { MdPause, MdPlayArrow, MdArrowBack } from "react-icons/md";
import CopyUrl from 'views/UI/copyUrl/CopyUrl';
import './albumBComponent.scss';
import CurrentTracklistContext from 'context/currentTracklist/CurrentTracklistContext';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';

export default function AlbumBComponent({ album }) {
  const { selectAlbum } = useContext(CurrentTracklistContext)
  const { selectCurrentTrack } = useContext(CurrentTrackContext)
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [screenWidth] = useWindowSizeReport()
  const navigate = useNavigate();

  const handlePlayClick = () => {
    selectAlbum(album._id)
    selectCurrentTrack(album.tracks[0])
    setIsPlaying((prevState) => !prevState);
  };

  const handleLikeClick = () => {
    setIsLiked((prevState) => !prevState);
  }

  return (
    <>
      {(screenWidth < responsiveBreak) &&
        <div className="album-page-back">
          <button onClick={() => navigate(-1)}>
            <MdArrowBack size={27} />
          </button>
        </div>
      }
      <div className="album-page">
        <img src={album?.imageUrl} alt="Image description" />
        <section className="album-page__section">
          <h1>{album?.name}</h1>
          <p>15 {t('page_pnumber')}</p>
          <div className="album-page__section--buttons">
            <button className="album-page__section--buttons__play" onClick={handlePlayClick}>
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
            <CopyUrl className="album-page__section--buttons__copy-url" />
            <button className="album-page__section--buttons__like" onClick={handleLikeClick}>
              {isLiked ? <AiOutlineHeart color='#ef5466' /> : <AiOutlineHeart />}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}