import { basePath } from "../utils/config";
import { Playlist } from "../../interfaces/music";


export const getPlaylistApi = async (): Promise<Playlist> => {
	const response = await fetch(`${basePath}/playlist`)
	const data = await response.json()
	return data as Playlist
}

export const getPlaylistByIdApi = async (playlistId: string): Promise<Playlist> => {
	const response = await fetch(`${basePath}/playlist/${playlistId}`)
	const data = await response.json()
	return data as Playlist
}

export const deletePlaylistByIdApi = async (playlistId: string): Promise<Playlist> => {
	const params = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	}
	const response = await fetch(`${basePath}/playlist/${playlistId.toString()}`, params)
	const data = await response.json()
	return data as Playlist
}

//UPDATE 

export const updatePlaylistApi = async (playlistId: string, data: Partial<Playlist>): Promise<Playlist> => {
	const params = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/playlist/${playlistId}`, params)
	const result = await response.json()
	return result as Playlist
}

//ADD

export const addPlaylistApi = async (newPlaylist: Partial<Playlist>): Promise<Playlist> => {
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newPlaylist),
	}
	const response = await fetch(`${basePath}/playlist`, params)
	const data = await response.json()
	return data as Playlist
}