import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import TrackListComponent from "../../../components/basic/trackListComponent/TrackListComponent";
import PlaylistComponent from "../../../components/basic/structureMainBComponent/playlistBComponent/PlaylistComponent";

const PlaylistsPage = () => {
	return (
		<HelmetSEO
			title='Album | Audity'
			description='Audity Playlists Page'
		>
			<StructureMainBComponent>
				<PlaylistComponent 
				playlistname={"Playlist name"} 
				playlistQuantity={20}/>
				<TrackListComponent />
			</StructureMainBComponent>
		</HelmetSEO>
	)
}

export default PlaylistsPage;