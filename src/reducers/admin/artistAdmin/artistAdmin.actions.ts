import { message } from 'antd';
import * as ArtistAdminTypes from './artistAdmin.types'
import * as api from 'api/music/artists';

export async function initArtistsAction(dispatch: any) {
	try {
		const response: any = await api.getArtistApi()
		if (response.status === 200) {
			return dispatch({
				type: ArtistAdminTypes.INIT_ARTISTS,
				payload: response.artists
			})
		} else {
			message.error('Server error')
		}
	} catch (err) {
		message.error('Server error')
	}
}

export async function postArtistAction(dispatch: any, data: any, token: any, messageApi: any) {
	try {
		const postArtist: any = await api.postArtistApi({
			name: data.name,
			genres: data?.genres,
			albums: data?.albums,
			tracks: data?.tracks
		}, token)
		const postArtistImage: any = await api.putArtistImageApi(postArtist.artist._id, data.image.file.originFileObj, token)
		if (postArtistImage.status === 200) {
			messageApi.destroy()
			messageApi.success(`Artist '${data.name}' created`)
			return dispatch({
				type: ArtistAdminTypes.POST_ARTIST,
				payload: postArtistImage.artist
			})
		} else {
			messageApi.destroy()
			messageApi.error('Server error')
		}
	} catch (err) {
		messageApi.destroy()
		message.error('Server error')
	}
}

export async function deleteArtistAction(dispatch: any, artist: any, token: any, artistsState: any, messageApi: any) {
	try {
		const artistToDelete: any = await api.deleteArtistByIdApi(artist, token)
		if (artistsState.artists.length > 0 || artistToDelete.status === 200) {
			const filteredArtists = artistsState.artists.filter((item: any) => item._id !== artist._id)
			messageApi.destroy()
			message.success(`artist deleted`)
			return dispatch({
				type: ArtistAdminTypes.DELETE_ARTIST,
				payload: filteredArtists
			})
		} else {
			messageApi.destroy()
			message.error('Server error')
		}
	} catch (err) {
		messageApi.destroy()
		message.error('Server error')
	}
}

export async function updateArtistAction(dispatch: any, data: any, artist: any, token: any, artistsState: any, messageApi: any) {
	try {
		let newArtist;
		let values = {
			name: data?.name,
			genres: data?.genres,
			albums: data?.albums,
			tracks: data?.tracks,
			imagePublicId: null
		}
		if (data.image?.file.originFileObj) {
			const artistImageToUpdate = await api.putArtistImageApi(artist._id, data.image.file.originFileObj, token)
			newArtist = artistImageToUpdate
			values.imagePublicId = artist.imagePublicId
		}
		if (data?.name || data?.genres || data?.albums || data?.tracks) {
			const artistToUpdate = await api.updateArtistApi(artist._id, values, token)
			newArtist = artistToUpdate
		}
		const findIndexArtist = artistsState.artists.findIndex((item: any) => item._id === artist._id)
		if (newArtist.artist) {
			artistsState.artists[findIndexArtist] = newArtist.artist
		} else {
			artist.name = data?.name
			artist.genres = data?.genres
			artist.albums = data?.albums
			artist.tracks = data?.tracks
			artistsState.artists[findIndexArtist] = artist
		}
		if (newArtist.status === 200) {
			messageApi.destroy()
			message.success(`Artist updated`)
			return dispatch({
				type: ArtistAdminTypes.UPDATE_ARTIST,
				payload: artistsState
			})
		}
	} catch (err) {
		messageApi.destroy()
		message.info(`Nothing to update`)
	}
}