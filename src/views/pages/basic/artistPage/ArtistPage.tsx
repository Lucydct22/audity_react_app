import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistByIdApi } from 'api/music/artists';
import { getTrackByIdApi } from 'api/music/tracks';
import ArtistBComponent from 'views/components/basic/artistBComponent/ArtistBComponent'
import TrackListBComponent from 'views/components/basic/trackListBComponent/TrackListBComponent';
import './artistPage.scss'
import HelmetSEO from 'views/utils/HelmetSEO';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'views/UI/spinner/Spinner';

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artist, setArtist]: any = useState(undefined);
  const [tracksOfArtist, setTracksOfArtist]: any = useState([]);
  const {isLoading} = useAuth0();

  useEffect(() => {
    let isMounted = true;
    artistId && getArtistByIdApi(artistId.toString()).then((res: any) => {
      isMounted && res && setArtist(res.artist);
    })
    return () => { isMounted = false }
  }, [artistId])

  useEffect(() => {
    let isMounted = true;
    if (artist) {
      artist.tracks.map((track: any) => {
        getTrackByIdApi(track._id.toString()).then((res: any) => {
          setTracksOfArtist((tracksOfArtist: any) => [
            ...tracksOfArtist,
            res.track,
          ]);
        })
      })
    }
    return () => { isMounted = false }
  }, [artist])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <HelmetSEO
      title={`Artist | ${artist?.name}`}
      description='Audity Artist Page'
    >
      <div className='artist-layout'>
        <ArtistBComponent artist={artist} />
        <TrackListBComponent tracksData={tracksOfArtist} />
      </div>
    </HelmetSEO>
  )
}