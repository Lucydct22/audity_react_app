import { getAlbumsLikedByUserApi } from 'api/music/albums';
import * as MyLibraryTypes from './myLibrary.types'
import { getArtistsLikedByUserApi } from 'api/music/artists';
import { getPlaylistByUserApi, getPlaylistsLikedByUserApi } from 'api/music/playlists';
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