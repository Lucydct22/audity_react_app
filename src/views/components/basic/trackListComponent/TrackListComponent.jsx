import TrackListDisplayComponent from "./TrackListDisplayComponent";
import TrackListMobileComponent from "../mobile/tracklistComponentMobile/TrackListMobileComponent";
import './trackListStyle.scss'; 
import { responsiveBreak } from "../../../../utils/componentsConstants";
import useWindowSizeReport from "../../../../hooks/useWindowSizeReport";

const  TrackListComponent = () => {
  const windowWidth = useWindowSizeReport()

  return (
    <>
     <div className="page-content__track-list">
      { responsiveBreak < windowWidth ?   (<TrackListDisplayComponent />) : (<TrackListMobileComponent />)}
      </div> 
    </>
  )
}
export default TrackListComponent

