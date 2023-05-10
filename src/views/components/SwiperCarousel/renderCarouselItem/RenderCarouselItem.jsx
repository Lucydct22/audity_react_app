import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import './renderCarouselItem.scss';
import GrayPerson from 'assets/img/webp/profile-placeholder-160x160.webp'
import SongPlaceholder from 'assets/img/webp/music-placeholder-300.webp'
import { TfiPlus } from "react-icons/tfi";
import { Modal, Space } from 'antd';

export default function RenderCarouselItem({ list, type }) {
  const { t } = useTranslation();
  const { _id, cover, name, imageUrl } = list;
  const [open, setOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const hideModal = () => {
    setOpen(false);
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

  if (_id === "AddOnePlaylist") {
    return (
      <>
        <Link to={"#"} className='render-carousel-add-one-playlist'>
          <div className='render-carousel-add-one-playlist__background' onClick={confirm}>
            <TfiPlus size='35px' color='#72727d' />
          </div>
          <p className='render-carousel-add-one-playlist__details'>{t("library_create_playlist_text")}</p>
        </Link>
        <Space>
          <Modal title="Basic Modal" open={open} onOk={hideModal} onCancel={hideModal} />
        </Space>
        {contextHolder}
      </>
    )
  }

  if (_id === "AddOneArtist") {
    return (
      <Link to={"/artists"} className='render-carousel-add-one-artist'>
        <div className='render-carousel-add-one-artist__background'>
          <TfiPlus size='35px' color='#72727d' />
        </div>
        <p className='render-carousel-add-one-artist__details'>{t("library_create_artist_text")}</p>
      </Link>
    )
  }

  return (
    <Link to={`/${type}/${_id}`} className={type !== "artists" ? 'render-carousel-item' : 'render-carousel-item render-carousel-itemArtist'}>
      <div className='render-carousel-item__thumbnail'>
        <img
          src={cover ? cover : imageUrl ? imageUrl : GrayPerson}
          alt="IMG"
          className={type !== "artists" ? 'render-carousel-item__thumbnail--img' : 'render-carousel-item__thumbnail--imgArtist'} />
        <div className={type !== "artists" ? 'render-carousel-item__thumbnail--btn' : 'render-carousel-item__thumbnail--btnArtist'}>
          {type !== "artists" ?
            <div className='render-carousel-item__thumbnail--btn__play'>
              <FaPlay size='14px' color='#191919' />
            </div>
            : null}
          <div className='render-carousel-item__thumbnail--btn__like'>
            <AiFillHeart size='14px' color='#ca2a36' />
          </div>
        </div>
      </div>
      <p className={type !== "artists" ? 'render-carousel-item__description' : 'render-carousel-item__description render-carousel-item__descriptionArtist'}>{name}</p>
      <p className={type !== "artists" ? 'render-carousel-item__details' : 'display-none'}>
        30 {t("musicpage_albumtracks")} - 4,165 fans
      </p>
    </Link>
  )
}


function ModalPlaylist() {
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
