import { Suspense, lazy, useEffect, useContext } from "react";
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import { Outlet } from 'react-router-dom'
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { responsiveBreak } from "utils/componentsConstants";
import './basicLayout.scss';
// Desktop
const SidebarBComponentDesktop = lazy(() => import('views/components/basic/desktop/sidebarBComponentDesktop'));
const PlayerBComponentDesktop = lazy(() => import('views/components/basic/desktop/playerBComponentDesktop'));
const TopBarBComponentDesktop = lazy(() => import('views/components/basic/desktop/topBarBComponentDesktop'));
// Mobile
const SidebarBComponentMobile = lazy(() => import('views/components/basic/mobile/sidebarBComponentMobile'));
const PlayerBComponentMobile = lazy(() => import('views/components/basic/mobile/playerBComponentMobile'));
const TopBarBComponentMobile = lazy(() => import('views/components/basic/mobile/topBarBComponentMobile'));

const BasicLayout = () => {
  const { trackData, updateCurrentTime } = useContext(CurrentTrackContext);
  const theme = localStorage.getItem("theme");
  theme && document.documentElement.setAttribute("data-theme", theme);
  const [screenWidth] = useWindowSizeReport();

  return (
    <Suspense fallback={<></>}>
      {(screenWidth > responsiveBreak) ? (
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

      <main className='basic-layout__main'>
        <div className='basic-layout__main--content'>
          <Outlet />
        </div>
      </main>

      {(screenWidth > responsiveBreak) ? <PlayerBComponentDesktop /> : <PlayerBComponentMobile />}
    </Suspense>
  )
}

export default BasicLayout;