import { Link } from 'react-router-dom'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import RenderArtist from "../musicPageComponent/artistsSlider/renderArtist";
import './artistsBComponent.scss';
import { MdArrowBack } from 'react-icons/md'

export default function ArtistsBComponent({ artists }: any) {
  const [screenWidth] = useWindowSizeReport()

  return (
    <div className="artists-page-content">
      {(screenWidth > responsiveBreak) ?
        null :
        <Link to={"/explore"} className="artists-page-content__mobile">
          <MdArrowBack size={27} />
          <span>Explore page</span>
        </Link>}
      <h1>Artist Page</h1>
      <div className='artists-page-content__grid'>
        {artists &&
          artists.map((artist: any) => <RenderArtist key={artist._id} artist={artist} />)
        }
      </div>
    </div>
  )
}
