import HelmetSEO from "../../../utils/HelmetSEO";
import SearchBComponentMobile from "../../../components/basic/mobile/searchBComponentMobile/SearchBComponentMobile";

function SearchPage() {
	return (
		<HelmetSEO
			title='Search | Audity'
			description='Audity Search Page'
		>
			<SearchBComponentMobile />
		</HelmetSEO>
	)
}

export default SearchPage;