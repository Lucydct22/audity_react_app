import PageContentComponent from "../../../components/basic/mainBComponent/MainBComponent";
import HelmetSEO from "../../../utils/HelmetSEO";

const MusicPage = () => {
  return (
    <HelmetSEO
      title='Music | Audity'
      description='Audity Music Page'
    >   
      <PageContentComponent />
    </HelmetSEO>
  )
}

export default MusicPage;