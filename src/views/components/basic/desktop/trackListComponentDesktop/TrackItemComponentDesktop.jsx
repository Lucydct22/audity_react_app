import "./TrackItemComponentDesktop.scss";
import { IoAddOutline } from "react-icons/io5";
import { AiFillHeart, AiOutlineDownload } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import { useTranslation } from "react-i18next";

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
      {id && name && artist && thumbnail && likes && time ? (
        <tr key={id} className="track-list-item">
          <td className="track-list-item__td-track">
            <img src={thumbnail} alt={name} />
            {name}
          </td>
          <td className="track-list-item__td-icon">
            <IoAddOutline className="track-list-item__td-icon-item" />
          </td>
          <td className="track-list-item__td-icon">
            <AiOutlineDownload className="track-list-item__td-icon-item" />
          </td>
          <td>{artist}</td>
          <td>{album}</td>
          <td>{time}</td>
          <td className="track-list-item__td-icon">
            <AiFillHeart className="track-list-item__td-icon-heart" />
            {likes}
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
