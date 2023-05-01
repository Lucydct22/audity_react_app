import HelmetSEO from "views/utils/HelmetSEO";
import TrackListComponent from "views/components/basic/trackListComponent/TrackListComponent";
import PlaylistComponent from "views/components/basic/playlistBComponent/PlaylistComponent";

const PlaylistPage = () => {
	return (
		<HelmetSEO
			title='Album | Audity'
			description='Audity Playlists Page'
		>
			<PlaylistComponent
				playlistname={"Playlist name"}
				playlistQuantity={20} />
			<TrackListComponent />
		</HelmetSEO>
	)
}

export default PlaylistPage;