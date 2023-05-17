import { useState, useContext, useEffect } from 'react';
import { getTrackByIdApi } from 'api/music/tracks';
import TrackListBComponent from "../../trackListBComponent/TrackListBComponent";
import { useTranslation } from "react-i18next";
import MyLibraryContext from "context/myLibrary/MyLibraryContext";
import { MdPause, MdPlayArrow } from "react-icons/md";
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import './libraryBComponentFavTracks.scss';

const LibraryBComponentFavTracks = () => {
  const { tracks } = useContext(MyLibraryContext)
  const { t } = useTranslation();
  const { trackData } = useContext(CurrentTrackContext);
  const [tracksOfFavTracks, setTracksOfFavTracks]: any = useState([]);

  useEffect(() => {
    let isMounted = true;
    setTracksOfFavTracks([])

    if (tracks.content) {
      Object.values(tracks.content).map((track: any) => {
        getTrackByIdApi(track._id.toString()).then((res: any) => {
          setTracksOfFavTracks((tracksOfFavTracks: any) => [
            ...tracksOfFavTracks,
            res.track,
          ]);
        })
      })
    }
    return () => { isMounted = false }
  }, [tracks.content])

  console.log(tracks.content);

  return (
    <div className='library-favTracks'>
      <div className='library-favTracks__head'>
        <h1>{t('library_favTracks_h1')}</h1>
        <button> {trackData.isPlaying ? <MdPause /> : <MdPlayArrow />} PLAY</button>
      </div>
      <span>
        <TrackListBComponent tracksData={tracksOfFavTracks} />
      </span>
    </div >
  )
}

export default LibraryBComponentFavTracks