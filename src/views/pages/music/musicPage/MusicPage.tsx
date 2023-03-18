import PlayerBottomComponent from "../../../components/component/pagePlayer/PlayerBottom";
import PageTopBarComponent from "../../../components/component/pageTopbar/PageTopBar";
import SidebarComponent from "../../../components/component/pageSidebar/Sidebar";
import PageContentComponent from "../../../components/component/pageMain/pageContent";

const MusicPage = () => {
  return (
    <>
      <PageContentComponent />
      <SidebarComponent />
      <PageTopBarComponent />
      <PlayerBottomComponent />
    </>
  )
}

export default MusicPage;