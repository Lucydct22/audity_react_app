import { useState, useEffect } from 'react';
import { message } from 'antd';
import './libraryBComponentUpload.scss';
import UserSongUploaderModal from './UserSongUploaderModal/UserSongUploaderModal';
import TrackListBComponent from '../../trackListBComponent/TrackListBComponent';
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function LibraryBComponentUpload() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [audio, setAudio] = useState({});
  const [uploadedAudio, setUploadedAudio] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const handlePlayClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const addFile = (e) => {
    if (e.target.files[0].type.match('audio.*')) {
      setAudio(e.target.files[0]);
      setIsOpened(true)
    } else {
      error(`${e.target.files[0].name} is not a audio file`);
    }
  };

  useEffect(() => {
    console.log(uploadedAudio);

  }, [uploadedAudio])

  const error = (e) => {
    messageApi.open({
      type: 'error',
      content: e,
    });
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
          <label htmlFor="upload-input" className="library-upload__buttons--upload">{t('library_upload_btn')}</label>
          <input type="file" id="upload-input" onInput={(e) => addFile(e)} value='' hidden />
        </div>
        <div>
          {/* <TrackListBComponent tracksData={tracksData} /> */}
        </div>
      </div>
      <UserSongUploaderModal
        audio={audio}
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
        setUploadedAudio={setUploadedAudio}
      />
      {contextHolder}
    </>
  );
}
