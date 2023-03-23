import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import RadioBComponent from "../../../components/basic/radioBComponent";

function FavoritesPage() {
  return (
    <HelmetSEO
			title='Favorites | Audity'
			description='Audity Favorites Page'
		>
			<StructureMainBComponent>
				<RadioBComponent />
			</StructureMainBComponent>
		</HelmetSEO>
  )
}

export default FavoritesPage;
