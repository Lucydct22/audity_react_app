import * as ArtistAdminTypes from './artistAdmin.types'

export default function artistAdminReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case ArtistAdminTypes.INIT_ARTISTS:
			return {
				...state,
				artists: payload
			}

		case ArtistAdminTypes.POST_ARTIST:
			return {
				...state,
				artists: [...state.artists, payload]
			}

		case ArtistAdminTypes.DELETE_ARTIST:
			return {
				...state,
				artists: payload
			}

		case ArtistAdminTypes.UPDATE_ARTIST:
			return {
				...state,
				artists: payload.artists
			}

		default:
			return state
	}
}