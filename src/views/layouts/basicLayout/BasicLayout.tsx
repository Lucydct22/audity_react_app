import { Outlet } from 'react-router-dom'
import SidebarBComponent from "../../components/basic/sidebarBComponent/SidebarBComponent";
import PlayerBottomComponent from "../../components/basic/playerBComponent/PlayerBComponent";
import PageTopBarComponent from "../../components/basic/topBarBComponent/TopBarBComponent";

const BasicLayout = () => {
  return (
    <>
      <SidebarBComponent />
      <PageTopBarComponent />
      <Outlet />
      <PlayerBottomComponent />
    </>
  )
}

export default BasicLayout;