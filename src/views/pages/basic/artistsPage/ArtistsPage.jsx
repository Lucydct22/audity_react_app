import { useEffect, useState } from 'react';
import './artistsPage.scss';
import HelmetSEO from "../../../utils/HelmetSEO";
import { RenderArtist } from '../../../components/basic/musicPageComponent/artistComponent/renderArtist/renderArtist';
import { getArtistApi } from '../../../../api/music/artists';

const ArtistsPage = () => {
	const [artists, setArtists] = useState([]);

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
				<div className="artists-page-content">
					<h1>Artist Page</h1>
					<div className='artists-page-content__grid'>
						{artists &&
							artists.map(artist => <RenderArtist key={artist.id} artist={artist} />)
						}
					</div>
				</div>
		</HelmetSEO>
	)
}

export default ArtistsPage;