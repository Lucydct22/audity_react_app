import './popupAddPlaylistBComponent.scss'
import { useTranslation } from 'react-i18next';
import { IoChevronBackOutline, IoAdd } from "react-icons/io5"
import { getPlaylistByUserApi } from 'api/music/playlists';
import { Playlist } from 'interfaces/music';
import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserContext from 'context/user/UserContext';
import img from 'assets/img/albums/summer-playlist.png';
import ModalPlaylistMobile from 'views/UI/ModalAntdPlaylistCreate/ModalAntdPlaylistCreateMobile/ModalAntdPlaylistCreateMobile';


function RenderPlaylistMini({ playlist }: any) {
  const { t } = useTranslation();
  const { name, cover, totalTracks } = playlist;

  return (
    <div className='render-playlist-mini'>
      <div className='render-playlist-mini__thumbnail'>
        <img className='render-playlist-mini__thumbnail__img' src={img} alt={name} />
      </div>
      <div className='render-playlist-mini__info'>
        <p className='render-playlist-mini__info__name'>{name}</p>
        <p className='render-playlist-mini__info__tracks'>{t("musicpage_albumtracks")}: {totalTracks}</p>
      </div>
    </div>
  )
}


const PopupAddPlaylistBComponent = ({ onClose }: any) => {

  const { t } = useTranslation();
  const { dbUser } = useContext(UserContext)
  const { getAccessTokenSilently } = useAuth0()
  const [playlists, setPlaylists] = useState<Playlist[] | null>([])

const[isModalVisible, setIsModalVisual] = useState(false)

const handleModal = () => {
  setIsModalVisual(true)
}

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (dbUser._id) {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);

        const data = await getPlaylistByUserApi(dbUser._id, accessToken);
        if (isMounted && data) {
          setPlaylists(data.content);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

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
            {playlists &&
              playlists.map((playlist: Playlist) => (
                <RenderPlaylistMini key={playlist._id} playlist={playlist} />
              ))}
          </div>
        </div>
      </div>
    {isModalVisible && <ModalPlaylistMobile onClose={()=> setIsModalVisual(false)}/>}   
    </div>  
  )
}

export default PopupAddPlaylistBComponent