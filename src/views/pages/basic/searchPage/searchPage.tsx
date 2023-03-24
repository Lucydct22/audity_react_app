import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import SearchBComponentMobile from "../../../components/basic/mobile/searchBComponentMobile/SearchBComponentMobile";

function SearchPage() {
  return (
    <HelmetSEO
			title='Search | Audity'
			description='Audity Search Page'
		>
			<StructureMainBComponent>
				<SearchBComponentMobile />
			</StructureMainBComponent>
		</HelmetSEO>
  )
}

export default SearchPage;