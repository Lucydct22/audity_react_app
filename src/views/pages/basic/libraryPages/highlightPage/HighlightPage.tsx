import HelmetSEO from "views/utils/HelmetSEO";
import LibraryBComponentHighlights from "views/components/basic/libraryBComponent/LibraryBComponentHighlights/LibraryBComponentHighlights";

function HighlightPage() {
  return (
    <HelmetSEO
      title='Your Highlight | Audity'
      description='Audity Highlight Page'
    >
      <LibraryBComponentHighlights />
    </HelmetSEO>
  )
}

export default HighlightPage;
