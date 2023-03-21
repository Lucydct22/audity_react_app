import { basePath } from "../utils/config";
import { Track } from "../../interfaces/music";

// export function getTracksApi() {
// 	const url = `${basePath}/tracks`;
// 	return fetch(url)
// 		.then(response => { return response.json() })
// 		.then((result: Track) => { return result })
// }

//pokemon example 

// export const getPokemonByName = async (name: string):Promise<IPokemon> => {
//   const response = await fetch(`${process.env.REACT_APP_API_URL}/pokemon/${name}`)
//   const data = await response.json()
//   return data as IPokemon
// }

// interface IPokemonCardProps {
//   name: string,
//   type: string,
//   image: string
// }


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
	const response = await fetch(`${basePath}/track/${trackId}`, params)
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