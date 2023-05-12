import { useContext, useEffect, useState } from 'react';
import CurrentTracklistContext from 'context/currentTracklist/CurrentTracklistContext';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import { useTranslation } from 'react-i18next';
import formatToSeconds from 'utils/tracks/formatToSeconds';
import ProgressBar from './progressBar/ProgressBar';
import { MdSkipPrevious, MdPause, MdPlayArrow, MdSkipNext } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TfiPlus } from "react-icons/tfi";
import { IoAddOutline, IoShuffleOutline, IoRepeatOutline, IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import './playerBComponentDesktop.scss'
import { Popover, Modal } from 'antd';
import ModalPlaylist from 'views/UI/ModalAntdPlaylistCreate/ModalAntdPlaylistCreate';

const PlayerBComponentDesktop = () => {
  const { t } = useTranslation();
  const [songLike, setSongLike] = useState(false);
  const {
    trackData,
    currentTrack,
    playCurrentTrack,
    pauseCurrentTrack,
    nextTrack,
    previousTrack,
    muteTrack,
    loopTrack,
  } = useContext(CurrentTrackContext);
  const { shuffle, shuffleTracklist } = useContext(CurrentTracklistContext);
  const [artists, setArtists] = useState('')
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const [openModal, setOpenModal] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const hideModal = () => {
    setOpenModal(false);
  };

  const confirm = () => {
    modal.confirm({
      centered: true,
      closable: true,
      icon: 0,
      width: 800,
      content: <ModalPlaylist />,
      okText: 'CREATE',
    });
  };

  useEffect(() => {
    let isMounted = true
    const artists = currentTrack.artists.map((artist) => artist.name).join(' & ');
    isMounted && setArtists(artists)
    return () => { isMounted = false }
  }, [])

  const popoverContent = (
    <div className="player-add-to-playlist">
      <div className="player-add-to-playlist__add" onClick={() => { confirm(); hide();}}>
        <TfiPlus size={26} />
        <span>{t("player_component_popover_add_playlist")}</span>
      </div>
      <div className="player-add-to-playlist__results">
        <p>Playlist</p>
        <p>Favorites</p>
        <p>Favorites</p>
        <p>Favorites</p>
        <p>Favorites</p>
        <p>Favorites</p>
      </div>
      <Modal title="Basic Modal" open={openModal} onOk={hideModal} onCancel={hideModal} />
      {contextHolder}
    </div>
  );

  return (
    <div className='page-player'>
      <div className='player-bottom'>

        <div className='player-bottom-controls'>
          <button onClick={previousTrack} className='page-player-bottom__btn'>
            <MdSkipPrevious />
          </button>
          <button
            onClick={trackData.isPlaying ? pauseCurrentTrack : playCurrentTrack}
            className='page-player-bottom__btn'
          >
            {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>
          <button onClick={nextTrack} className='page-player-bottom__btn'>
            <MdSkipNext />
          </button>
        </div>

        <div className='player-bottom-track'>
          {formatToSeconds(trackData.currentTime)}
          <div className='player-bottom-track__container'>
            <div className='player-bottom-track__container--heading'>
              <div className='player-bottom-track__container--heading__title'>
                {`${currentTrack.name} - ${artists}`}
              </div>
              <div className='player-bottom-track__container--heading__actions'>
                <Popover content={popoverContent} open={open} onOpenChange={handleOpenChange} trigger="click">
                  <button className='page-player-bottom__btn' >
                    <IoAddOutline />
                  </button>
                </Popover>
                <button className='page-player-bottom__btn' onClick={() => setSongLike(!songLike)}>
                  {songLike ? <AiFillHeart size='1.5rem' color='#ef5466' /> : <AiOutlineHeart />}
                </button>
              </div>
            </div>
            <ProgressBar />
          </div>
          {formatToSeconds(trackData.duration)}
        </div>

        <div className='player-bottom-options'>
          <button className='page-player-bottom__btn' onClick={shuffleTracklist}>
            {shuffle ? <IoShuffleOutline /> : <IoShuffleOutline color='#C1C1C1' />}
          </button>
          <button className='page-player-bottom__btn' onClick={loopTrack}>
            {trackData.hasLoop ? <IoRepeatOutline /> : <IoRepeatOutline color='#C1C1C1' />}
          </button>
          <button className='page-player-bottom__btn' onClick={muteTrack}>
            {trackData.isMuted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
          </button>
        </div>

      </div>
    </div>
  )
}

export default PlayerBComponentDesktop;
