import HelmetSEO from "views/utils/HelmetSEO";
import ExploreBComponent from "views/components/basic/libraryBComponent/libraryBComponent";

function ExplorePage() {
  return (
    <HelmetSEO
      title='Explore | Audity'
      description='Audity Explore Page'
    >
      <ExploreBComponent />
    </HelmetSEO>
  )
}

export default ExplorePage;
