import ExploreBComponent from "views/components/basic/mobile/exploreBComponent/ExploreBComponent";
import HelmetSEO from "views/utils/HelmetSEO";

const ExplorePage = () => {
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