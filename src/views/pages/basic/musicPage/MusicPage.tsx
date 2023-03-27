import MusicPageComponent from "../../../components/basic/musicPageComponent/MusicPageComponent";
import HelmetSEO from "../../../utils/HelmetSEO";

const MusicPage = () => {
  return (
    <HelmetSEO
      title='Music | Audity'
      description='Audity Music Page'
    >
      <MusicPageComponent />
    </HelmetSEO>
  )
}

export default MusicPage;