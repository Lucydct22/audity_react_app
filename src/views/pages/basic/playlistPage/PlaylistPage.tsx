import HelmetSEO from "../../../utils/HelmetSEO";
import TrackListComponent from "../../../components/basic/trackListComponent/TrackListComponent";
import PlaylistComponent from "../../../components/basic/playlistBComponent/PlaylistComponent";

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