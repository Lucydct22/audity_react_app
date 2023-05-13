import makeRequest from "api/utils/makeRequest";
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


export const deleteGenreByIdApi = async (genre: any, token: any): Promise<any> => {
	const params = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({imagePublicId: genre.imagePublicId}),
	}
	const response = await fetch(`${basePath}/delete-genre/${genre._id}`, params)
	const result = await response.json()
	return result as Genres
}

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

export const postGenreApi = async (genre: any, token: any): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(genre),
	}
	const response = await fetch(`${basePath}/genre`, params)
	const data = await response.json()
	return data as Genres
}

export const postGenreImageApi = async (genreId: string, image: any, token: any): Promise<any> => {
	const url = `${basePath}/genre-image/${genreId}`;
	const formData = new FormData();
	formData.append("image", image);
	return makeRequest(url, true, true, "PUT", token, formData, '');
}