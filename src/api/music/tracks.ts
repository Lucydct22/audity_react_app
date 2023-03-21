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

//LIKE TRACK API
// export const likeTrackApi = async (trackId: string, userId: string): Promise<Track> => {
// 	const track = await getTrackByIdApi(trackId);
// 	const updatedLikes = [...track.likes, userId];
// 	const updatedTrack = { ...track, likes: updatedLikes };

// update the track with the new data
// 	const response = await updateTrackApi(trackId, updatedTrack);
// 	return response;
// }
//La funcion "likeTrackApi" da dos cosas:
//el ID de la cancion y el ID del user que la ha 'me gusta'.
//La funcion hace esto por "getTrackByIdApi"
//que encuentra la canción que quiere dar el like.
//Luego, la funcion pone el ID del user a la lista de me gusta de la cancion.
//Por eso la función utiliza el '...' para crear una nueva lista que anade la lista original de 'me gusta' mas el nuevo userID.
//La funcion crea un nuevo objeto que incluye la cancion original y la nueva lista de me gusta.
//y la funcion llama a otra funcion "updateTrackApi" para guardar la nueva lista de me gusta en la base de datos.


//REMOVE LIKE TRACK API
// export const unlikeTrackApi = async (trackId: string, userId: string): Promise<Track> => {
// 	const track = await getTrackByIdApi(trackId);
// 	const updatedLikes = track.likes.filter(id => id !== userId);
// 	const updatedTrack = { ...track, likes: updatedLikes };

// update the track with the new data
// 	const response = await updateTrackApi(trackId, updatedTrack);
// 	return response;
// }

//Esta funcion cambia la lista de aprobaciones de una track (cancion) eliminando el like del usuer
//y actualiza la info de la track en la base de datos.
//Esto se hace en varios pasos:
//1- Se coge la info de la track correspondiente usando el trackId.
//2- Se elimina el ID del user que ha dado su like de la lista de likes de la track usando el filter.
//3- Se crea un objeto updatedTrack que es una copia de la cancion original pero con la lista de likes actualizada sin el user que ya no la aprueba.
//4. La informacion de la track se actualiza en la base de datos llamando a updateTrackApi con el ID de la track y el updatedTrack.
//5. La funcion devuelve la respuesta deupdateTrackApi.

// export const likeTrackApi = async (trackId: string, userId: string): Promise<Track> => {
// 	const response = await fetch(`${basePath}/tracks/${trackId}/like/${userId}`, { method: 'PUT' });
// 	const data = await response.json();
// 	return data as Track;
// }

// export const dislikeTrackApi = async (trackId: string, userId: string): Promise<Track> => {
// 	const response = await fetch(`${basePath}/tracks/${trackId}/like/${userId}`, { method: 'DELETE' });
// 	const data = await response.json();
// 	return data as Track;
// }

// export const likeTrackApi = async (trackId: string, user: { id: string, name: string }): Promise<Track> => {
// 	const existingTrack = await getTrackByIdApi(trackId);
// 	const updatedLikedBy = [...existingTrack.likedBy, user];

// 	const params = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({ likedBy: updatedLikedBy }),
// 	}

// 	const response = await fetch(`${basePath}/track/${trackId}/like`, params); // make a POST request to the server to update the track
// 	const result = await response.json();

// 	return result as Track; // return the updated track
//}

// first I call the getTrackByIdApi function to
//retrieve the existing track data. Then, I create a new likedBy array by
//spreading the existing likedBy array and adding the new user.I create then
//an object with the likedBy array and make a POST request to the server to
//update the track with the new likedBy array using the /track/${trackId}/like endpoint.
// Finally, the function returns the updated track data.

// export const likeTrackApi = async (trackId: string, userId: string): Promise<Track> => {
// 	const response = await fetch(`${basePath}/tracks/${trackId}/like`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({ userId, name: "" }),
// 	});
// 	const data = await response.json();
// 	return data as Track;
// };


