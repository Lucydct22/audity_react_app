import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistByIdApi } from 'api/music/playlists';
import PlaylistBComponent from 'views/components/basic/playlistBComponent/PlaylistBComponent';
import TrackListBComponent from 'views/components/basic/trackListBComponent/TrackListBComponent';
import HelmetSEO from 'views/utils/HelmetSEO';
import './playlistPage.scss'

export default function PlaylistPage() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist]: any = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    playlistId && getPlaylistByIdApi(playlistId.toString()).then((res: any) => {
      isMounted && res && setPlaylist(res.playlist);
    })
    return () => { isMounted = false }
  }, [playlistId])

  return (
    <HelmetSEO
      title={`Artist | ${playlist?.name}`}
      description='Audity Artist Page'
    >
      <div className='playlist-layout'>
        <PlaylistBComponent playlist={playlist} />
        {/* <TrackListBComponent /> */}
      </div>
    </HelmetSEO>
  )
}