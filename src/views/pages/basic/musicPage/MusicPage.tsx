import MusicPageComponent from "../../../components/basic/structureMainBComponent/musicPageComponent/MusicPageComponent";
import HelmetSEO from "../../../utils/HelmetSEO";
import StructureMainBComponent from "../../../components/basic/structureMainBComponent/StructureMainBComponent";
import { Outlet } from "react-router-dom";

const MusicPage = () => {
  return (
    <HelmetSEO
      title='Music | Audity'
      description='Audity Music Page'
    >
      <StructureMainBComponent>
        <MusicPageComponent />
      </StructureMainBComponent>
    </HelmetSEO>
  )
}

export default MusicPage;