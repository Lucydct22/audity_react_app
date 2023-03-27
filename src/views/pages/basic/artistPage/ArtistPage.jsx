import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistByIdApi } from '../../../../api/music/artists';
import ArtistBComponent from '../../../components/basic/artistBComponent/ArtistBComponent'
import TrackListComponent from '../../../components/basic/trackListComponent/TrackListComponent'
import HelmetSEO from '../../../utils/HelmetSEO';

export default function ArtistPage() {
	const { artistId } = useParams();
	const [artist, setArtist] = useState(undefined);

	useEffect(() => {
		let isMounted = true;
		artistId && getArtistByIdApi(artistId.toString()).then(res => {
			isMounted && res && setArtist(res);
		})
		return () => { isMounted = false }
	}, [artistId])

	return (
		<HelmetSEO
			title={`Artist | ${artist?.name}`}
			description='Audity Artist Page'
		>
			<ArtistBComponent artist={artist} />
			<TrackListComponent />
		</HelmetSEO>
	)
}