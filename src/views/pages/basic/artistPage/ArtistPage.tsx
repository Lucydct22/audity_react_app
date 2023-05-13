import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistByIdApi } from 'api/music/artists';
import ArtistBComponent from 'views/components/basic/artistBComponent/ArtistBComponent'
import TrackListComponent from 'views/components/basic/trackListComponent/TrackListComponent'
import './artistPage.scss'
import HelmetSEO from 'views/utils/HelmetSEO';

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artist, setArtist]: any = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    artistId && getArtistByIdApi(artistId.toString()).then((res: any) => {
      isMounted && res && setArtist(res.artist);
    })
    return () => { isMounted = false }
  }, [artistId])

  return (
    <HelmetSEO
      title={`Artist | ${artist?.name}`}
      description='Audity Artist Page'
    >
      <div className='artist-layout'>
        <ArtistBComponent artist={artist} />
        <TrackListComponent />
      </div>
    </HelmetSEO>
  )
}