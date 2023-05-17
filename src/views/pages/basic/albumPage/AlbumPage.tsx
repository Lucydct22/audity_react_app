import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumByIdApi } from 'api/music/albums';
import { getTrackByIdApi } from 'api/music/tracks';
import AlbumBComponent from 'views/components/basic/albumBComponent';
import TrackListBComponent from 'views/components/basic/trackListBComponent/TrackListBComponent';
import './albumPage.scss'
import HelmetSEO from 'views/utils/HelmetSEO';

export default function AlbumPage() {
  const { albumId } = useParams();
  const [album, setAlbum]: any = useState();
  const [tracksOfAlbum, setTracksOfAlbum]: any = useState([]);

  useEffect(() => {
    let isMounted = true;
    albumId && getAlbumByIdApi(albumId.toString()).then((res: any) => {
      isMounted && res && setAlbum(res.album);
    })
    return () => { isMounted = false }
  }, [albumId])

  useEffect(() => {
    let isMounted = true;
    if (album) {
      album.tracks.map((track: any) => {
        getTrackByIdApi(track._id.toString()).then((res: any) => {
          setTracksOfAlbum((tracksOfAlbum: any) => [
            ...tracksOfAlbum,
            res.track,
          ]);
        })
      })
    }
    return () => { isMounted = false }
  }, [album])

  return (
    <HelmetSEO
      title={`Album | ${album?.name}`}
      description='Audity Album Page'
    >
      <div className='album-layout'>
        <AlbumBComponent album={album} />
        <TrackListBComponent tracksData={tracksOfAlbum} />
      </div>
    </HelmetSEO>
  )
}