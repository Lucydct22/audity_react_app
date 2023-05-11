import { basePath } from "../utils/config";
import { Genres, Genre, Playlist, Albums, Artist } from "interfaces/music";


export const getGenresApi = async (): Promise<Genres> => {	
	const response = await fetch(`${basePath}/genres`)
	const data = await response.json()
	return data as Genres
}

export const getGenreByIdApi = async (genreId: string): Promise<Genre> => {
	const response = await fetch(`${basePath}/genre/${genreId}`)
	const data = await response.json()
	return data as Genre
}

export const getGenrePlaylistById = async (genreId: string): Promise<{ genre: Genre; playlists: Playlist[] }> => {
	const response = await fetch(`${basePath}/genre/${genreId}/playlists`)
	const data = await response.json()
	return data as { genre: Genre; playlists: Playlist[] }
}

export const getGenreAlbumById = async (genreId: string): Promise<{ genre: Genre; albums: Albums[] }> => {
	const response = await fetch(`${basePath}/genre/${genreId}/albums`)
	const data = await response.json()
	return data as { genre: Genre; albums: Albums[] }
}

export const getGenreArtistById = async (genreId: string): Promise<{ genre: Genre; artists: Artist[] }> => {
	const response = await fetch(`${basePath}/genre/${genreId}/artists`)
	const data = await response.json()
	return data as { genre: Genre; artists: Artist[] }
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