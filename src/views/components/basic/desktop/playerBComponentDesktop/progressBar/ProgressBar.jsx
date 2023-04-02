import { useContext } from 'react'
import CurrentTrackContext from '@/context/currentTrack/CurrentTrackContext';
import './progressBar.scss'

export default function ProgressBar() {
	const { trackData, changeCurrentTime } = useContext(CurrentTrackContext);

	return (
		<div className="progress-bar">
			<input
				onChange={(e) => changeCurrentTime(e.target.value)}
				type="range"
				min="0"
				max={Math.round(trackData.duration)}
				value={Math.round(trackData.currentTime)}
				className="progress-bar__range"
			/>
		</div>
	)
}