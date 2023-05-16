import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistByIdApi, getTracksArtistById } from 'api/music/artists';
import ArtistBComponent from 'views/components/basic/artistBComponent/ArtistBComponent'
import TrackListBComponent from 'views/components/basic/trackListBComponent/TrackListBComponent';
import './artistPage.scss'
import HelmetSEO from 'views/utils/HelmetSEO';

export default function ArtistPage() {
  const { artistId } = useParams();
  const [artist, setArtist]: any = useState(undefined);
  const [artistTracks, setArtistTracks]: any = useState({});
  const [tracksGiveArtistName, setTracksGiveArtistName]: any = useState({});
  const [tracksGiveAlbumName, setTracksGiveAlbumName]: any = useState({});

  useEffect(() => {
    let isMounted = true;

    artistId && getArtistByIdApi(artistId.toString()).then((res: any) => {
      isMounted && res && setArtist(res.artist);
    })
    artistId && getTracksArtistById(artistId.toString()).then((res: any) => {
      isMounted && res && setArtistTracks(res.tracks);
    })

    return () => { isMounted = false }
  }, [artistId])

  // useEffect(() => {
  //   let isMounted = true;

  //   artistTracks.map((track: any) => {
  //     track.artists
  //   })

  //   artistId && getArtistByIdApi(artistId.toString()).then((res: any) => {
  //     isMounted && res && setArtist(res.artist);
  //   })

  //   return () => { isMounted = false }
  // }, [artistTracks])
  

  return (
    <HelmetSEO
      title={`Artist | ${artist?.name}`}
      description='Audity Artist Page'
    >
      <div className='artist-layout'>
        <ArtistBComponent artist={artist} />
        {/* <TrackListBComponent tracksData={artistTracks}/> */}
      </div>
    </HelmetSEO>
  )
}