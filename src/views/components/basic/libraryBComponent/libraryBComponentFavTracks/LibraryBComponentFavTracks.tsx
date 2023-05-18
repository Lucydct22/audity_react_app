import { useState, useContext, useEffect } from 'react';
import { getTrackByIdApi } from 'api/music/tracks';
import TrackListBComponent from "../../trackListBComponent/TrackListBComponent";
import { useTranslation } from "react-i18next";
import MyLibraryContext from "context/myLibrary/MyLibraryContext";
import { MdPause, MdPlayArrow } from "react-icons/md";
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import './libraryBComponentFavTracks.scss';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'views/UI/spinner/Spinner';

const LibraryBComponentFavTracks = () => {
  const { trackData, selectCurrentTrack, playCurrentTrack, pauseCurrentTrack } =
    useContext(CurrentTrackContext);
  const { tracks }: any = useContext(MyLibraryContext)
  const { t } = useTranslation();
  const [tracksOfFavTracks, setTracksOfFavTracks]: any = useState([]);
  const {isLoading} = useAuth0()

  const handlePlayClick = () => {
    if (trackData.url !== tracks.content[0].audioUrl) {
      selectCurrentTrack(tracks.content[0]);
    } else {
      trackData.isPlaying ? pauseCurrentTrack() : playCurrentTrack()
    }
  };

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

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='library-favTracks'>
      <div className='library-favTracks__head'>
        <h1>{t('library_favTracks_h1')}</h1>
        <button>
          {trackData.isPlaying ? (
            <div onClick={handlePlayClick}>
              <MdPause size={20} />
              <span>{t("pausebutton")}</span>
            </div>
          ) : (
            <div onClick={handlePlayClick}>
              <MdPlayArrow size={20} />
              <span>{t("playbutton")}</span>
            </div>
          )}
        </button>
      </div>
      <span>
        <TrackListBComponent tracksData={tracksOfFavTracks} />
      </span>
    </div >
  )
}

export default LibraryBComponentFavTracks