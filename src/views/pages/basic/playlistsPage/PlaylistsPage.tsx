import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { getPlaylistApi } from 'api/music/playlists';
import PlaylistsBComponent from 'views/components/basic/playlistsBComponent/PlaylistsBComponent';
import HelmetSEO from "views/utils/HelmetSEO";

const PlaylistsPage = () => {
	const [playlists, setPlaylists] = useState([]);
	const { playlistId }: any = useParams();

	useEffect(() => {
		let isMounted = true;
		getPlaylistApi().then((res: any) => {
			isMounted && res && setPlaylists(res.playlist);
		})
		return () => { isMounted = false }
	}, [])

	return (
		!playlistId ? (
			<HelmetSEO
				title='Playlist | Audity'
				description='Audity Playlist Page'
			>
				<PlaylistsBComponent playlists={playlists} />
			</HelmetSEO>
		) : (
			<Outlet />
		)
	)
}

export default PlaylistsPage;