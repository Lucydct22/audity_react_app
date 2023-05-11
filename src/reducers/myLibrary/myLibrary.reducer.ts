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
					content: payload.playlistsContent
				},
				tracks: {
					info: {
						length: payload.tracksInfo,
					},
					content: payload.tracksContent
				}
			}

		default:
			return state
	}
}