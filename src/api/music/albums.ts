import { getContentLikedByUserId } from "api/utils/methods";
import { basePath } from "../utils/config";
import { Albums } from "interfaces/music";
import makeRequest from "api/utils/makeRequest";


export const getAlbumsApi = async (): Promise<Albums> => {
	const response = await fetch(`${basePath}/albums`)
	const data = await response.json()
	return data as Albums
}

export const getAlbumByIdApi = async (albumId: string): Promise<Albums> => {
	const response = await fetch(`${basePath}/album/${albumId}`)
	const data = await response.json()
	return data
}

export const getAlbumsLikedByUserApi = async (userId: any, token: string): Promise<any> => {
	return await getContentLikedByUserId(userId, 'albums', token)
}

export const postAlbumApi = async (album: any, token: any): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(album),
	}
	const response = await fetch(`${basePath}/album`, params)
	const data = await response.json()
	return data
}

export const putAlbumImageApi = async (albumId: string, image: any, token: any): Promise<any> => {
	const url = `${basePath}/album-image/${albumId}`;
	const formData = new FormData();
	formData.append("image", image);
	return makeRequest(url, true, true, "PUT", token, formData, '');
}

export const updateAlbumApi = async (albumId: string, data: any, token: any): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/album/${albumId}`, params)
	const result = await response.json()
	return result
}

export const deleteAlbumByIdApi = async (album: any, token: any): Promise<any> => {
	const params = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}
	const response = await fetch(`${basePath}/album/${album._id}`, params)
	const result = await response.json()
	return result
}

export const likeDislikeAlbumApi = async (albumId: string, userId: any, token: any): Promise<any> => {
	const params = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}
	const response = await fetch(`${basePath}/like-dislike-album/${albumId}/${userId}`, params)
	const result = await response.json()
	return result
} 