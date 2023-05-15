import * as MyLibraryTypes from './myLibrary.types'

export default function myLibraryReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case MyLibraryTypes.INIT_MY_LIBRARY:
			return {
				albums: {
					info: {
						length: payload.albumsInfo,
					},
					content: payload.albumsContent
				},
				artists: {
					info: {
						length: payload.artistsInfo,
					},
					content: payload.artistsContent
				},
				playlists: {
					info: {
						length: payload.playlistsInfo,
					},
					content: payload.playlistsContent,
					userContent: payload.playlistsUserContent
				},
				tracks: {
					info: {
						length: payload.tracksInfo,
					},
					content: payload.tracksContent
				}
			}

		case MyLibraryTypes.POST_PLAYLIST:
			return {
				...state,
				playlists: {
					...state.playlists,
					userContent: [...state.playlists.userContent, payload.playlist]
				}
			}

			case MyLibraryTypes.PUT_TRACK_TO_PLAYLIST:
			return {
				...state,
				tracks: {
					...state.tracks,
					userContent: [...state.playlists.userContent, payload.playlist]
				}
			}

		default:
			return state
	}
}