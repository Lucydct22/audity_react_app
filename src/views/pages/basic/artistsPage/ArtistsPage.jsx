import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import HelmetSEO from "../../../utils/HelmetSEO";
import { RenderArtist } from '../../../components/basic/musicPageComponent/artistComponent/renderArtist/renderArtist';
import { getArtistApi } from '../../../../api/music/artists';
import './artistsPage.scss';

const ArtistsPage = () => {
	const [artists, setArtists] = useState([]);
	const params = useParams();

	useEffect(() => {
		let isMounted = true;
		getArtistApi().then(res => {
			isMounted && res && setArtists(res);
		})
		return () => { isMounted = false }
	}, [])


	return (
		isNaN(parseInt(params.artistId)) ? (
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
		) : (
			<Outlet />
		)
	)
}

export default ArtistsPage;