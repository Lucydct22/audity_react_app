import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import FavoritesBComponent from "../../../components/basic/favoritesBComponent/FavoritesBComponent";

function FavoritesPage() {
  return (
    <HelmetSEO
			title='Favorites | Audity'
			description='Audity Favorites Page'
		>
			<StructureMainBComponent>
				<FavoritesBComponent />
			</StructureMainBComponent>
		</HelmetSEO>
  )
}

export default FavoritesPage;
