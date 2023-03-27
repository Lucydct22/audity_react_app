import ArtistBComponent from '../../../components/basic/structureMainBComponent/artistBComponent/ArtistBComponent'
import StructureMainBComponent from '../../../components/basic/structureMainBComponent/StructureMainBComponent'
import TrackListComponent from '../../../components/basic/trackListComponent/TrackListComponent'

export default function ArtistPage() {
	return (
		<StructureMainBComponent>
			<ArtistBComponent />
			<TrackListComponent />
		</StructureMainBComponent>
	)
}