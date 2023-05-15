import { getContentLikedByUserId } from "api/utils/methods";
import { basePath } from "../utils/config";
import { Track } from "interfaces/music";
import makeRequest from "api/utils/makeRequest";


export const getTracksApi = async (): Promise<Track> => {
	const response = await fetch(`${basePath}/tracks`)
	const data = await response.json()
	return data as Track
}

export const getPrivateTracksApi = async (userId: string, token: any): Promise<Track> => {
	const params = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}
	const response = await fetch(`${basePath}/tracks-private/${userId}`, params)
	const data = await response.json()
	return data as Track
}

export const getTrackByIdApi = async (trackId: string): Promise<Track> => {
	const response = await fetch(`${basePath}/track/${trackId}`)
	const data = await response.json()
	return data as Track
}

export const getRandomTrackApi = async (): Promise<Track> => {
	const response = await fetch(`${basePath}/random-track`)
	const data = await response.json()
	return data as Track
}

export const getTracksLikedByUserApi = async (userId: any, token: string): Promise<any> => {
	return await getContentLikedByUserId(userId, 'playlists', token)
}

export const postTrackApi = async (track: any, token: any): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(track),
	}
	const response = await fetch(`${basePath}/track`, params)
	const data = await response.json()
	return data
}

export const updateTrackApi = async (trackId: string, data: any, token: any): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/track/${trackId}`, params)
	const result = await response.json()
	return result
}

export const deleteTrackByIdApi = async (track: any, token: any): Promise<any> => {
	const params = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			imagePublicId: track.imagePublicId,
			audioPublicId: track.audioPublicId
		}),
	}
	const response = await fetch(`${basePath}/track/${track._id}`, params)
	const result = await response.json()
	return result
}

export const updateTrackImageApi = async (trackId: string, image: any, token: any): Promise<any> => {
	const url = `${basePath}/track-image/${trackId}`;
	const formData = new FormData();
	formData.append("image", image);
	return makeRequest(url, true, true, "PUT", token, formData, '');
}

export const updateTrackAudioApi = async (trackId: string, audio: any, token: any): Promise<any> => {
	const url = `${basePath}/track-audio/${trackId}`;
	const formData = new FormData();
	formData.append("audio", audio);
	return makeRequest(url, true, true, "PUT", token, formData, '');
}

export const postPrivateTrackApi = async (trackData: any, token: any): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(trackData),
	}
	const response = await fetch(`${basePath}/track-private`, params)
	const data = await response.json()
	return data
}