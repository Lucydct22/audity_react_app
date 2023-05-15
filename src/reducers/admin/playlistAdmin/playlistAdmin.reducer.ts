import * as PlaylistAdminTypes from './playlistAdmin.types'

export default function playlistAdminReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case PlaylistAdminTypes.INIT_PLAYLISTS:
			return {
				...state,
				playlists: payload
			}

		case PlaylistAdminTypes.POST_PLAYLIST:
			return {
				...state,
				playlists: [...state.playlists, payload]
			}

		case PlaylistAdminTypes.DELETE_PLAYLIST:
			return {
				...state,
				playlists: payload
			}

		case PlaylistAdminTypes.UPDATE_PLAYLIST:
			return {
				...state,
				playlists: payload.playlists
			}

		default:
			return state
	}
}