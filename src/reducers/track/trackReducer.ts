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
			return {
				currentTrack: state.currentTrack,
				trackData: { ...state.trackData, isPlaying: true }
			}

		case TrackTypes.PAUSE_CURRENT_TRACK:
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

		case TrackTypes.CHANGE_CURRENT_TIME:
			return {
				currentTrack: state.currentTrack,
				trackData: { ...state.trackData, currentTime: parseInt(payload.currentTime) }
			}

		case TrackTypes.NEXT_TRACK:
			return {
				currentTrack: payload.currentTrack,
				trackData: payload.trackData
			}

		case TrackTypes.PREV_TRACK:
			return {
				currentTrack: payload.currentTrack,
				trackData: payload.trackData
			}

		case TrackTypes.MUTE_TRACK:
			return {
				currentTrack: state.currentTrack,
				trackData: { ...state.trackData, isMuted: payload.isMuted }
			}

		case TrackTypes.LOOP_TRACK:
			return {
				currentTrack: state.currentTrack,
				trackData: { ...state.trackData, hasLoop: payload.hasLoop }
			}

		default:
			return state;
	}
}