import { useTranslation } from 'react-i18next';
import './MusicPageComponent.scss'
import Language from '../../../../UI/language/Language';
import DailyListComponent from '../../../../UI/music/dailyListComponent';
import GenresComponent from '../../../../UI/music/genresComponent';
import ArtistComponent from '../../../../UI/music/artistComponent';
import AlbumComponent from '../../../../UI/music/albumComponents';

const MusicPageComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <Language />
      <DailyListComponent />
      <ArtistComponent />
      <AlbumComponent />
      <GenresComponent />

    </>
  )
}

export default MusicPageComponent;