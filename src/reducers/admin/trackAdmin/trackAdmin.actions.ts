import { message } from 'antd';
import * as TrackAdminTypes from './trackAdmin.types'
import * as api from 'api/music/tracks';

export async function initTracksAction(dispatch: any) {
	try {
		const response: any = await api.getTracksApi()
		if (response.status === 200) {
			return dispatch({
				type: TrackAdminTypes.INIT_TRACKS,
				payload: response.tracks
			})
		} else {
			message.error('Server error')
		}
	} catch (err) {
		message.error('Server error')
	}
}

export async function postTrackAction(dispatch: any, data: any, token: any, messageApi: any) {
	try {
		const postTrack: any = await api.postTrackApi({
			name: data.name,
			genres: data.genres,
			artists: data.artists,
			album: data.album,
			playlists: data.playlists
		}, token)
		const postTrackImage: any = await api.updateTrackImageApi(postTrack.track._id, data.image.file.originFileObj, token)
		const postTrackAudio: any = await api.updateTrackAudioApi(postTrack.track._id, data.audio.file.originFileObj, token)
		if (postTrackImage.status === 200) {
			messageApi.destroy()
			messageApi.success(`Track '${data.name}' created`)
			return dispatch({
				type: TrackAdminTypes.POST_TRACK,
				payload: postTrackAudio.track
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

export async function deleteTrackAction(dispatch: any, track: any, token: any, tracksState: any, messageApi: any) {
	try {
		const trackToDelete: any = await api.deleteTrackByIdApi(track, token)
		if (tracksState.tracks.length > 0 || trackToDelete.status === 200) {
			const filteredTracks = tracksState.tracks.filter((item: any) => item._id !== track._id)
			messageApi.destroy()
			message.success(`Track deleted`)
			return dispatch({
				type: TrackAdminTypes.DELETE_TRACK,
				payload: filteredTracks
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

export async function updateTrackAction(dispatch: any, data: any, track: any, token: any, tracksState: any, messageApi: any) {
	try {
		let newTrack;
		let values = {
			name: data.name,
			genres: data.genres,
			album: data.album,
			artists: data.artists,
			playlists: data.playlists,
			imagePublicId: null,
			audioPublicId: null
		}
		if (data.image?.file.originFileObj) {
			const trackImageToUpdate = await api.updateTrackImageApi(track._id, data.image.file.originFileObj, token)
			newTrack = trackImageToUpdate
			values.imagePublicId = track.imagePublicId
		}
		if (data.audio?.file.originFileObj) {
			const trackAudioToUpdate = await api.updateTrackAudioApi(track._id, data.audio.file.originFileObj, token)
			newTrack = trackAudioToUpdate
			values.audioPublicId = track.audioPublicId
		}
		if (data?.name || data?.genres || data?.artists || data?.album || data?.playlists) {
			const trackToUpdate = await api.updateTrackApi(track._id, values, token)
			newTrack = trackToUpdate
		}
		const findIndexTrack = tracksState.tracks.findIndex((item: any) => item._id === track._id)
		if (newTrack.track) {
			tracksState.tracks[findIndexTrack] = newTrack.track
		} else {
			if (data.name) track.name = data.name
			if (data.genres) track.genres = data.genres
			if (data.artists) track.artists = data.artists
			if (data.album) track.album = data.album
			if (data.playlists) track.playlists = data.playlists
			tracksState.tracks[findIndexTrack] = track
		}
		if (newTrack.status === 200) {
			messageApi.destroy()
			message.success(`Track updated`)
			return dispatch({
				type: TrackAdminTypes.UPDATE_TRACK,
				payload: tracksState
			})
		}
	} catch (err) {
		messageApi.destroy()
		message.info(`Nothing to update`)
	}
}