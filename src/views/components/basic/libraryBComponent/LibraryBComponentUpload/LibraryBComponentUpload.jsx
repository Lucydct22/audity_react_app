import { useState } from 'react';
import { Modal } from 'antd';
import './libraryBComponentUpload.scss';
import TrackListComponent from '../../trackListComponent/TrackListComponent'
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function LibraryBComponentUpload() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [openModal, setOpenModal] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const confirm = () => {
    modal.confirm({
      centered: true,
      closable: true,
      icon: 0,
      width: 800,
      content: "Hello There",
      okText: 'CREATE',
      onOk: handleClick
    });
  };

  function handleClick() {
    console.log("nice");
  }

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
          <button className="library-upload__buttons--upload" onClick={confirm}>
            {t('library_upload_btn')}
          </button>
        </div>
        <div>
          <TrackListComponent />
        </div>
      </div>
      <Modal title="Basic Modal" open={openModal} onOk={hideModal} onCancel={hideModal} />
      {contextHolder}
    </>
  );
}