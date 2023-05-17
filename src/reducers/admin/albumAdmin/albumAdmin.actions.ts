import { message } from 'antd';
import * as AlbumAdminTypes from './albumAdmin.types'
import * as api from 'api/music/albums';

export async function initAlbumsAction(dispatch: any) {
	try {
		const response: any = await api.getAlbumsApi()
		if (response.status === 200) {
			return dispatch({
				type: AlbumAdminTypes.INIT_ALBUMS,
				payload: response.albums
			})
		} else {
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		message.error('Server error')
	}
}

export async function postAlbumAction(dispatch: any, data: any, token: any, messageApi: any) {
	try {
		const postAlbum: any = await api.postAlbumApi({ name: data.name, genres: data.genres }, token)
		const postAlbumImage: any = await api.putAlbumImageApi(postAlbum.album._id, data.image.file.originFileObj, token)
		if (postAlbumImage.status === 200) {
			messageApi.destroy()
			messageApi.success(`Album '${data.name}' created`)
			return dispatch({
				type: AlbumAdminTypes.POST_ALBUM,
				payload: postAlbumImage.album
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

export async function deleteAlbumAction(dispatch: any, album: any, token: any, albumsState: any, messageApi: any) {
	try {
		const albumToDelete: any = await api.deleteAlbumByIdApi(album, token)
		if (albumsState.albums.length > 0 || albumToDelete.status === 200) {
			const filteredAlbums = albumsState.albums.filter((item: any) => item._id !== album._id)
			messageApi.destroy()
			message.success(`Album deleted`)
			return dispatch({
				type: AlbumAdminTypes.DELETE_ALBUM,
				payload: filteredAlbums
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

export async function updateAlbumAction(dispatch: any, data: any, album: any, token: any, albumsState: any, messageApi: any) {
	try {
		let newAlbum;
		let values = {
			name: data?.name,
			genres: data?.genres,
			artists: data?.artists,
			tracks: data?.tracks,
		}
		if (data.image?.file.originFileObj) {
			const albumImageToUpdate = await api.putAlbumImageApi(album._id, data.image.file.originFileObj, token)
			newAlbum = albumImageToUpdate
		}
		if (data?.name || data?.genres || data?.tracks || data?.artists) {
			const albumToUpdate = await api.updateAlbumApi(album._id, values, token)
			newAlbum = albumToUpdate
		}
		if (newAlbum.status === 200 && newAlbum.album) {
			const findIndexAlbum = albumsState.albums.findIndex((item: any) => item._id === album._id)
			albumsState.albums[findIndexAlbum] = newAlbum.album
			messageApi.destroy()
			message.success(`Album updated`)
			return dispatch({
				type: AlbumAdminTypes.UPDATE_ALBUM,
				payload: albumsState
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