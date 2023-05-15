import * as TrackAdminTypes from './trackAdmin.types'

export default function trackAdminReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case TrackAdminTypes.INIT_TRACKS:
			return {
				...state,
				tracks: payload
			}

		case TrackAdminTypes.POST_TRACK:
			return {
				...state,
				tracks: [...state.tracks, payload]
			}

		case TrackAdminTypes.DELETE_TRACK:
			return {
				...state,
				tracks: payload
			}

		case TrackAdminTypes.UPDATE_TRACK:
			return {
				...state,
				tracks: payload.tracks
			}

		default:
			return state
	}
}