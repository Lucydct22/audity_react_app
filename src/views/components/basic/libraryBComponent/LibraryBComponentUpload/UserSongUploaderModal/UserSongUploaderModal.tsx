import { useState, useEffect, useRef, useContext } from 'react'
import { useTranslation } from "react-i18next";
import SongPlaceholder from 'assets/img/webp/music-placeholder-300.webp'
import './userSongUploaderModal.scss'
import { VscChromeClose } from 'react-icons/vsc'
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';

const UserSongUploaderModal = ({ audio, isOpened, onClose, setUploadedAudio }: any) => {
  const { postPrivateTrack } = useContext(MyLibraryContext)
  const { t } = useTranslation();
  const [songData, setSongData] = useState({
    audio: '',
    name: '',
    artists: ''
  });
  const ref: any = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      setTimeout(() => {
        ref.current?.close();
        document.body.classList.remove("modal-open");
      }, 400);
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    postPrivateTrack(songData)
    setUploadedAudio(songData)
    setSongData({ audio: '', name: '', artists: '' })
    onClose();
  };

  const preventAutoClose = (e: any) => e.stopPropagation();

  useEffect(() => {
    let isMounted = true
    if (isMounted && audio && audio.name) {
      setSongData({ audio: audio, name: audio.name, artists: '' });
    }
    return () => { isMounted = false }
  }, [audio])

  return (
    <dialog ref={ref} onCancel={onClose} onClick={onClose} className={isOpened ? "modal-upload-song modal-song-open" : "modal-upload-song modal-song-close"}>
      <div onClick={preventAutoClose} className="modal-upload-song--content">
        <h2>{t("library_upload_modal_title")}</h2>
        <button onClick={onClose} className="modal-upload-song--content__close"><VscChromeClose /></button>
        <div className="modal-upload-song--content__main">
          <img src={SongPlaceholder} alt="" />
          <div className="modal-upload-song--content__main--content">
            <div className="modal-upload-song--content__main--content__name-input">
              <label htmlFor="song-name">{t("library_upload_modal_label_name")}</label>
              <input
                name="name"
                id="song-name"
                type="text"
                placeholder={t("library_upload_modal_placeholder_name") || ''}
                value={songData.name}
                onChange={e => setSongData({ ...songData, name: e.target.value })}
              />
            </div>
            <div className="modal-upload-song--content__main--content__artist-input">
              <label htmlFor="song-artist">{t("library_upload_modal_label_artist")}</label>
              <input
                name="artist"
                id="song-artist"
                type="text"
                placeholder={t("library_upload_modal_placeholder_artist") || ''}
                value={songData.artists}
                onChange={e => setSongData({ ...songData, artists: e.target.value })}
              />
            </div>
          </div>
        </div>
        <button onClick={proceedAndClose} className="modal-upload-song--content__save">Save</button>
      </div>
    </dialog>
  )
}

export default UserSongUploaderModal