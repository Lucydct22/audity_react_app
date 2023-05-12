import HelmetSEO from "views/utils/HelmetSEO";
import LibraryBComponentFavTracks from "views/components/basic/libraryBComponent/libraryBComponentFavTracks/LibraryBComponentFavTracks";

function FavTracksPage() {
  return (
    <HelmetSEO
      title='Favorite tracks | Audity'
      description='Audity Favorite tracks Page'
    >
      <LibraryBComponentFavTracks />
    </HelmetSEO>
  )
}

export default FavTracksPage;
