import { useTranslation } from 'react-i18next';
import './MusicPageComponent.scss'
import Language from '../../../UI/language/Language';
import DailyListComponent from './dailyListComponent';
import ArtistComponent from './artistComponent';
import AlbumComponent from './albumComponents';
import GenresComponent from './genresComponent';

const MusicPageComponent = () => {
  const { t } = useTranslation();

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