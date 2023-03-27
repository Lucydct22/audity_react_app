// import { useTranslation } from 'react-i18next';
import './MusicPageComponent.scss'
import Language from '../../../UI/language/Language';
import DailyListComponent from './dailyListsSlider';
import ArtistComponent from './artistsSlider';
import AlbumComponent from './albumsSlider';
import GenresComponent from './genresSlider';

const MusicPageComponent = () => {
  // const { t } = useTranslation();

  return (
    <>
      <GenresComponent />
      <ArtistComponent />
      <DailyListComponent />
      <AlbumComponent />
      <Language />
    </>
  )
}

export default MusicPageComponent;