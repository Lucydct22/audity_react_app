import HelmetSEO from "../../../utils/HelmetSEO";
import FavoritesBComponent from "../../../components/basic/favoritesBComponent/FavoritesBComponent";

function FavoritesPage() {
	return (
		<HelmetSEO
			title='Favorites | Audity'
			description='Audity Favorites Page'
		>
			<FavoritesBComponent />
		</HelmetSEO>
	)
}

export default FavoritesPage;
