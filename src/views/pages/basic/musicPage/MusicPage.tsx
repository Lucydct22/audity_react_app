import PlayerBottomComponent from "../../../components/basic/playerBComponent/PlayerBComponent";
import PageTopBarComponent from "../../../components/basic/topBarBComponent/TopBarBComponent";
import SidebarComponent from "../../../components/basic/sidebarBComponent/SidebarBComponent";
import PageContentComponent from "../../../components/basic/mainBComponent/MainBComponent";

const MusicPage = () => {
  return (
    <>
      <SidebarComponent />
      <PageTopBarComponent />
      <PageContentComponent />
      <PlayerBottomComponent />
    </>
  )
}

export default MusicPage;