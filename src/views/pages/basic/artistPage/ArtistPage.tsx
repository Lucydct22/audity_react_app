import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import ArtistBComponent from '../../../components/basic/structureMainBComponent/artistBComponent/ArtistBComponent';
import TrackListComponent from '../../../components/basic/trackListComponent/TrackListComponent';
import RenderArtist from "../../../components/basic/structureMainBComponent/musicPageComponent/artistComponent/renderArtist/RenderArtist";

const ArtistPage = () => {
	return (
		<HelmetSEO
			title='Artist | Audity'
			description='Audity Artist Page'
		>
			<StructureMainBComponent>
        <RenderArtist />
				{/* <ArtistBComponent />
				<TrackListComponent /> */}
			</StructureMainBComponent>
		</HelmetSEO>
	)
}

export default ArtistPage;