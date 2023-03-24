import { Suspense, lazy } from "react";
import { Outlet } from 'react-router-dom'
import useWindowSizeReport from "../../../hooks/useWindowSizeReport";
import { responsiveBreak } from "../../../utils/componentsConstants";
// Desktop
const SidebarBComponentDesktop = lazy(() => import('../../components/basic/desktop/sidebarBComponentDesktop'));
const PlayerBComponentDesktop = lazy(() => import('../../components/basic/desktop/playerBComponentDesktop'));
const TopBarBComponentDesktop = lazy(() => import('../../components/basic/desktop/topBarBComponentDesktop'));
// Mobile
const SidebarBComponentMobile = lazy(() => import('../../components/basic/mobile/sidebarBComponentMobile'));
const PlayerBComponentMobile = lazy(() => import('../../components/basic/mobile/playerBComponentMobile'));
const TopBarBComponentMobile = lazy(() => import('../../components/basic/mobile/topBarBComponentMobile'));

const BasicLayout = () => {
  const theme = localStorage.getItem("theme");
  theme && document.documentElement.setAttribute("data-theme", theme);
  const [innerWidth] = useWindowSizeReport();

  return (
    <Suspense fallback={<></>}>
      {(innerWidth > responsiveBreak) ? (
        <>
          <SidebarBComponentDesktop />
          <TopBarBComponentDesktop />
        </>
      ) : (
        <>
          <SidebarBComponentMobile />
          <TopBarBComponentMobile />
        </>
      )}

      <div className='main-layout__main'>
        <Outlet />
      </div>

      {(innerWidth > responsiveBreak) ? <PlayerBComponentDesktop /> : <PlayerBComponentMobile />}
    </Suspense>
  )
}

export default BasicLayout;