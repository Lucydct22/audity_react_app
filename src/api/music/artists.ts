import { basePath } from "../utils/config";
import { Artist } from "interfaces/music";


export const getArtistApi = async (): Promise<Artist> => {
	const response = await fetch(`${basePath}/artists`)
	const data = await response.json()
	return data as Artist
}

export const getArtistByIdApi = async (artistId: string): Promise<Artist> => {
	const response = await fetch(`${basePath}/artists/${artistId}`)
	const data = await response.json()
	return data as Artist
}

export const deleteArtistByIdApi = async (artistId: string): Promise<Artist> => {
	const params = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	}
	const response = await fetch(`${basePath}/artists/${artistId.toString()}`, params)
	const data = await response.json()
	return data as Artist
}

//UPDATE
export const updateArtistApi = async (artistId: string, data: Partial<Artist>): Promise<Artist> => {
	const params = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/s/${artistId}`, params)
	const result = await response.json()
	return result as Artist
}

//ADD
export const addArtistApi = async (newArtist: Partial<Artist>): Promise<Artist> => {
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newArtist),
	}
	const response = await fetch(`${basePath}/artists`, params)
	const data = await response.json()
	return data as Artist
}