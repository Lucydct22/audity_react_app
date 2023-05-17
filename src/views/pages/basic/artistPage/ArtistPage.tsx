import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistByIdApi } from 'api/music/artists';
import { getTrackByIdApi } from 'api/music/tracks';
import ArtistBComponent from 'views/components/basic/artistBComponent/ArtistBComponent'
import TrackListBComponent from 'views/components/basic/trackListBComponent/TrackListBComponent';
import './artistPage.scss'
import HelmetSEO from 'views/utils/HelmetSEO';

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artist, setArtist]: any = useState(undefined);
  const [tracksOfArtist, setTracksOfArtist]: any = useState([]);

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
        getTrackByIdApi(track.toString()).then((res: any) => {
          setTracksOfArtist((tracksOfArtist: any) => [
            ...tracksOfArtist,
            res.track,
          ]);
        })
      })
    }

    return () => { isMounted = false }
  }, [artist])

  console.log(artist);
  console.log(tracksOfArtist);
  

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