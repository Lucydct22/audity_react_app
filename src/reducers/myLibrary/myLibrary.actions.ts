import { getAlbumsLikedByUserApi } from 'api/music/albums';
import * as MyLibraryTypes from './myLibrary.types'
import { getArtistsLikedByUserApi } from 'api/music/artists';
import { getPlaylistByUserApi, getPlaylistsLikedByUserApi, postPlaylistApi, putTrackToPlaylistApi } from 'api/music/playlists';
import { getPrivateTracksApi, getTracksLikedByUserApi, likeDislikeTrackApi, postPrivateTrackApi, updateTrackAudioApi } from 'api/music/tracks';
import { message } from 'antd';

export async function initMyLibraryAction(dispatch: any, token: any, dbUserId: any) {
	try {
		const albumsFetch = await getAlbumsLikedByUserApi(dbUserId, token)
		const artistsFetch = await getArtistsLikedByUserApi(dbUserId, token)
		const playlistsFetch = await getPlaylistsLikedByUserApi(dbUserId, token)
		const tracksFetch = await getTracksLikedByUserApi(dbUserId, token)
		const playlistsByUserFetch = await getPlaylistByUserApi(dbUserId, token)
		const privateTracksFetch: any = await getPrivateTracksApi(dbUserId, token)
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
		message.error(`Server error`)
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
		message.error(`Server error`)
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
		message.error(`Server error`)
	}
}

export async function putTrackToPlaylistAction(dispatch: any, token: any, playlistId: string, trackId: string) {
	try {
		const response = await putTrackToPlaylistApi(token, playlistId, trackId)
		if (response.status === 200) {
			return dispatch({
				type: MyLibraryTypes.PUT_TRACK_TO_PLAYLIST,
				payload: {
					playlist: response.playlist
				}
			})
		}
	} catch (err) {
		message.error(`Server error`)
	}
}

export async function likeDislikeTrackAction(
	dispatch: any,
	track: any,
	userId: any,
	userState: any,
	token: string
) {
	try {
		const response = await likeDislikeTrackApi(track._id, userId, token)
		if (response.status === 200) {
			if (response.haveLike === true) {
				return dispatch({
					type: MyLibraryTypes.LIKE_TRACK,
					payload: track
				})
			} else {
				const filterUserState = userState.tracks.content.filter((trackF: any) => trackF._id !== track._id)
				if (filterUserState.length > 0) {
					return dispatch({
						type: MyLibraryTypes.DISLIKE_TRACK,
						payload: filterUserState
					})
				}
			}
		}
	} catch (err) {
		message.error(`Server error`)
	}
}