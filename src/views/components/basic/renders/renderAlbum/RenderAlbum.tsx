import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaPause } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import './renderAlbum.scss';
import { MdPause, MdPlayArrow } from "react-icons/md";
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import CurrentTracklistContext from 'context/currentTracklist/CurrentTracklistContext';

export default function RenderAlbum({ album }: any) {
  const [totalFans, setTotalFans] = useState("")
  const { t } = useTranslation();
  const { _id, name, imageUrl } = album;
  const { listId, selectAlbum } = useContext(CurrentTracklistContext);
  const { currentTrack, selectCurrentTrack, pauseCurrentTrack } = useContext(CurrentTrackContext);
  
  const handlePlayClick = () => {
    selectAlbum(album._id);
    selectCurrentTrack(album.tracks[0]);
  };

  useEffect(() => {
    const fans = Math.floor(Math.random() * (980000 - 1340 + 1)) + 1340;
    setTotalFans(fans.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."))
  }, [])

  return (
    <div className='render-album'>
      <div className='render-album__thumbnail'>
        <img src={imageUrl} alt="IMG" />
        <div className='render-album__thumbnail--btn'>
          <div className='render-album__thumbnail--btn__play'>
            <FaPlay onClick={handlePlayClick} size='14px' color='#191919' />
          </div>
          <div className='render-album__thumbnail--btn__like'>
            <AiOutlineHeart size='14px' color='#191919' />
          </div>
        </div>
      </div>
      <p className='render-album__description'>{name}</p>
      <p className='render-album__details'>
        30 {t("musicpage_albumtracks")} - {totalFans} fans
      </p>
    </div>
  )
}
