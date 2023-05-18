import './popupAddPlaylistBComponent.scss'
import { useTranslation } from 'react-i18next';
import { IoChevronBackOutline, IoAdd } from "react-icons/io5"
import { useState, useContext, useEffect } from 'react';
import img from 'assets/img/albums/summer-playlist.png';
import ModalPlaylistMobile from 'views/UI/ModalAntdPlaylistCreate/ModalAntdPlaylistCreateMobile/ModalAntdPlaylistCreateMobile';
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from 'context/theme/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';
import { message } from 'antd';

function RenderPlaylistMini() {
  const { t } = useTranslation();
  const { playlists, putTrackToPlaylist } = useContext(MyLibraryContext);
  const { currentTrack } = useContext(CurrentTrackContext);
  const { theme } = useContext(ThemeContext)
  // const [messageApi, contextHolder] = message.useMessage();
  // const key = 'updatable';


  const notify = (playlistName: string) => toast(`The track was added to ${playlistName}`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    progress: undefined,
    theme: theme,
    style: {
      width: '300px',
      top: '-70px',
    },
  })

  // const openMessage = () => {
  //   messageApi.open({
  //     type: 'loading',
  //     content: 'Loading...',
  //     style: {
  //       zIndex: '999'
  //     },
  //   });
  //   setTimeout(() => {
  //     messageApi.open({
  //       type: 'success',
  //       content: 'Added to Playlist!',
  //       duration: 3,
  //       style: {
  //         zIndex: '999'
  //       },
  //     });
  //   }, 1000);
  // };

  // async function copyToClip() {
  //   await navigator.clipboard.writeText(location.href);
  // }

  function handlePutTrackToPlaylist(playlistId: string, playlistName: string) {
    putTrackToPlaylist(playlistId, currentTrack._id);
    notify(playlistName)
    // copyToClip();
    // openMessage();
  }

  return (
    <>
      <ToastContainer />
      {/* {contextHolder} */}
      <div className="render-playlist-mini-container">
        {playlists.userContent.map((playlist: { _id: string, name: string, tracks: string[], cover: string }) => {
          return (
            <div className='render-playlist-mini' key={playlist._id} onClick={() => handlePutTrackToPlaylist(playlist._id, playlist.name)}>
              <div className='render-playlist-mini__thumbnail'>
                <img className='render-playlist-mini__thumbnail__img' src={img} alt={playlist.name} />
              </div>
              <div className='render-playlist-mini__info'>
                <p className='render-playlist-mini__info__name'>{playlist.name}</p>
                <p className='render-playlist-mini__info__tracks'>{t("musicpage_albumtracks")}: {playlist.tracks.length}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

const PopupAddPlaylistBComponent = ({ onClose }: any) => {

  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisual] = useState(false)
  const handleModal = () => {
    setIsModalVisual(true)
  }
  const { isAuthenticated } = useAuth0();
  const { theme } = useContext(ThemeContext)

  const notify = () => toast(t('player_component_popover_playlist'), {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      notify();
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div className='popupAddPlaylistBComponent'>
          <div className='popupAddPlaylistBComponent-container'>
            <button onClick={onClose} className='player-mobile-add-to-playlist__btn'><IoChevronBackOutline /></button>
            <div className="player-mobile-add-to-playlist">
              <div className="player-mobile-add-to-playlist__add" >
                <button onClick={handleModal}>
                  <IoAdd className="player-mobile-add-to-playlist__add__icon" />
                  <span className="player-mobile-add-to-playlist__add__text">{t("player_component_popover_add_playlist")}</span>
                </button>
              </div>

              <div className="player-mobile-add-to-playlist__results">
                <RenderPlaylistMini />
              </div>
            </div>
          </div>
          {isModalVisible && <ModalPlaylistMobile onClose={() => setIsModalVisual(false)} />}
        </div>
      ) : (
        <ToastContainer />
      )}
    </div>
  )
}

export default PopupAddPlaylistBComponent