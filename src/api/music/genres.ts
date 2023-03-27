import { basePath } from "../utils/config";
import { Genres } from "../../interfaces/music";


export const getGenresApi = async (): Promise<Genres> => {
	const response = await fetch(`${basePath}/genres`)
	const data = await response.json()
	return data as Genres
}

export const getGenresByIdApi = async (genresId: string): Promise<Genres> => {
	const response = await fetch(`${basePath}/genres/${genresId}`)
	const data = await response.json()
	return data as Genres
}

export const deleteGenresByIdApi = async (genresId: string): Promise<Genres> => {
	const params = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	}
	const response = await fetch(`${basePath}/genres/${genresId.toString()}`, params)
	const data = await response.json()
	return data as Genres
}

//UPDATE
export const updateGenresApi = async (genresId: string, data: Partial<Genres>): Promise<Genres> => {
	const params = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/genres/${genresId}`, params)
	const result = await response.json()
	return result as Genres
}

//ADD
export const addGenresApi = async (newGenres: Partial<Genres>): Promise<Genres> => {
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newGenres),
	}
	const response = await fetch(`${basePath}/genres`, params)
	const data = await response.json()
	return data as Genres
}