import { useContext } from 'react'
import { TrackContext } from '../../../../../../context/currentTrack/TrackContext';
import './progressBar.scss'

export default function ProgressBar() {
	const { trackData, changeCurrentTime } = useContext(TrackContext);

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