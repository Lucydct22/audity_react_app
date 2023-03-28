import { Artist } from "../../../../interfaces/music";
import RenderArtist from "../musicPageComponent/artistsSlider/renderArtist";
import './artistsBComponent.scss';

export default function ArtistsBComponent({ artists }: any) {
	return (
		<div className="artists-page-content">
			<h1>Artist Page</h1>
			<div className='artists-page-content__grid'>
				{artists &&
					artists.map((artist: any) => <RenderArtist key={artist.id} artist={artist} />)
				}
			</div>
		</div>
	)
}
