import * as TrackTypes from './trackTypes';

export default function trackReducer(state: any, action: any) {
	const { type, payload } = action;
	switch (type) {
		case TrackTypes.INIT_CURRENT_TRACK:
			return {
				currentTrack: payload.currentTrack,
				trackData: payload.trackData,
			}

		case TrackTypes.PLAY_CURRENT_TRACK:
			state.trackData.audio.play();
			return {
				currentTrack: state.currentTrack,
				trackData: { ...state.trackData, isPlaying: true }
			}

		case TrackTypes.PAUSE_CURRENT_TRACK:
			state.trackData.audio.pause();
			return {
				currentTrack: state.currentTrack,
				trackData: { ...state.trackData, isPlaying: false }
			}

		case TrackTypes.UPDATE_CURRENT_TIME:
			return {
				currentTrack: state.currentTrack,
				trackData: {
					...state.trackData,
					currentTime: payload,
					timeToEnd: state.trackData.duration - payload
				}
			}

		default:
			return state;
	}
}