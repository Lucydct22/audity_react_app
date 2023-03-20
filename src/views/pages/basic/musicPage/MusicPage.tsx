import PlayerBottomComponent from "../../../components/basic/playerBComponent/PlayerBComponent";
import PageTopBarComponent from "../../../components/basic/topBarBComponent/TopBarBComponent";
import SidebarComponent from "../../../components/basic/sidebarBComponent/SidebarBComponent";
import PageContentComponent from "../../../components/basic/mainBComponent/MainBComponent";
import HelmetSEO from "../../../utils/HelmetSEO";

const MusicPage = () => {
  return (
    <HelmetSEO
      title='Music | Audity'
      description='Audity Music Page'
    >   
      <PageContentComponent />
      <PlayerBottomComponent />
    </HelmetSEO>
  )
}

export default MusicPage;