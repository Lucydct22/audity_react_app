import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import SearchBComponentMobile from "../../../components/basic/mobile/searchBComponentMobile/SearchBComponentMobile";
import TrackListComponent from "../../../components/basic/trackListComponent/TrackListComponent";

function SearchPage() {
  return (
    <HelmetSEO
			title='Search | Audity'
			description='Audity Search Page'
		>
			<StructureMainBComponent>
				<SearchBComponentMobile />
				<TrackListComponent />
			</StructureMainBComponent>
		</HelmetSEO>
  )
}

export default SearchPage;