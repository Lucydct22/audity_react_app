import { Outlet } from 'react-router-dom'
import SidebarBComponent from "../../components/basic/sidebarBComponent/SidebarBComponent";
import PlayerBottomComponent from "../../components/basic/playerBComponent/PlayerBComponent";
import PageTopBarComponent from "../../components/basic/topBarBComponent/TopBarBComponent";

const BasicLayout = () => {
  const theme = localStorage.getItem("theme");
  theme && document.documentElement.setAttribute("data-theme", theme);
  
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