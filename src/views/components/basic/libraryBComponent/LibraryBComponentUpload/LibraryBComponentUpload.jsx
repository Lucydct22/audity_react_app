import { useState, useReducer } from 'react';
import { message, Upload } from 'antd';
import './libraryBComponentUpload.scss';
import TrackListComponent from '../../trackListComponent/TrackListComponent'
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function LibraryBComponentUpload() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState([]);

  const handlePlayClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const props = {
    name: 'userUploadedAudio',
    action: 'http://localhost:4000/api/v1/track',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: (file) => {
      const isAudio = file.type.indexOf('audio') > -1;
      if (!isAudio) {
        message.error(`${file.name} is not a audio file`);
      }
      return isAudio || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      setAudioFile(info.fileList);
    },
  };
  console.log(audioFile.pop());

  return (
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
        <Upload {...props} className="library-upload__buttons--upload">
          {t('library_upload_btn')}
        </Upload>
      </div>
      <div>
        <TrackListComponent />
      </div>
    </div >
  );
}