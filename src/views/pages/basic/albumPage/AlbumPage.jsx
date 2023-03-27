import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumsByIdApi } from '../../../../api/music/albums';
import AlbumBComponent from '../../../components/basic/albumBComponent/AlbumBComponent';
import TrackListComponent from '../../../components/basic/trackListComponent/TrackListComponent'
import HelmetSEO from '../../../utils/HelmetSEO';

export default function AlbumPage() {
	const { albumId } = useParams();
	const [album, setAlbum] = useState(undefined);

	useEffect(() => {
		let isMounted = true;
		albumId && getAlbumsByIdApi(albumId.toString()).then(res => {
			isMounted && res && setAlbum(res);
		})
		return () => { isMounted = false }
	}, [albumId])

	return (
		<HelmetSEO
			title={`album | ${album?.name}`}
			description='Audity Album Page'
		>
			<AlbumBComponent album={album} />
			<TrackListComponent />
		</HelmetSEO>
	)
}