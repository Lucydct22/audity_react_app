import { useNavigate } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import RenderPlaylist from '../renders/renderPlaylist/RenderPlaylist';
import './playlistsBComponent.scss';
import { MdArrowBack } from 'react-icons/md'

export default function PlaylistsBComponent({ playlists }: any) {
  const [screenWidth] = useWindowSizeReport()
  const navigate = useNavigate();

  return (
    <div className="playlist-page-content">
      {(screenWidth < responsiveBreak) &&
        <button onClick={() => navigate(-1)} className="playlist-page-content__mobile">
          <MdArrowBack size={27} />
        </button>}
      <h1>Playlist Page</h1>
      <div className='playlist-page-content__grid'>
        {playlists &&
          playlists.map((playlist: any) => <RenderPlaylist key={playlist._id} playlist={playlist} />)
        }
      </div>
    </div>
  )
}
