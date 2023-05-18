import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { responsiveBreak } from "utils/componentsConstants";
import { useTranslation } from "react-i18next";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdArrowBack, MdPlayArrow, MdPause } from "react-icons/md";
import { IoShuffleOutline } from "react-icons/io5";
import CopyUrl from "views/UI/copyUrl/CopyUrl";
import "./albumBComponent.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import CurrentTracklistContext from "context/currentTracklist/CurrentTracklistContext";
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import MyLibraryContext from "context/myLibrary/MyLibraryContext";

export default function AlbumBComponent({ album }) {
  const { listId, selectAlbum } = useContext(CurrentTracklistContext);
  const { trackData, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);
  const { t } = useTranslation();
  const [songLike, setSongLike] = useState(false);
  const [screenWidth] = useWindowSizeReport();
  const navigate = useNavigate();
  const { albums, likeDislikeAlbum } = useContext(MyLibraryContext)

  const handlePlayClick = () => {
    if (trackData.url !== album.tracks[0].audioUrl) {
      selectAlbum(album._id);
      selectCurrentTrack(album.tracks[0]);
    } else {
      trackData.isPlaying ? pauseCurrentTrack() : playCurrentTrack()
    }
  };

  useEffect(() => {
    if (album) {
      const haveLike = albums.content.find((item) => item._id === album._id)
      haveLike === undefined ? setSongLike(true) : setSongLike(false)
    }
  }, [album, albums])

  return (
    <>
      {screenWidth < responsiveBreak && (
        <div className="album-page-back">
          <button onClick={() => navigate(-1)}>
            <MdArrowBack size={27} />
          </button>
        </div>
      )}
      <div className="album-page">
        <img src={album?.imageUrl} alt="Image description" />
        <section className="album-page__section">
          <h1>{album?.name}</h1>
          <p>15 {t("page_pnumber")}</p>
          <div className="album-page__section--buttons">
            <button
              className="album-page__section--buttons__play"
            >
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
            <CopyUrl className="album-page__section--buttons__copy-url" />
            <button
              className="album-page__section--buttons__like"
              onClick={() => likeDislikeAlbum(album)}
            >
              {!songLike ? (
                <AiFillHeart color="#ef5466" />
              ) : (
                <AiOutlineHeart />
              )}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
