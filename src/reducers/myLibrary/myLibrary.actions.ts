import { getAlbumsLikedByUserApi } from 'api/music/albums';
import * as MyLibraryTypes from './myLibrary.types'
import { getArtistsLikedByUserApi } from 'api/music/artists';
import { getPlaylistByUserApi, getPlaylistsLikedByUserApi, postPlaylistApi, putTrackToPlaylist } from 'api/music/playlists';
import { getTracksLikedByUserApi } from 'api/music/tracks';

export async function initMyLibraryAction(dispatch: any, token: any, dbUserId: any) {
	try {
		const albumsFetch = await getAlbumsLikedByUserApi(dbUserId, token)
		const artistsFetch = await getArtistsLikedByUserApi(dbUserId, token)
		const playlistsFetch = await getPlaylistsLikedByUserApi(dbUserId, token)
		const tracksFetch = await getTracksLikedByUserApi(dbUserId, token)
		const playlistsByUserFetch = await getPlaylistByUserApi(dbUserId, token)

		return dispatch({
			type: MyLibraryTypes.INIT_MY_LIBRARY,
			payload: {
				albumsInfo: albumsFetch.content?.length,
				albumsContent: albumsFetch.content,
				artistsInfo: artistsFetch.content?.length,
				artistsContent: artistsFetch.content,
				playlistsInfo: playlistsFetch.content?.length + playlistsByUserFetch.content?.length,
				playlistsContent: playlistsFetch.content,
				playlistsUserContent: playlistsByUserFetch.content,
				tracksInfo: tracksFetch.content?.length,
				tracksContent: tracksFetch.content,
			}
		})
	} catch (err) {
		console.log(err);
	}
}

export async function postPlaylistAction(dispatch: any, token: any, name: any, description: string, userId: string) {
	const data = {
		userId: userId.toString(),
		name,
		description
	}
	try {
		const response = await postPlaylistApi(data, token)
		return dispatch({
			type: MyLibraryTypes.POST_PLAYLIST,
			payload: {
				playlist: response.playlist
			}
		})
	} catch (err) {
		console.log(err);
	}
}

export async function putTrackToPlaylistAction(dispatch: any, token: any, playlistId: string, trackId: string ) {
	try {
		const response = await putTrackToPlaylist(token, playlistId, trackId)
		return dispatch({
			type: MyLibraryTypes.PUT_TRACK_TO_PLAYLIST,
			payload: {
				playlist: response.playlist
			}
		})
	} catch (err) {
		console.log(err);
	}
}