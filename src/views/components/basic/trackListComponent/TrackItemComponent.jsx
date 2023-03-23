import './trackListStyle.scss';
import { IoAddOutline } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { responsiveBreak } from "../../../../utils/componentsConstants";
import useWindowSizeReport from "../../../../hooks/useWindowSizeReport";
import { IoEllipsisVerticalSharp } from "react-icons/io5";


const TrackItemComponent = ({ id, name, artist, thumbnail, likes, album, time }) => {

  const windowWidth = useWindowSizeReport()

  return (
    <>
      {responsiveBreak < windowWidth ? (
        <tr key={id} className="track-list-item">
          <td className='track-list-item__td-track'><img src={thumbnail} alt={name} />{name}</td>
          <td className='track-list-item__td-icon'><IoAddOutline className='track-list-item__td-icon-item' /></td>
          <td className='track-list-item__td-icon'><AiOutlineDownload className='track-list-item__td-icon-item' /></td>
          <td>{artist}</td>
          <td>{album}</td>
          <td>{time}</td>
          <td className='track-list-item__td-icon'><AiFillHeart className='track-list-item__td-icon-heart' />{likes}</td>
        </tr>
      ) : (
        <div key={id} className="track-list-item-mobile">
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
            <AiFillHeart className='track-list-item-mobile__icons-mobile__td-icon-heart' />
            <IoEllipsisVerticalSharp className='track-list-item-mobile__icons-mobile__td-icon-points'/>
          </div>
        </div>
      )
      }

    </>
  )
}

export default TrackItemComponent;