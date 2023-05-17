import { useNavigate, useSearchParams } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { Artist } from "interfaces/music";
import RenderAlbum from "../renders/renderAlbum/RenderAlbum";
import './albumsBComponent.scss';
import { MdArrowBack } from 'react-icons/md'

export default function AlbumsBComponent({ albums }: any) {
  const [screenWidth] = useWindowSizeReport()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const albumsQuery = searchParams.get('albums');

  const filterAlbums = (albums: any) => albums.filter((album: any) => new RegExp(`.*${albumsQuery}.*`, 'i').test(album.name))

  const renderAlbums = () => (
    albumsQuery ? (
      filterAlbums(albums)
        .map((album: any) => <RenderAlbum key={album._id} album={album} />)
    ) : (
      albums.map((album: Artist) => <RenderAlbum key={album._id} album={album} />)
    )
  )

  return (
    <div className="albums-page-content">
      {(screenWidth < responsiveBreak) &&
        <button onClick={() => navigate(-1)} className="albums-page-content__mobile">
          <MdArrowBack size={27} />
        </button>
      }
      <h1>Album Page</h1>
      <div className='albums-page-content__grid'>
        {albums && renderAlbums()}
      </div>
    </div>
  )
}