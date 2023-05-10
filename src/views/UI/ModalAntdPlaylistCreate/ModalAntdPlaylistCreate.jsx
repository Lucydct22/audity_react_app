import { useTranslation } from 'react-i18next';
import SongPlaceholder from 'assets/img/webp/music-placeholder-300.webp'
import './modalAntdPlaylistCreate.scss'

export default function ModalPlaylist() {
  const { t } = useTranslation();

  return (
    <section className="modal-playlist-create">
      <h2>{t("library_create_playlist_text")}</h2>
      <div className="modal-playlist-create__main">
        <img src={SongPlaceholder} alt="" />
        <div className="modal-playlist-create__main--content">
          <div className="modal-playlist-create__main--content__name-input">
            <label htmlFor="playlist-name">{t("library_modal_artist_label_name")}</label>
            <input name="name" id="playlist-name" type="text" placeholder={t("library_modal_artist_placeholder_name")} />
          </div>
          <div className="modal-playlist-create__main--content__desc-input">
            <label htmlFor="playlist-desc" >{t("library_modal_artist_label_desc")}</label>
            <textarea name="desc" id="playlist-desc" type="text" rows="2" placeholder={t("library_modal_artist_placeholder_desc")} />
          </div>
        </div>
      </div>
    </section>
  )
}