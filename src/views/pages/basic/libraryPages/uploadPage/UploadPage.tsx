import HelmetSEO from "views/utils/HelmetSEO/HelmetSEO";
import LibraryBComponentUpload from "views/components/basic/libraryBComponent/LibraryBComponentUpload/LibraryBComponentUpload";

function UploadPage() {
  return (
    <HelmetSEO
      title='My songs | Audity'
      description='Audity Upload songs Page'
    >
      <LibraryBComponentUpload />
    </HelmetSEO>
  )
}

export default UploadPage;