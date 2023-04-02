import HelmetSEO from "@/views/utils/HelmetSEO";
import RadioBComponent from "@/views/components/basic/radioBComponent";

function FavoritesPage() {
	return (
		<HelmetSEO
			title='Favorites | Audity'
			description='Audity Favorites Page'
		>
			<RadioBComponent />
		</HelmetSEO>
	)
}

export default FavoritesPage;
