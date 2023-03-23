import AlbumBComponent from "../../../components/basic/structureMainBComponent/albumBComponent/AlbumBComponent";
import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import TrackListComponent from "../../../components/basic/trackListComponent/TrackListComponent";

const AlbumPage = () => {
	return (
		<HelmetSEO
			title='Album | Audity'
			description='Audity Album Page'
		>
			<StructureMainBComponent>
				<AlbumBComponent />
				<TrackListComponent />
			</StructureMainBComponent>
		</HelmetSEO>
	)
}

export default AlbumPage;