const initialCurrentTrackState = {
	currentTrack: {
		_id: '',
		name: '',
		artists: [{
			name: ''
		}],
		url: '',
		thumbnail: '',
		genre: '',
		likes: '',
		album: '',
		likedBy: [],
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
	playCurrentTrack: () => { },
	pauseCurrentTrack: () => { },
	updateCurrentTime: () => { },
	nextTrack: () => { },
	previousTrack: () => { },
	muteTrack: () => { },
	loopTrack: () => { },
	changeCurrentTime: () => { },
	selectCurrentTrack: (track: any) => { },
}

export default initialCurrentTrackState;