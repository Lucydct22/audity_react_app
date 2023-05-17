import { message } from 'antd';
import * as PlaylistAdminTypes from './playlistAdmin.types'
import * as api from 'api/music/playlists';

export async function initPlaylistsAction(dispatch: any, token: any) {
	try {
		const response: any = await api.getAllPlaylistsApi(token)
		if (response.status === 200) {
			return dispatch({
				type: PlaylistAdminTypes.INIT_PLAYLISTS,
				payload: response.playlists
			})
		} else {
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		message.error('Server error')
	}
}

export async function postPlaylistAction(dispatch: any, userId: any, data: any, token: any, messageApi: any) {

	try {
		const postPlaylist: any = await api.postPlaylistAdminApi({
			userId,
			name: data?.name,
			description: data?.description,
			tracks: data?.tracks,
		}, token)
		const postPlaylistImage: any = await api.updatePlaylistImageApi(postPlaylist.playlist._id, data.image.file.originFileObj, token)
		if (postPlaylistImage.status === 200) {
			messageApi.destroy()
			messageApi.success(`Playlist '${data.name}' created`)
			return dispatch({
				type: PlaylistAdminTypes.POST_PLAYLIST,
				payload: postPlaylistImage.playlist
			})
		} else {
			messageApi.destroy()
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		messageApi.destroy()
		message.error('Server error')
	}
}

export async function deletePlaylistAction(dispatch: any, playlist: any, userId: string, token: any, playlistsState: any, messageApi: any) {
	try {
		const playlistToDelete: any = await api.deletePlaylistByIdApi(playlist._id, userId, token)
		if (playlistsState.playlists.length > 0 || playlistToDelete.status === 200) {
			const filteredPlaylists = playlistsState.playlists.filter((item: any) => item._id !== playlist._id)
			messageApi.destroy()
			message.success(`Playlist deleted`)
			return dispatch({
				type: PlaylistAdminTypes.DELETE_PLAYLIST,
				payload: filteredPlaylists
			})
		} else {
			messageApi.destroy()
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		messageApi.destroy()
		message.error('Server error')
	}
}

export async function updatePlaylistAction(dispatch: any, data: any, playlist: any, token: any, playlistsState: any, messageApi: any) {
	try {
		let newPlaylist;
		let values = {
			name: data?.name,
			description: data?.description,
			tracks: data?.tracks,
			publicAccessible: data?.publicAccessible,
		}
		if (data.image?.file.originFileObj) {
			const playlistImageToUpdate = await api.updatePlaylistImageApi(playlist._id, data.image.file.originFileObj, token)
			newPlaylist = playlistImageToUpdate
		}
		if (data?.name || data?.description || data?.tracks || data?.publicAccessible) {
			const playlistToUpdate = await api.updatePlaylistAdminApi(playlist._id, values, token)
			newPlaylist = playlistToUpdate
		}
		if (newPlaylist.status === 200 && newPlaylist.playlist) {
			const findIndexPlaylist = playlistsState.playlists.findIndex((item: any) => item._id === playlist._id)
			playlistsState.playlists[findIndexPlaylist] = newPlaylist.playlist
			messageApi.destroy()
			message.success(`Playlist updated`)
			return dispatch({
				type: PlaylistAdminTypes.UPDATE_PLAYLIST,
				payload: playlistsState
			})
		} else {
			messageApi.destroy()
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		messageApi.destroy()
		message.error(`Server error`)
	}
}

export async function updatePlaylistPublicAccessibleAction(playlist: any, publicAccessible: boolean, token: any, messageApi: any) {
	try {
		const updatePublicAccessible = await api.updatePlaylistPublicAccessibleApi(playlist._id, publicAccessible, token)
		if (updatePublicAccessible.status === 200) {
			messageApi.destroy()
			message.success(`Playlist updated`)
		} else {
			messageApi.destroy()
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		messageApi.destroy()
		message.info(`Nothing to update`)
	}
}