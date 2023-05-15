import { getAlbumsLikedByUserApi } from 'api/music/albums';
import * as MyLibraryTypes from './myLibrary.types'
import { getArtistsLikedByUserApi } from 'api/music/artists';
import { getPlaylistByUserApi, getPlaylistsLikedByUserApi, postPlaylistApi } from 'api/music/playlists';
import { getPrivateTracksApi, getTracksLikedByUserApi, postPrivateTrackApi, updateTrackAudioApi } from 'api/music/tracks';
import { message } from 'antd';

export async function initMyLibraryAction(dispatch: any, token: any, dbUserId: any) {
	try {
		const albumsFetch = await getAlbumsLikedByUserApi(dbUserId, token)
		const artistsFetch = await getArtistsLikedByUserApi(dbUserId, token)
		const playlistsFetch = await getPlaylistsLikedByUserApi(dbUserId, token)
		const tracksFetch = await getTracksLikedByUserApi(dbUserId, token)
		const playlistsByUserFetch = await getPlaylistByUserApi(dbUserId, token)
		const privateTracksFetch: any = await getPrivateTracksApi(dbUserId, token)
		console.log(privateTracksFetch);


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
				tracksUserContent: privateTracksFetch.tracks,
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

export async function postPrivateTrackAction(dispatch: any, token: any, data: any, userId: string) {
	const trackData = {
		userId: userId.toString(),
		name: data.name,
		artists: data?.artists
	}
	try {
		const postTrack = await postPrivateTrackApi(trackData, token)
		const putAudio = await updateTrackAudioApi(postTrack.track._id, data.audio, token)
		if (putAudio.status === 200) {
			message.success(`Artist updated`)
			return dispatch({
				type: MyLibraryTypes.POST_PRIVATE_TRACK,
				payload: putAudio.track
			})
		} else {
			message.error(`Server error`)
		}
		return
	} catch (err) {
		message.error(`Server error ${err}`)
	}
}

