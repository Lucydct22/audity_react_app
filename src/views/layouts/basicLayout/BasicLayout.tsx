import { Suspense, lazy, useEffect, useContext } from "react";
import CurrentTrackContext from "context/currentTrack/CurrentTrackContext";
import { Outlet } from 'react-router-dom'
import useWindowSizeReport from "hooks/useWindowSizeReport";
import { responsiveBreak } from "utils/componentsConstants";
import './basicLayout.scss';

// import SidebarBComponentDesktop from "views/components/basic/desktop/sidebarBComponentDesktop";
// import PlayerBComponentDesktop from "views/components/basic/desktop/playerBComponentDesktop";
// import TopBarBComponentDesktop from "views/components/basic/desktop/topBarBComponentDesktop";
// import SidebarBComponentMobile from "views/components/basic/mobile/sidebarBComponentMobile";
// import PlayerBComponentMobile from "views/components/basic/mobile/playerBComponentMobile";
// import TopBarBComponentMobile from "views/components/basic/mobile/topBarBComponentMobile";

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

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      isMounted && trackData.duration && updateCurrentTime()
    }, 500);
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, [trackData.duration]);
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