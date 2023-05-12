import TrackListComponent from '../../trackListComponent/TrackListComponent'
import { useTranslation } from "react-i18next";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useContext, lazy } from 'react';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import './libraryBComponentFavTracks.scss';
//import { responsiveBreak } from "utils/componentsConstants";
//import useWindowSizeReport from "hooks/useWindowSizeReport";


const LibraryBComponentFavTracks = () => {

  const { t } = useTranslation();

  const {
    trackData,
  } = useContext(CurrentTrackContext);

  return (
    <div className='library-favtracks'>
      <div className='library-favtracks__content'>
        <h1>{ } {t('library_favtracks_h1')}</h1>
        <button className='library-favtracks__content--btn'> {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />} PLAY</button>
      </div>
      <div className='library-favtracks__comp'>
        <TrackListComponent />
      </div>
    </div >
  )
}

export default LibraryBComponentFavTracks