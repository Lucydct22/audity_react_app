import { getTracksApi } from "api/music/tracks";
import makeArrayOfTrackIds from "utils/tracks/makeArrayOfTrackIds";
import shuffleArray from "utils/tracks/shuffleArray";
import * as CurrentTracklistReducer from './currentTracklistTypes';
import { getAlbumByIdApi } from "api/music/albums";

export const initCurrentTracklistAction = function (dispatch: any) {
	getTracksApi().then(async (tracksResponse: any) => {
		const tracklist = makeArrayOfTrackIds(tracksResponse.tracks);
		return dispatch({
			type: CurrentTracklistReducer.INIT_CURRENT_TRACKLIST,
			payload: {
				listType: 'all',
				listId: 'all-songs',
				listName: 'All songs',
				tracks: tracklist
			}
		})
	})
}

export const shuffleTracklistAction = function (dispatch: any, tracklistState: any) {
	const orderedTracklist = function () {
		if (tracklistState.shuffle) {
			return tracklistState.tracks.sort((a: number, b: number) => { return a - b });
		} else {
			return shuffleArray(tracklistState.tracks);
		}
	}
	return dispatch({
		type: CurrentTracklistReducer.SHUFFLE_TRACKLIST,
		payload: { tracks: orderedTracklist() }
	})
}

export const selectAlbumAction = async function (dispatch: any, albumId: any, selectCurrentTrack: any) {
	const response: any = await getAlbumByIdApi(albumId)
	return dispatch({
		type: CurrentTracklistReducer.SELECT_CURRENT_TRACKLIST,
		payload: {
			listType: 'album',
			listId: response.album._id,
			listName: response.album.name,
			tracks: response.album.tracks
		}
	})

}

export const selectArtistAction = function (dispatch: any, artistId: any) {

}

export const selectPlaylistAction = function (dispatch: any, playlistId: any) {

}

export const selectGenreAction = function (dispatch: any, genreId: any) {

}