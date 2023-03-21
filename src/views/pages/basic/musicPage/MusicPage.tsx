import PageContentComponent from "../../../components/basic/StructureMain/mainBComponent/MainBComponent";
import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMain from '../../../components/basic/StructureMain';

const MusicPage = () => {
  return (
    <HelmetSEO
      title='Music | Audity'
      description='Audity Music Page'
    >
      <StructureMain>
        <PageContentComponent />
      </StructureMain>
    </HelmetSEO>
  )
}

export default MusicPage;