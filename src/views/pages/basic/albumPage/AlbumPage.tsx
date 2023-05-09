import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumByIdApi } from 'api/music/albums';
import AlbumBComponent from 'views/components/basic/albumBComponent';
import TrackListComponent from 'views/components/basic/trackListComponent/TrackListComponent'
import HelmetSEO from 'views/utils/HelmetSEO';

export default function AlbumPage() {
	const { albumId } = useParams();
	const [album, setAlbum]: any = useState();

	useEffect(() => {
		let isMounted = true;
		albumId && getAlbumByIdApi(albumId.toString()).then((res: any) => {
			isMounted && res && setAlbum(res.album);
		})
		return () => { isMounted = false }
	}, [albumId])

	return (
		<HelmetSEO
			title={`Album | ${album?.name}`}
			description='Audity Album Page'
		>
			<AlbumBComponent album={album} />
			{/* <TrackListComponent /> */}
		</HelmetSEO>
	)
}