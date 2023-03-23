import { Outlet } from 'react-router-dom'
import SidebarBComponent from "../../components/basic/sidebarBComponent";
import PlayerBottomComponent from "../../components/basic/playerBComponent";
import PageTopBarComponent from "../../components/basic/topBarBComponent";

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