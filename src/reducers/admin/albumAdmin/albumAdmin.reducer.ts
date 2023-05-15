import * as AlbumAdminTypes from './albumAdmin.types'

export default function artistAdminReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case AlbumAdminTypes.INIT_ALBUMS:
			return {
				...state,
				albums: payload
			}

		case AlbumAdminTypes.POST_ALBUM:
			return {
				...state,
				albums: [...state.albums, payload]
			}

		case AlbumAdminTypes.DELETE_ALBUM:
			return {
				...state,
				albums: payload
			}

		case AlbumAdminTypes.UPDATE_ALBUM:
			return {
				...state,
				albums: payload.albums
			}

		default:
			return state
	}
}