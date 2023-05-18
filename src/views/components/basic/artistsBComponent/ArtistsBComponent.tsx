import { useNavigate, useSearchParams } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import RenderArtist from "../renders/renderArtist";
import './artistsBComponent.scss';
import { MdArrowBack } from 'react-icons/md'
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'views/UI/spinner/Spinner';

export default function ArtistsBComponent({ artists }: any) {
  const [screenWidth] = useWindowSizeReport();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const artistsQuery = searchParams.get('artist');
  const { isLoading } = useAuth0();
  const filterArtists = (artists: any) => artists.filter((artist: any) => new RegExp(`.*${artistsQuery}.*`, 'i').test(artist.name))

  const renderArtists = () => (
    artistsQuery ? (
      filterArtists(artists)
        .map((artist: any) => <RenderArtist key={artist._id} artist={artist} />)
    ) : (
      artists.map((artist: any) => <RenderArtist key={artist._id} artist={artist} />)
    )
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="artists-page-content">
      {(screenWidth < responsiveBreak) &&
        <button onClick={() => navigate(-1)} className="artists-page-content__mobile">
          <MdArrowBack size={27} />
        </button>
      }
      <h1>Artist Page</h1>
      <div className='artists-page-content__grid'>
        {artists && renderArtists()}
      </div>
    </div>
  )
}



