import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumByIdApi } from 'api/music/albums';
import AlbumBComponent from 'views/components/basic/albumBComponent';
import TrackListBComponent from 'views/components/basic/trackListBComponent/TrackListBComponent';
import HelmetSEO from 'views/utils/HelmetSEO';
import './albumPage.scss'

export default function AlbumPage() {
  const { albumId } = useParams();
  const [album, setAlbum]: any = useState();

  useEffect(() => {
    let isMounted = true;
    albumId && getAlbumByIdApi(albumId.toString()).then((res: any) => {
      isMounted && res && setAlbum(res.album);
    })
    return () => { isMounted = false }
  }, [albumId])

  return (
    <HelmetSEO
      title={`Album | ${album?.name}`}
      description='Audity Album Page'
    >
      <div className='album-layout'>
        <AlbumBComponent album={album} />
        {/* <TrackListBComponent trackData={trackData} /> */}
      </div>
    </HelmetSEO>
  )
}