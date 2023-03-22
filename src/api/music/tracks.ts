import { basePath } from "../utils/config";
import { Track } from "../../interfaces/music";


export const getTracksApi = async (): Promise<Track> => {
	const response = await fetch(`${basePath}/tracks`)
	const data = await response.json()
	return data as Track
}

export const getTrackByIdApi = async (trackId: string): Promise<Track> => {
	const response = await fetch(`${basePath}/tracks/${trackId}`)
	const data = await response.json()
	return data as Track
}

//DELETE
export const deleteTrackByIdApi = async (trackId: string): Promise<Track> => {
	const params = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	}
	const response = await fetch(`${basePath}/tracks/${trackId.toString()}`, params)
	const data = await response.json()
	return data as Track
}

//UPDATE 
export const updateTrackApi = async (trackId: string, data: Partial<Track>): Promise<Track> => {
	const params = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}
	const response = await fetch(`${basePath}/tracks/${trackId}`, params)
	const result = await response.json()
	return result as Track
}

//ADD
export const addTrackApi = async (newTrack: Partial<Track>): Promise<Track> => {
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newTrack),
	}
	const response = await fetch(`${basePath}/track`, params)
	const data = await response.json()
	return data as Track
}

//LIKE TRACK API
export const likeDislikeTrackApi = async (trackId: string, data: any): Promise<Track> => {
	const response = await fetch(`${basePath}/tracks/${trackId}`);
	const result = await response.json();

	let oldLikes = result.likes;
	const haveLike = oldLikes.includes(data.likeuserId);

	if (!haveLike) {
		oldLikes.push(data.likeuserId)
	} else {
		oldLikes.forEach((like: string, index: number) => {
			if (like == data.likeuserId)
				oldLikes.splice(index, 1)
		});
	}

	const newLikes = {
		...result,
		likes: oldLikes
	}

	const params = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newLikes),
	}
	const responsePut = await fetch(`${basePath}/tracks/${trackId}`, params)
	const resultPut = await responsePut.json()
	return resultPut as Track
}