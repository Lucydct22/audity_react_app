import { useState, useEffect } from "react";
import { responsiveBreak } from "utils/componentsConstants";
import DailyListComponent from './dailyListsSlider';
import ArtistComponent from './artistsSlider';
import AlbumComponent from './albumsSlider';
import GenresComponent from './genresSlider';
import './musicPageComponent.scss'

const MusicPageComponent = () => {
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
    <section className="music-page">
      {(screenWidth > responsiveBreak) ? null : <h1>Music</h1>}
      <GenresComponent />
      <ArtistComponent />
      <DailyListComponent />
      <AlbumComponent />
    </section>
  )
}

export default MusicPageComponent;