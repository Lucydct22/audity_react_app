import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistByIdApi } from 'api/music/playlists';
import PlaylistsBComponent from 'views/components/basic/playlistsBComponent/PlaylistsBComponent';
import TrackListComponent from 'views/components/basic/trackListComponent/TrackListComponent'
import HelmetSEO from 'views/utils/HelmetSEO';

export default function PlaylistPage() {
	const { playlistId } = useParams();
	const [playlist, setPlaylist]: any = useState(undefined);

	useEffect(() => {
		let isMounted = true;
		playlistId && getPlaylistByIdApi(playlistId.toString()).then((res: any) => {
			isMounted && res && setPlaylist(res.playlist);
		})
		return () => { isMounted = false }
	}, [playlistId])

	return (
		<HelmetSEO
			title={`Artist | ${playlist?.name}`}
			description='Audity Artist Page'
		>
			<PlaylistsBComponent playlist={playlist} />
			<TrackListComponent />
		</HelmetSEO>
	)
}