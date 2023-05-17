import TrackListBComponent from "../../trackListBComponent/TrackListBComponent";
import { useTranslation } from "react-i18next";
import { MdPause, MdPlayArrow } from "react-icons/md";
import { useContext } from 'react';
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import './libraryBComponentFavTracks.scss';

const LibraryBComponentFavTracks = () => {
  const { t } = useTranslation();
  const { trackData } = useContext(CurrentTrackContext);

  return (
    <div className='library-favTracks'>
      <div>
        <h1>{t('library_favTracks_h1')}</h1>
        <button> {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />} PLAY</button>
      </div>
      <div>
        {/* <TrackListBComponent tracksData={trackData} /> */}
      </div>
    </div >
  )
}

export default LibraryBComponentFavTracks