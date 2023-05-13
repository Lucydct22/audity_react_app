import './popupAddPlaylistBComponent.scss'
import { useTranslation } from 'react-i18next';
import { IoChevronBackOutline, IoAdd } from "react-icons/io5"
import { useState, useContext } from 'react';
import img from 'assets/img/albums/summer-playlist.png';
import ModalPlaylistMobile from 'views/UI/ModalAntdPlaylistCreate/ModalAntdPlaylistCreateMobile/ModalAntdPlaylistCreateMobile';
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';


function RenderPlaylistMini() {
  const { t } = useTranslation();
  const { playlists } = useContext(MyLibraryContext);

  return (
    <div className="render-playlist-mini-container">
      {playlists.userContent.map((playlist: { _id: string, name: string, totalTracks: number, cover: string }) => {
        return (
          <div className='render-playlist-mini' key={playlist._id}>
            <div className='render-playlist-mini__thumbnail'>
              <img className='render-playlist-mini__thumbnail__img' src={img} alt={playlist.name} />
            </div>
            <div className='render-playlist-mini__info'>
              <p className='render-playlist-mini__info__name'>{playlist.name}</p>
              <p className='render-playlist-mini__info__tracks'>{t("musicpage_albumtracks")}: {playlist.totalTracks}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const PopupAddPlaylistBComponent = ({ onClose }: any) => {

  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisual] = useState(false)
  const handleModal = () => {
    setIsModalVisual(true)
  }

  return (
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
  )
}

export default PopupAddPlaylistBComponent