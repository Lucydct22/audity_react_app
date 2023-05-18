import { useState, useEffect, useContext, useRef } from "react";
import { Link } from 'react-router-dom';
import { Popover, Modal, Slider, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import ModalPlaylist from 'views/UI/ModalAntdPlaylistCreate/ModalAntdPlaylistCreate';
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';
import "./TrackItemComponentDesktop.scss";
import SongPlaceholder from "assets/img/webp/music-placeholder-300.webp";
import { CiHeart } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import { TfiPlus } from "react-icons/tfi";
import { AiFillHeart, AiOutlineDownload } from "react-icons/ai";
import { MdPause, MdPlayArrow } from "react-icons/md";

const TrackListDesktopComponent = ({
  id,
  index,
  name,
  artist,
  thumbnail,
  likes,
  time,
  album,
  audioUrl,
  track,
}) => {
  const { trackData, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);
  const { playlists, tracks, postPlaylist, putTrackToPlaylist, likeDislikeTrack } = useContext(MyLibraryContext)
  const [songLike, setSongLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { isAuthenticated } = useAuth0();
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, contextHolderMessege] = message.useMessage();
  const { t } = useTranslation();
  const nameRef = useRef("");
  const descRef = useRef("");
  const key = 'updatable';

  const handleClick = () => {
    if (trackData.url !== audioUrl) {
      selectCurrentTrack(track);
    } else {
      trackData.isPlaying ? pauseCurrentTrack() : playCurrentTrack();
    }
  };

  function handlePutTrackToPlaylist(playlistId) {
    putTrackToPlaylist(playlistId, track._id);
    copyToClip();
    openMessage();
  }

  function handleModalConfirm() {
    if (nameRef.current.value == "" || descRef.current.value == "") {
      message.error("Sorry could not create Playlist. Both inputs are required")
    } else {
      postPlaylist(nameRef.current.value, descRef.current.value);
    }
  }

  async function copyToClip() {
    await navigator.clipboard.writeText(location.href);
  }

  const hidePopover = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
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
      content: <ModalPlaylist nameRef={nameRef} descRef={descRef} />,
      okText: 'CREATE',
      onOk: handleModalConfirm
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

  const popoverContent = isAuthenticated ? (
    <>
      <div className="track-item-component-add-to-playlist">
        <div className="track-item-component-add-to-playlist__add" onClick={() => { confirm(); hidePopover(); }}>
          <TfiPlus size={26} />
          <span>{t("player_component_popover_add_playlist")}</span>
        </div>
        <div className="track-item-component-add-to-playlist__results">
          {playlists.userContent &&
            playlists.userContent?.map((playlist) => (
              <div key={playlist._id}>
                {contextHolderMessege}
                <p onClick={() => handlePutTrackToPlaylist(playlist._id, playlist.name)}>
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
    <div className="track-item-component-add-to-playlist-without-login">{t('player_component_popover_playlist')}</div>
  );

  useEffect(() => {
    const haveLike = tracks.content.find((item) => item._id === track._id)
    haveLike === undefined ? (setSongLike(true)) : setSongLike(false)
  }, [track, tracks])

  return (
    <div className="track-list">
      {id && name && time &&
        <div className="track-list--item">
          <div className="track-list--item__track" onClick={handleClick}>
            <span className="track-list--item__track--index">{index + 1}</span>
            <span className="track-list--item__track--img">
              <img src={thumbnail ? thumbnail : SongPlaceholder} alt={name} />
              <div className="track-list--item__track--img__btn">
                <button>
                  {trackData.url === audioUrl && trackData.isPlaying ? (
                    <MdPause size={20} />
                  ) : (
                    <MdPlayArrow size={20} />
                  )}
                </button>
              </div>
            </span>
            <span className="track-list--item__track--name">{name}</span>
          </div>
          <div className="track-list--item__icons">
            <button onClick={() => likeDislikeTrack(track)} className="track-list--item__icons--heart">
              {!songLike ? <AiFillHeart color='#ef5466' size={25} /> : <CiHeart size={25} color="#a2a2ad" />}
              {likes}
            </button>
            {track.name &&
              <Popover content={popoverContent} open={open} onOpenChange={handleOpenChange} trigger="click">
                <button className="track-list-item__icons--library">
                  <IoAddOutline size={25} color="#a2a2ad" />
                </button>
              </Popover>
            }
            <Link to={track.audioUrl} target="_blank" className="track-list--item__icons--download">
              <AiOutlineDownload size={25} color="#a2a2ad" />
            </Link>
          </div>
          <span className="track-list--item__artist">
            {artist ? artist : "-"}
          </span>
          <span className="track-list--item__album">{album ? album : "-"}</span>
          <span className="track-list--item__time">{time}</span>
        </div>
      }
    </div>
  );
};

export default TrackListDesktopComponent;
