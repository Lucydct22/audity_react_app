const initialTrackState = {
	currentTrack: {
		id: '',
		name: '',
		artist: '',
		url: '',
		thumbnail: '',
		genre: '',
		likes: '',
		album: '',
		createdAt: 0,
		updatedAt: 0
	},
	trackData: {
		url: '',
		audio: null,
		duration: 0,
		currentTime: 0,
		isPlaying: false,
		isMuted: false,
		hasLoop: false,
		volume: 0,
	},
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