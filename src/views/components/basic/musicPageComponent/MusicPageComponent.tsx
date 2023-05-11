import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import DailyListComponent from './dailyListsSlider';
import ArtistComponent from './artistsSlider';
import AlbumComponent from './albumsSlider';
import GenresComponent from './genresSlider';
import './musicPageComponent.scss'

const MusicPageComponent = () => {
  const [screenWidth] = useWindowSizeReport()

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