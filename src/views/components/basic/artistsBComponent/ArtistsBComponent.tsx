import { useNavigate, useSearchParams } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import RenderArtist from "../renders/renderArtist";
import './artistsBComponent.scss';
import { MdArrowBack } from 'react-icons/md'

export default function ArtistsBComponent({ artists }: any) {
  const [screenWidth] = useWindowSizeReport();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const artistsQuery = searchParams.get('artist');

  const filterArtists = (artists: any) => artists.filter((artist: any) => new RegExp(`.*${artistsQuery}.*`, 'i').test(artist.name))

  const renderArtists = () => (
    artistsQuery ? (
      filterArtists(artists)
        .map((artist: any) => <RenderArtist key={artist._id} artist={artist} />)
    ) : (
      artists.map((artist: any) => <RenderArtist key={artist._id} artist={artist} />)
    )
  )

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



