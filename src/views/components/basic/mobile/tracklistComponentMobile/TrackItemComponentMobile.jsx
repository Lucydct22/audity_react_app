import "./trackItemComponentMobile.scss";
import { useState, useRef } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { MdPlayArrow } from "react-icons/md";
import { useTranslation } from "react-i18next";
import TrackSideBarMobile from "./TrackSidebarMobile/TrackSideBarMobile";

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
    <>
      {id && name && artist && thumbnail && likes && album && time ? (
        <>
          <div key={id} className="track-list-item-mobile" ref={popperRef}>
            <div className="track-list-item-mobile-div">
              <img src={thumbnail} alt={name} />
              <div className="track-list-item-mobile-div__track">
                <span>{name}</span>
                <div className="track-list-item-mobile-div__track-album">
                  <span>{artist} - </span>
                  <span>{album}</span>
                </div>
              </div>
            </div>
            <div className="track-list-item-mobile__icons-mobile">
              <MdPlayArrow className="track-list-item-mobile__icons-mobile__td-icon-arrow" />
              <IoEllipsisVerticalSharp
                className="track-list-item-mobile__icons-mobile__td-icon-points"
                onClick={() => setPopperOpen(!popOpen)}
              />
            </div>
          </div>
          <TrackSideBarMobile
            popOpen={popOpen}
            likes={likes}
            time={time}
            id={id}
            thumbnail={thumbnail}
            name={name}
            artist={artist}
            album={album}
            onClose={handleClose}
          />
        </>
      ) : (
        <p>
          This playlist looks empty... Find some tracks to add to your playlist
        </p>
      )}
    </>
  );
};

export default TrackListMobileComponent;
