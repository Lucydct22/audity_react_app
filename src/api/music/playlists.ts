import { getContentLikedByUserId } from "api/utils/methods";
import { basePath } from "../utils/config";
import { Playlist } from "interfaces/music";
import { params } from "api/utils/utils";
import makeRequest from "api/utils/makeRequest";

export const postPlaylistApi = async (playlistData: any, token: string): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(playlistData),
	}
	const response = await fetch(`${basePath}/playlist`, params)
	const data = await response.json()
	return data
}

export const getPlaylistApi = async (): Promise<Playlist> => {
	const response = await fetch(`${basePath}/playlists`)
	const data = await response.json()
	return data as Playlist
}

export const getPlaylistByIdApi = async (playlistId: string): Promise<Playlist> => {
	const response = await fetch(`${basePath}/playlist/${playlistId}`)
	const data = await response.json()
	return data as Playlist
}

export const getPlaylistsLikedByUserApi = async (userId: any, token: string): Promise<any> => {
	return await getContentLikedByUserId(userId, 'playlists', token)
}

export const getPlaylistByUserApi = async (userId: string, token: any): Promise<any> => {
	const response = await fetch(`${basePath}/playlists-by-user/${userId}`, params(token))
	const data = await response.json()
	return data
}

export const putTrackToPlaylistApi = async (token: any, playlistId: string, trackId: string): Promise<any> => {
	console.log(token);
	console.log(playlistId);
	console.log(trackId);

	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		}
	}
	const response = await fetch(`${basePath}/playlist-add-track/playlists/${playlistId}/tracks/${trackId}`, params)
	const data = await response.json()
	return data
}

export const deleteTrackFromPlaylist = async (token: any, trackId: string, playlistId: string): Promise<any> => {
	const response = await fetch(`${basePath}/delete-track-from-playlist/${playlistId}/tracks/${trackId}`, params(token))
	const data = await response.json()
	return data
}


export const postPlaylistAdminApi = async (playlistData: any, token: any): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(playlistData),
	}
	const response = await fetch(`${basePath}/playlist-admin`, params)
	const data = await response.json()
	return data
}

export const updatePlaylistAdminApi = async (playlistId: string, data: any, token: any): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/playlist-admin/${playlistId}`, params)
	const result = await response.json()
	return result
}

export const deletePlaylistByIdApi = async (playlistId: any, userId: string, token: any): Promise<any> => {
	const params = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			userId,
		}),
	}
	const response = await fetch(`${basePath}/playlist/${playlistId}`, params)
	const result = await response.json()
	return result
}

export const updatePlaylistImageApi = async (playlistId: string, image: any, token: any): Promise<any> => {
	const url = `${basePath}/playlist-image/${playlistId}`;
	const formData = new FormData();
	formData.append("image", image);
	return makeRequest(url, true, true, "PUT", token, formData, '');
}

export const updatePlaylistPublicAccessibleApi = async (playlistId: string, publicAccessible: any, token: any): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ publicAccessible: publicAccessible }),
	}
	const response = await fetch(`${basePath}/update-public-accessible/${playlistId}`, params)
	const result = await response.json()
	return result
}

export const getAllPlaylistsApi = async (token: any): Promise<any> => {
	const params = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}
	const response = await fetch(`${basePath}/all-playlists`, params)
	const data = await response.json()
	return data
}