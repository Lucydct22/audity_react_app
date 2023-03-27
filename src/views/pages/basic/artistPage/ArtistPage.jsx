import { useEffect, useState } from 'react';
import './artistPage.scss';
import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import { RenderArtist } from '../../../components/basic/structureMainBComponent/musicPageComponent/artistComponent/renderArtist/renderArtist';
import { getArtistApi } from '../../../../api/music/artists';

const ArtistPage = () => {
	const [artists, setArtists] = useState([]);

	console.log(artists);

	useEffect(() => {
		let isMounted = true;
		getArtistApi().then(res => {
			isMounted && res && setArtists(res);
		})
		return () => { isMounted = false }
	}, [])

	return (
		<HelmetSEO
			title='Artist | Audity'
			description='Audity Artist Page'
		>
			<StructureMainBComponent>
				<div className="artist-page-content">
					<h1>Artist Page</h1>
					<div className='artist-page-content__grid'>
						{artists &&
							artists.map(artist => <RenderArtist key={artist.id} artist={artist} />)
						}
					</div>
				</div>
			</StructureMainBComponent>
		</HelmetSEO>
	)
}

export default ArtistPage;