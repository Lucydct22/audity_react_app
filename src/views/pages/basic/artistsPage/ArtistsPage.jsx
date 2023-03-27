import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getArtistApi } from '../../../../api/music/artists';
import ArtistsBComponent from '../../../components/basic/artistsBComponent/ArtistsBComponent';
import HelmetSEO from "../../../utils/HelmetSEO";

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
				title='Artists | Audity'
				description='Audity Artists Page'
			>
				<ArtistsBComponent artists={artists} />
			</HelmetSEO>
		) : (
			<Outlet />
		)
	)
}

export default ArtistsPage;