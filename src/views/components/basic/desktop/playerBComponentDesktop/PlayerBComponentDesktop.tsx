import { useContext, useEffect, useState, useRef } from 'react';
import { message } from 'antd';
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
import { Popover, Modal, Slider } from 'antd';
import ModalPlaylist from 'views/UI/ModalAntdPlaylistCreate/ModalAntdPlaylistCreate';
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';
import { useAuth0 } from '@auth0/auth0-react';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from 'context/theme/ThemeContext';


const PlayerBComponentDesktop = () => {
  const { t } = useTranslation();
  const [songLike, setSongLike] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { shuffle, shuffleTracklist } = useContext(CurrentTracklistContext);
  const [artists, setArtists] = useState('')
  const { playlists, tracks, postPlaylist, putTrackToPlaylist, likeDislikeTrack } = useContext(MyLibraryContext)
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const nameRef: any = useRef("");
  const descRef: any = useRef("");
  const { theme } = useContext(ThemeContext)
  const [messageApi, contextHolderMessege] = message.useMessage();
  const key = 'updatable';
  const {
    trackData,
    currentTrack,
    playCurrentTrack,
    pauseCurrentTrack,
    nextTrack,
    previousTrack,
    muteTrack,
    loopTrack,
    updateVolume
  } = useContext(CurrentTrackContext);

  const hidePopover = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  function handleClick() {
    if (nameRef.current.value == "" || descRef.current.value == "") {
      message.error("Sorry could not create Playlist. Both inputs are required")
    } else {
      postPlaylist(nameRef.current.value, descRef.current.value);
    }
  }

  const hideModal = () => {
    setOpenModal(false);
  };

  const confirm = () => {
    modal.confirm({
      centered: true,
      closable: true,
      icon: 0,
      width: 800,
      content: <ModalPlaylist nameRef={nameRef} descRef={descRef} />,
      okText: 'CREATE',
      onOk: handleClick
    });
  };

  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Added to Playlist!',
        duration: 3,
      });
    }, 1000);
  };

  async function copyToClip() {
    await navigator.clipboard.writeText(location.href);
  }

  useEffect(() => {
    let isMounted = true
    const artists = currentTrack.artists.map((artist) => artist.name).join(' & ');
    isMounted && setArtists(artists)
    return () => { isMounted = false }
  }, [currentTrack])

  useEffect(() => {
    const haveLike = tracks.content.find((item: any) => item._id === currentTrack._id)
    haveLike === undefined ? setSongLike(true) : setSongLike(false)
  }, [currentTrack, tracks])


  function handlePutTrackToPlaylist(playlistId: string, playlistName: string) {
    putTrackToPlaylist(playlistId, currentTrack._id);
    copyToClip(); 
    openMessage();
  }

  const popoverContent = isAuthenticated ? (
    <>
      <div className="player-add-to-playlist">
        <div className="player-add-to-playlist__add" onClick={() => { confirm(); hidePopover(); }}>
          <TfiPlus size={26} />
          <span>{t("player_component_popover_add_playlist")}</span>
        </div>
        <div className="player-add-to-playlist__results">
          {playlists.userContent &&
            playlists.userContent?.map((playlist: any) => (
              <div key={playlist._id}>
                {contextHolderMessege}
                <p onClick={() => handlePutTrackToPlaylist(playlist._id, playlist.name) }>
                  {playlist.name}
                </p>
              </div>
            ))
          }
        </div>
        <Modal title="Basic Modal" open={openModal} onOk={hideModal} onCancel={hideModal} />
        {contextHolder}
      </div>
    </>
  ) : (
    <div className="player-add-to-playlist-sinlogin">{t('player_component_popover_playlist')}</div>
  );

  const volumeSlider = (
    <div style={{ display: 'inline-block', height: 150, padding: '10px 2px' }}>
      <Slider onChange={(e) => updateVolume(e)} vertical defaultValue={30} />
    </div>
  )

  return (
    <div className='page-player'>
      <div className='player-bottom'>
        <div className='player-bottom-controls'>
          <button onClick={previousTrack} className='page-player-bottom__btn'>
            <MdSkipPrevious />
          </button>
          <button
            onClick={trackData.isPlaying ? pauseCurrentTrack : playCurrentTrack}
            className='page-player-bottom__btn'>
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
                <button className='page-player-bottom__btn' onClick={() => likeDislikeTrack(currentTrack)}>
                  {!songLike ? <AiFillHeart size='1.5rem' color='#ef5466' /> : <AiOutlineHeart />}
                </button>
              </div>
            </div>
            <ProgressBar />
          </div>
          {formatToSeconds(trackData.duration)}
        </div>

        <div className='player-bottom-options'>
          <button className='page-player-bottom__btn' onClick={shuffleTracklist}>
            {shuffle ? <IoShuffleOutline color='#ef5466' /> : <IoShuffleOutline />}
          </button>
          <button className='page-player-bottom__btn' onClick={loopTrack}>
            {trackData.hasLoop ? <IoRepeatOutline color='#ef5466' /> : <IoRepeatOutline />}
          </button>
          <button className='page-player-bottom__btn'>
            <Popover content={volumeSlider} placement="top" trigger="hover">
              {trackData.isMuted ? <IoVolumeMuteOutline onClick={muteTrack} /> : <IoVolumeHighOutline onClick={muteTrack} />}
            </Popover>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayerBComponentDesktop;
