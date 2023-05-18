import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistByIdApi } from 'api/music/playlists';
import { getTrackByIdApi } from 'api/music/tracks';
import PlaylistBComponent from 'views/components/basic/playlistBComponent/PlaylistBComponent';
import TrackListBComponent from 'views/components/basic/trackListBComponent/TrackListBComponent';
import HelmetSEO from 'views/utils/HelmetSEO';
import './playlistPage.scss';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'views/UI/spinner/Spinner';

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist]: any = useState(undefined);
  const [tracksOfPlaylist, setTracksOfPlaylist]: any = useState([]);
  const {isLoading} = useAuth0()

  useEffect(() => {
    let isMounted = true;
    playlistId && getPlaylistByIdApi(playlistId.toString()).then((res: any) => {
      isMounted && res && setPlaylist(res.playlist);
    })
    return () => { isMounted = false }
  }, [playlistId])

  useEffect(() => {
    let isMounted = true;
    if (playlist) {
      playlist.tracks.map((track: any) => {
        getTrackByIdApi(track._id.toString()).then((res: any) => {
          setTracksOfPlaylist((tracksOfPlaylist: any) => [
            ...tracksOfPlaylist,
            res.track,
          ]);
        })
      })
    }
    return () => { isMounted = false }
  }, [playlist])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <HelmetSEO
      title={`Artist | ${playlist?.name}`}
      description='Audity Artist Page'
    >
      <div className='playlist-layout'>
        <PlaylistBComponent playlist={playlist} />
        <TrackListBComponent tracksData={tracksOfPlaylist} />
      </div>
    </HelmetSEO>
  )
}