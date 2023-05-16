import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import RenderGenres from "../renders/genresRender/RenderGenres";
import './genresBComponent.scss';
import { MdArrowBack } from 'react-icons/md'

export default function GenresBComponent({ genres }: any) {

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
    <div className="genres-page-content">
      {(screenWidth > responsiveBreak) ?
        null :
        <Link to={"/explore"} className="genres-page-content__mobile">
          <MdArrowBack size={27} />
          <span>Explore page</span>
        </Link>}
      <h1>Genre Page</h1>
      <div className='genres-page-content__grid'>
        {genres &&
          genres.map((genre: any) => <RenderGenres key={genre._id} genre={genre} />)
        }
      </div>
    </div>
  )
} 