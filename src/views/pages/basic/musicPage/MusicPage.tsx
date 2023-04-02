import MusicPageComponent from "@/views/components/basic/musicPageComponent/MusicPageComponent";
import HelmetSEO from "@/views/utils/HelmetSEO";

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