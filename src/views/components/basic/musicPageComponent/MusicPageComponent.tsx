import DailyListComponent from './dailyListsSlider';
import ArtistComponent from './artistsSlider';
import AlbumComponent from './albumsSlider';
import GenresComponent from './genresSlider';
import './musicPageComponent.scss'

const MusicPageComponent = () => {

  return (
    <section className="music-page">
      <GenresComponent />
      <ArtistComponent />
      <DailyListComponent />
      <AlbumComponent />
    </section>
  )
}

export default MusicPageComponent;