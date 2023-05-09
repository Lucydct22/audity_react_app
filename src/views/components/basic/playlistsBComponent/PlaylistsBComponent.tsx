import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import RenderPlaylist from '../musicPageComponent/dailyListsSlider/renderPlaylist/RenderPlaylist';
import './playlistsBComponent.scss';
import { MdArrowBack } from 'react-icons/md'

export default function PlaylistsBComponent({ playlists }: any) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", changeWidth)

    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  })

  return (
    <div className="playlist-page-content">
      {(screenWidth > responsiveBreak) ?
        null :
        <Link to={"/explore"} className="playlist-page-content__mobile">
          <MdArrowBack size={27} />
          <span>Explore page</span>
        </Link>}
      <h1>Playlist Page</h1>
      <div className='playlist-page-content__grid'>
        {playlists &&
          playlists.map((playlist: any) => <RenderPlaylist key={playlist._id} playlist={playlist} />)
        }
      </div>
    </div>
  )
}
