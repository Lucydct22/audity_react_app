import './MusicPageComponent.scss'
import DailyListComponent from './dailyListsSlider';
import ArtistComponent from './artistsSlider';
import AlbumComponent from './albumsSlider';
import GenresComponent from './genresSlider';

const MusicPageComponent = () => {

  return (
    <>
      <GenresComponent />
      <ArtistComponent />
      <DailyListComponent />
      <AlbumComponent />
    </>
  )
}

export default MusicPageComponent;