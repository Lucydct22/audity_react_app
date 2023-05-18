import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import './renderLibraryItem.scss';
import '../../../../UI/ModalAntdPlaylistCreate/modalAntdPlaylistCreate.scss'
import GrayPerson from 'assets/img/webp/profile-placeholder-160x160.webp'
import { TfiPlus } from "react-icons/tfi";
import { Modal } from 'antd';
import ModalPlaylist from 'views/UI/ModalAntdPlaylistCreate/ModalAntdPlaylistCreate';
import RenderAlbum from 'views/components/basic/renders/renderAlbum/RenderAlbum';
import RenderArtist from 'views/components/basic/renders/renderArtist/RenderArtist';
import RenderPlaylist from 'views/components/basic/renders/renderPlaylist/RenderPlaylist';
import MyLibraryContext from 'context/myLibrary/MyLibraryContext';

export default function RenderLibraryItem({ list, type }) {
  const { postPlaylist } = useContext(MyLibraryContext)
  const { t } = useTranslation();
  const { _id } = list;
  const [open, setOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const nameRef = useRef("");
  const descRef = useRef("");

  const hideModal = () => {
    setOpen(false);
  };

  function handleClick() {
    if (nameRef.current.value == "" || descRef.current.value == "") {
      message.error("Sorry could not create Playlist. Both inputs are required")
    } else {
      postPlaylist(nameRef.current.value, descRef.current.value);
    }
  }

  const confirm = () => {
    modal.confirm({
      centered: true,
      closable: true,
      icon: 0,
      width: 800,
      content: (
        <ModalPlaylist nameRef={nameRef} descRef={descRef} />
      ),
      okText: 'CREATE',
      onOk: handleClick
    });
  };

  if (_id === "AddOnePlaylist") {
    return (
      <>
        <Link to={"#"} className='render-carousel-library-add-one-playlist'>
          <div className='render-carousel-library-add-one-playlist__background' onClick={confirm}>
            <TfiPlus size='35px' color='#72727d' />
          </div>
          <p className='render-carousel-library-add-one-playlist__details'>{t("library_create_playlist_text")}</p>
        </Link>
        <Modal title="Basic Modal" open={open} onOk={hideModal} onCancel={hideModal} />
        {contextHolder}
      </>
    )
  }

  if (_id === "AddOneArtist") {
    return (
      <Link to={"/artists"} className='render-carousel-library-add-one-artist'>
        <div className='render-carousel-library-add-one-artist__background'>
          <TfiPlus size='35px' color='#72727d' />
        </div>
        <p className='render-carousel-library-add-one-artist__details'>{t("library_create_artist_text")}</p>
      </Link>
    )
  }

  if (type === "playlists") {
    return <RenderPlaylist playlist={list} />
  }

  if (type === "albums") {
    return <RenderAlbum album={list} />
  }

  if (type === "artists") {
    return <RenderArtist artist={list} />
  }

  return (
    <div className='render-carousel-library-item'>
      <div className='render-carousel-library-item__thumbnail'>
        <img
          src={GrayPerson}
          alt="404 Category not found"
          className='render-carousel-library-item__thumbnail--img' />
      </div>
      <p className='render-carousel-library-item__description'>404 Category not found</p>
    </div>
  )
}

