import "./TrackItemComponentDesktop.scss";
import { IoAddOutline } from "react-icons/io5";
import { AiFillHeart, AiOutlineDownload } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import SongPlaceholder from 'assets/img/webp/music-placeholder-300.webp'

const TrackListDesktopComponent = ({
  id,
  name,
  artist,
  thumbnail,
  likes,
  time,
  album
}) => {
  const { t } = useTranslation();

  return (
    <>
      {id && name && time ? (
        <tr key={id} className="track-list-item">
          <td className="track-list-item__td-track">
            <img src={thumbnail ? thumbnail : SongPlaceholder} alt={name} />
            {name}
          </td>
          <td className="track-list-item__td-icon">
            <IoAddOutline className="track-list-item__td-icon-item" />
          </td>
          <td className="track-list-item__td-icon">
            <AiOutlineDownload className="track-list-item__td-icon-item" />
          </td>
          <td>{artist ? artist : "-"}</td>
          <td>{album ? album : "-"}</td>
          <td>{time}</td>
          <td className="track-list-item__td-icon">
            <AiFillHeart className="track-list-item__td-icon-heart" />
            {likes ? likes : "0"}
          </td>
          <td className="track-list-item__td-icon">
            <SlOptionsVertical className="track-list-item__td-icon-options" />
          </td>
        </tr>
      ) : (
        <p>
          This playlist looks empty... Find some tracks to add to your playlist
        </p>
      )}
    </>
  );
};

export default TrackListDesktopComponent;
