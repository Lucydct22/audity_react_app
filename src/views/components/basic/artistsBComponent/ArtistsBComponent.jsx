import RenderArtist from "../musicPageComponent/artistsSlider/renderArtist";
import './artistsBComponent.scss';

export default function ArtistsBComponent({ artists }) {
	return (
		<div className="artists-page-content">
			<h1>Artist Page</h1>
			<div className='artists-page-content__grid'>
				{artists &&
					artists.map(artist => <RenderArtist key={artist.id} artist={artist} />)
				}
			</div>
		</div>
	)
}
