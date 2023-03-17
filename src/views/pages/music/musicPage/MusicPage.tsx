import PlayerBottomComponent from "../../../components/component/pagePlayerBottom/PlayerBottomComponent";
import PageTopBar from "../../../components/component/pageTopbar/PageTopBar";
import SidebarComponent from "../../../components/component/pageSidebar/Sidebar";

const MusicPage = () => {
  return (
    <div>
      <SidebarComponent />
      <PageTopBar />
      <PlayerBottomComponent /> 
    </div>
  )
}

export default MusicPage;