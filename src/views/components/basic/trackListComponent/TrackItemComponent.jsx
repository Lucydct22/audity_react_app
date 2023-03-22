import './trackListStyle.scss'; 
import { IoAddOutline } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";

const TrackItemComponent = ({ id, name, artist, thumbnail, likes, album, time }) => {

  return (
    <>
      <tr key={id} className="track-list-item">
        <td className='track-list-item__td-track'><img src={thumbnail} alt={name} />{name}</td>
        <td className='track-list-item__td-icon'><IoAddOutline className='track-list-item__td-icon-item'/></td>
        <td className='track-list-item__td-icon'><AiOutlineDownload className='track-list-item__td-icon-item'/></td>
        <td>{artist}</td>
        <td>{album}</td>
        <td>{time}</td>
        <td className='track-list-item__td-icon'><AiFillHeart className='track-list-item__td-icon-heart'/>{likes}</td>
      </tr>
    </>
  )
}

export default TrackItemComponent;