import HelmetSEO from "views/utils/HelmetSEO";
import LibraryBComponentPlaylists from "views/components/basic/libraryBComponent/libraryBComponentPlaylists/LibraryBComponentPlaylists";

function PlaylistPage() {
	return (
		<HelmetSEO
			title='Your Playlists | Audity'
			description='Audity Playlists Page'
		>
			<LibraryBComponentPlaylists />
		</HelmetSEO>
	)
}

export default PlaylistPage;
