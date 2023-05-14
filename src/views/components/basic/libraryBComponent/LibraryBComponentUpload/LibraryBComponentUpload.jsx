import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import './libraryBComponentUpload.scss';
import TrackListComponent from '../../trackListComponent/TrackListComponent'
import SongPlaceholder from 'assets/img/webp/music-placeholder-300.webp'
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function LibraryBComponentUpload() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [songData, setSongData] = useState({});
  const [audio, setAudio] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      console.log("Data deleted");
      setSongData({})
      setAudio()
    }
  }, [isModalOpen])

  const handleClick = () => {
    // songData.audio.play();
    console.log(songData);
  };

  const uploadSong = () => {
    console.log(songData);
    // onUpload();
  };

  useEffect(() => {
    setSongData({ ...songData, audio: audio });
  }, [audio])


  const addFile = (e) => {
    if (e.target.files[0]) {
      setAudio(URL.createObjectURL(e.target.files[0]));
    }
  };


  return (
    <>
      <div className='library-upload'>
        <h1>{t('library_upload_h1')}</h1>
        <div className="library-upload__buttons">
          <button className="library-upload__buttons--play" onClick={handlePlayClick}>
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
          <button className="library-upload__buttons--upload" onClick={showModal}>
            {t('library_upload_btn')}
          </button>
        </div>
        <div>
          <button onClick={handleClick}>
            Start uploaded song
          </button>
        </div>
      </div>
      <Modal title="Upload Songs" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
        <section className="modal-upload-song">
          <h2>{t("library_upload_song_title")}</h2>
          <div className="modal-upload-song__main">
            <img src={SongPlaceholder} alt="" />
            <div className="modal-upload-song__main--content">
              <div className="modal-upload-song__main--content__name-input">
                <label htmlFor="song-name">{t("library_modal_artist_label_name")}</label>
                <input
                  name="name"
                  id="song-name"
                  type="text"
                  placeholder={t("library_modal_artist_placeholder_name") || ''}
                  value={songData.name}
                  onChange={e => setSongData({ ...songData, name: e.target.value })}
                />
              </div>
              <div className="modal-upload-song__main--content__name-input">
                <label htmlFor="song-artist">{t("library_modal_artist_label_name")}</label>
                <input
                  name="artist"
                  id="song-artist"
                  type="text"
                  placeholder={t("library_modal_artist_placeholder_name") || ''}
                  value={songData.artist}
                  onChange={e => setSongData({ ...songData, artist: e.target.value })}
                />
              </div>
              <input type="file" onChange={(e) => addFile(e)} />
              <button onClick={uploadSong}>Upload</button>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
}

