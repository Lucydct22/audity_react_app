import { getContentLikedByUserId } from "api/utils/methods";
import { basePath } from "../utils/config";
import { Artist, Track } from "interfaces/music";
import makeRequest from "api/utils/makeRequest";


export const getArtistApi = async (): Promise<Artist> => {
	const response = await fetch(`${basePath}/artists`)
	const data = await response.json()
	return data as Artist
}

export const getArtistByIdApi = async (artistId: string): Promise<Artist> => {
	const response = await fetch(`${basePath}/artist/${artistId}`)
	const data = await response.json()
	return data as Artist
}

export const getArtistsLikedByUserApi = async (userId: any, token: string): Promise<any> => {
	return await getContentLikedByUserId(userId, 'artists', token)
}

export const getTracksArtistById = async (artistId: string): Promise<{ artists: Artist; track: Track[] }> => {
	const response = await fetch(`${basePath}/artist/${artistId}/tracks`)
	const data = await response.json()
	return data as { artists: Artist; track: Track[] }
}

export const postArtistApi = async (artist: any, token: any): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(artist),
	}
	const response = await fetch(`${basePath}/artist`, params)
	const data = await response.json()
	return data
}

export const putArtistImageApi = async (artistId: string, image: any, token: any): Promise<any> => {
	const url = `${basePath}/artist-image/${artistId}`;
	const formData = new FormData();
	formData.append("image", image);
	return makeRequest(url, true, true, "PUT", token, formData, '');
}

export const updateArtistApi = async (artistId: string, data: any, token: any): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/artist/${artistId}`, params)
	const result = await response.json()
	return result
}

export const deleteArtistByIdApi = async (artist: any, token: any): Promise<any> => {
	const params = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ imagePublicId: artist.imagePublicId }),
	}
	const response = await fetch(`${basePath}/artist/${artist._id}`, params)
	const result = await response.json()
	return result
}