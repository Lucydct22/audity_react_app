import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import { Artist } from "interfaces/music";
import RenderAlbum from "../musicPageComponent/albumsSlider/renderAlbum/RenderAlbum";
import './albumsBComponent.scss';
import { MdArrowBack } from 'react-icons/md'

export default function AlbumsBComponent({ albums }: any) {
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
    <div className="albums-page-content">
      {(screenWidth > responsiveBreak) ?
        null :
        <Link to={"/explore"} className="albums-page-content__mobile">
          <MdArrowBack size={27} />
          <span>Explore page</span>
        </Link>}
      <h1>Album Page</h1>
      <div className='albums-page-content__grid'>
        {albums.map((album: Artist) => {
          return <RenderAlbum key={album._id} album={album} />
        })}
      </div>
    </div>
  )
}