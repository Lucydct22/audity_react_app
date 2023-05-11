import { getContentLikedByUserId } from "api/utils/methods";
import { basePath } from "../utils/config";
import { Albums } from "interfaces/music";


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

// export const deleteAlbumsByIdApi = async (albumsId: string): Promise<Albums> => {
// 	const params = {
// 		method: "DELETE",
// 		headers: {
// 			"Content-Type": "application/json",
// 		}
// 	}
// 	const response = await fetch(`${basePath}/albums/${albumsId.toString()}`, params)
// 	const data = await response.json()
// 	return data as Albums
// }

// export const updateAlbumApi = async (albumId: string, data: Partial<Albums>): Promise<Albums> => {
// 	const params = {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	}
// 	const response = await fetch(`${basePath}/albums/${albumId}`, params)
// 	const result = await response.json()
// 	return result as Albums
// }

// export const addAlbumApi = async (newAlbum: Partial<Albums>): Promise<Albums> => {
// 	const params = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(newAlbum),
// 	}
// 	const response = await fetch(`${basePath}/albums`, params)
// 	const data = await response.json()
// 	return data as Albums
// }