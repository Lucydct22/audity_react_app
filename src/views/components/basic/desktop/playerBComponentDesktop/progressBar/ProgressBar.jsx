import { useState, useEffect, useContext } from 'react'
import CurrentTrackContext from 'context/currentTrack/CurrentTrackContext';
import { ThemeContext } from "context/theme/ThemeContext";
import { responsiveBreak } from "utils/componentsConstants";
import useWindowSizeReport from "hooks/useWindowSizeReport";
import './progressBar.scss'

export default function ProgressBar() {
  const { trackData, changeCurrentTime } = useContext(CurrentTrackContext);
  const [sliderEl, setSliderEl] = useState();
  const { theme } = useContext(ThemeContext);
  const [screenWidth] = useWindowSizeReport()
  

  useEffect(() => {
    const sliderValue = Math.round((trackData.currentTime/trackData.duration)*100);
    return setSliderEl(sliderValue);

  }, [trackData])

  return (
    <div className="progress-bar">
      <input
        onChange={(e) => changeCurrentTime(e.target.value)}
        type="range"
        min="0"
        max={Math.round(trackData.duration)}
        value={Math.round(trackData.currentTime)}
        style={
          (screenWidth > responsiveBreak) ? {
            background: `linear-gradient(to right, #E24834 ${sliderEl}%, ${theme === 'light' ? '#4b4b5c' : '#a2a2ad'} ${sliderEl}%)`
          } : {
            background: `linear-gradient(to right, #FFF ${sliderEl}%, #a2a2ad60 ${sliderEl}%)`
          }
      }
        className="progress-bar__range"
      />
    </div>
  )
}