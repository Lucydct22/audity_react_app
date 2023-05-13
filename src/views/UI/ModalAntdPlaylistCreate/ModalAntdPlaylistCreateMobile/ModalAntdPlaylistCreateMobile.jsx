import { useTranslation } from 'react-i18next';
import SongPlaceholder from 'assets/img/webp/music-placeholder-300.webp'
import { IoChevronBackOutline } from "react-icons/io5"
import './modalAntdPlaylistCreateMobile.scss'
import { useContext, useRef } from 'react';
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';

export default function ModalPlaylistMobile({ onClose }) {

  const { t } = useTranslation();
  const { postPlaylist } = useContext(MyLibraryContext)
  const nameRef = useRef("");
  const descRef = useRef("");

  function handleCreatePlaylist() {
    postPlaylist(nameRef.current.value, descRef.current.value);
    onClose();
  }
 
  return (
    <section className="modal-playlist-create-mobile">
      <div className="modal-playlist-create-mobile__header">
        <button onClick={onClose} className='modal-playlist-create-mobile__header__btn-close'><IoChevronBackOutline /></button>
        <h2 className='modal-playlist-create-mobile__header__text'>{t("library_create_playlist_text")}</h2>
      </div>

      <div className="modal-playlist-create-mobile__main">
        <img src={SongPlaceholder} alt="" />
        <div className="modal-playlist-create-mobile__main--content">
          <div className="modal-playlist-create-mobile__main--content__name-input">
            <label htmlFor="playlist-name">{t("library_modal_artist_label_name")}</label>
            <input ref={nameRef} name="name" id="playlist-name" type="text" placeholder={t("library_modal_artist_placeholder_name")} />
          </div>
          <div className="modal-playlist-create-mobile__main--content__desc-input">
            <label htmlFor="playlist-desc" >{t("library_modal_artist_label_desc")}</label>
            <textarea ref={descRef} name="desc" id="playlist-desc" type="text" rows="2" placeholder={t("library_modal_artist_placeholder_desc")} />
          </div>
        </div>
      </div>
      <button className="modal-playlist-create-mobile__footer-btn" onClick={handleCreatePlaylist}>Create</button>
    </section>
  )
} 