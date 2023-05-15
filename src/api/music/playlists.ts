import { getContentLikedByUserId } from "api/utils/methods";
import { basePath } from "../utils/config";
import { Playlist } from "interfaces/music";
import { params } from "api/utils/utils";

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

// export const deletePlaylistByIdApi = async (playlistId: string): Promise<Playlist> => {
// 	const params = {
// 		method: "DELETE",
// 		headers: {
// 			"Content-Type": "application/json",
// 		}
// 	}
// 	const response = await fetch(`${basePath}/playlists/${playlistId.toString()}`, params)
// 	const data = await response.json()
// 	return data as Playlist
// }

// //UPDATE
// export const updatePlaylistApi = async (playlistId: string, data: Partial<Playlist>): Promise<Playlist> => {
// 	const params = {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	}
// 	const response = await fetch(`${basePath}/playlists/${playlistId}`, params)
// 	const result = await response.json()
// 	return result as Playlist
// }

// //ADD
// export const addPlaylistApi = async (newPlaylist: Partial<Playlist>): Promise<Playlist> => {
// 	const params = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(newPlaylist),
// 	}
// 	const response = await fetch(`${basePath}/playlists`, params)
// 	const data = await response.json()
// 	return data as Playlist
// }
