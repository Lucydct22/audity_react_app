import { Link } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { Artist } from "interfaces/music";
import RenderAlbum from "../renders/renderAlbum/RenderAlbum";
import './albumsBComponent.scss';
import { MdArrowBack } from 'react-icons/md'

export default function AlbumsBComponent({ albums }: any) {
  const [screenWidth] = useWindowSizeReport()

  return (
    <div className="albums-page-content">
      {(screenWidth < responsiveBreak) &&
        <Link to={"/explore"} className="albums-page-content__mobile">
          <MdArrowBack size={27} />
        </Link>
      }
      <h1>Album Page</h1>
      <div className='albums-page-content__grid'>
        {albums.map((album: Artist) => {
          return <RenderAlbum key={album._id} album={album} />
        })}
      </div>
    </div>
  )
}