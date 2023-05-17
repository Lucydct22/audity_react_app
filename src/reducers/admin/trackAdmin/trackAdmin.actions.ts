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
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		message.error('Server error')
	}
}

export async function postTrackAction(dispatch: any, data: any, token: any, messageApi: any) {
	try {
		const postTrack: any = await api.postTrackApi({
			name: data?.name,
			genres: data?.genres,
			artists: data?.artists,
			album: data?.album,
			playlists: data?.playlists
		}, token)
		const postTrackImage: any = await api.updateTrackImageApi(postTrack.track._id, data.image.file.originFileObj, token)
		const postTrackAudio: any = await api.updateTrackAudioApi(postTrack.track._id, data.audio.file.originFileObj, token)
		if (postTrackImage.status === 200 && postTrackAudio.track) {
			messageApi.destroy()
			message.success(`Track '${data.name}' created`)
			return dispatch({
				type: TrackAdminTypes.POST_TRACK,
				payload: postTrackAudio.track
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

export async function deleteTrackAction(dispatch: any, track: any, token: any, tracksState: any, messageApi: any) {
	try {
		const trackToDelete: any = await api.deleteTrackByIdApi(track._id, token)
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
			message.warning(`Something went wrong`)
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
			name: data?.name,
			genres: data?.genres,
			album: data?.album,
			artists: data?.artists,
			playlists: data?.playlists
		}
		if (data.image?.file.originFileObj) {
			const trackImageToUpdate = await api.updateTrackImageApi(track._id, data.image.file.originFileObj, token)
			newTrack = trackImageToUpdate
		}
		if (data.audio?.file.originFileObj) {
			const trackAudioToUpdate = await api.updateTrackAudioApi(track._id, data.audio.file.originFileObj, token)
			newTrack = trackAudioToUpdate
		}
		if (data.name && data.name !== track.name || data.genres || data.album || data.artists || data.playlists) {
			const trackToUpdate = await api.updateTrackApi(track._id, values, token)
			newTrack = trackToUpdate
		}
		if (newTrack.status === 200 && newTrack.track) {
			const findIndexTrack = tracksState.tracks.findIndex((item: any) => item._id === track._id)
			tracksState.tracks[findIndexTrack] = newTrack.track
			messageApi.destroy()
			message.success(`Track updated`)
			return dispatch({
				type: TrackAdminTypes.UPDATE_TRACK,
				payload: tracksState
			})
		} else {
			messageApi.destroy()
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		messageApi.destroy()
		message.error(`Nothing to update`)
	}
}