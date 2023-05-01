import HelmetSEO from "views/utils/HelmetSEO";
import FavoritesBComponent from "views/components/basic/favoritesBComponent/FavoritesBComponent";

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
