import './artistBComponentMobile.scss'
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";

export default function artistBComponentMobile() {
  const [screenWidth] = useWindowSizeReport()

  return (
    <div>
      
    </div>
  )
}
