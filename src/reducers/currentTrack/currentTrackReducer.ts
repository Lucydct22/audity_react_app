import * as CurrentTrackTypes from './currentTrackTypes';

export default function currentTrackReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case CurrentTrackTypes.INIT_CURRENT_TRACK:
			return {
				currentTrack: payload.currentTrack,
				trackData: payload.trackData,
			}

		case CurrentTrackTypes.PLAY_CURRENT_TRACK:
			return {
				...state,
				trackData: {
					...state.trackData,
					isPlaying: true
				}
			}

		case CurrentTrackTypes.PAUSE_CURRENT_TRACK:
			return {
				...state,
				trackData: {
					...state.trackData,
					isPlaying: false
				}
			}

		case CurrentTrackTypes.UPDATE_CURRENT_TIME:
			return {
				...state,
				trackData: {
					...state.trackData,
					currentTime: payload
				}
			}

		case CurrentTrackTypes.CHANGE_CURRENT_TIME:
			return {
				...state,
				trackData: {
					...state.trackData,
					currentTime: parseInt(payload.currentTime)
				}
			}

		case CurrentTrackTypes.NEXT_TRACK:
			return {
				currentTrack: payload.currentTrack,
				trackData: payload.trackData
			}

		case CurrentTrackTypes.PREV_TRACK:
			return {
				currentTrack: payload.currentTrack,
				trackData: payload.trackData
			}

		case CurrentTrackTypes.MUTE_TRACK:
			return {
				...state,
				trackData: {
					...state.trackData,
					isMuted: payload.isMuted
				}
			}

		case CurrentTrackTypes.LOOP_TRACK:
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