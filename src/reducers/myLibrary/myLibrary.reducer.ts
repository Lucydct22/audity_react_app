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
					content: payload.tracksContent,
					userContent: payload.tracksUserContent
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

		case MyLibraryTypes.POST_PRIVATE_TRACK:
			return {
				...state,
				tracks: {
					...state.tracks,
					userContent: [...state.tracks.userContent, payload]
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

		case MyLibraryTypes.LIKE_TRACK:
			return {
				...state,
				tracks: {
					...state.tracks,
					info: state.tracks.content.length + 1,
					content: [...state.tracks.content, payload]
				}
			}

			case MyLibraryTypes.LIKE_ALBUM:
			return {
				...state,
				albums: {
					...state.albums,
					info: state.albums.content.length + 1,
					content: [...state.albums.content, payload]
				}
			}

			case MyLibraryTypes.LIKE_ARTIST:
			return {
				...state,
				artists: {
					...state.artists,
					info: state.artists.content.length + 1,
					content: [...state.artists.content, payload]
				}
			}

			case MyLibraryTypes.LIKE_PLAYLIST:
			return {
				...state,
				playlists: {
					...state.playlists,
					info: state.playlists.content.length + 1,
					content: [...state.playlists.content, payload]
				}
			}

		case MyLibraryTypes.DISLIKE_TRACK:
			return {
				...state,
				tracks: {
					...state.tracks,
					info: state.tracks.content.length - 1,
					content: payload
				}
			}

			case MyLibraryTypes.DISLIKE_ARTIST:
			return {
				...state,
				artists: {
					...state.artists,
					info: state.artists.content.length - 1,
					content: payload
				}
			}

			case MyLibraryTypes.DISLIKE_ALBUM:
			return {
				...state,
				albums: {
					...state.albums,
					info: state.albums.content.length - 1,
					content: payload
				}
			}
			
			case MyLibraryTypes.DISLIKE_PLAYLIST:
			return {
				...state,
				playlists: {
					...state.playlists,
					info: state.playlists.content.length - 1,
					content: payload
				}
			}
			
		default:
			return state
	}
} 