import { currentTrack, trackData } from "./currentTrackObjects";

const initialTrackState = {
	currentTrack,
	trackData,
	initCurrentTrack: () => { },
	playCurrentTrack: () => { },
	pauseCurrentTrack: () => { },
	updateCurrentTime: () => { },
	nextTrack: () => { },
	previousTrack: () => { },
	muteTrack: () => { },
	loopTrack: () => { },
	changeCurrentTime: () => { },
}

export default initialTrackState;