import "./trackItemComponentMobile.scss";
import { useState, useRef } from "react";
import { RxDotsVertical } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { CiHeart } from "react-icons/ci";

const TrackListMobileComponent = ({
  id,
  name,
  artist,
  thumbnail,
  likes,
  album,
  time,
}) => {
  const { t } = useTranslation();

  const [popOpen, setPopperOpen] = useState(false);
  let popperRef = useRef();

  const handleClose = () => {
    setPopperOpen(false);
  };

  return (
    <div key={id} className="track-list-item-mobile" ref={popperRef}>
      <div className="track-list-item-mobile__content">
        <img src={thumbnail} alt={name} />
        <div className="track-list-item-mobile__content--text">
          <div>{name}</div>
          <span>{artist}</span>
        </div>
      </div>
      <div className="track-list-item-mobile__icons">
        <CiHeart className="track-list-item-mobile__icons--play" />
        <RxDotsVertical
          className="track-list-item-mobile__icons--dots"
          onClick={() => setPopperOpen(!popOpen)}
        />
      </div>
    </div>
  );
};

export default TrackListMobileComponent;
