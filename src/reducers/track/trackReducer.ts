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
				...state,
				trackData: {
					...state.trackData,
					isPlaying: true
				}
			}

		case TrackTypes.PAUSE_CURRENT_TRACK:
			return {
				...state,
				trackData: {
					...state.trackData,
					isPlaying: false
				}
			}

		case TrackTypes.UPDATE_CURRENT_TIME:
			return {
				...state,
				trackData: {
					...state.trackData,
					currentTime: payload
				}
			}

		case TrackTypes.CHANGE_CURRENT_TIME:
			return {
				...state,
				trackData: {
					...state.trackData,
					currentTime: parseInt(payload.currentTime)
				}
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
				...state,
				trackData: {
					...state.trackData,
					isMuted: payload.isMuted
				}
			}

		case TrackTypes.LOOP_TRACK:
			return {
				...state,
				trackData: {
					...state.trackData,
					hasLoop: payload.hasLoop
				}
			}

		default:
			return state;
	}
}