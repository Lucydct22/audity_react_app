import { getTracksApi } from "api/music/tracks";
import makeArrayOfTrackIds from "utils/tracks/makeArrayOfTrackIds";
import shuffleArray from "utils/tracks/shuffleArray";
import * as CurrentTracklistReducer from './currentTracklistTypes';
import { getAlbumByIdApi } from "api/music/albums";
import { getArtistByIdApi } from "api/music/artists";
import { getTrackByIdApi } from "api/music/tracks";

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

export const selectTrackAction = async function (dispatch: any, trackId: any) {
	const response: any = await getTrackByIdApi(trackId)
	return dispatch({
		type: CurrentTracklistReducer.SELECT_CURRENT_TRACKLIST,
		payload: {
			listType: 'track',
			listId: response.track._id,
			listName: response.track.name,
      tracks: response.track.tracks,
		}
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

export const selectAlbumAction = async function (dispatch: any, albumId: any) {
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

export const selectArtistAction = async function (dispatch: any, artistId: any) {
const response: any = await getArtistByIdApi(artistId);
return dispatch({
  type: CurrentTracklistReducer.SELECT_CURRENT_TRACKLIST,
  payload: {
    listType: "artist",
    listId: response.artist._id,
    listName: response.artist.name,
    tracks: response.artist.tracks,
  },
});
}

export const selectPlaylistAction = function (dispatch: any, playlistId: any) {

}

export const selectGenreAction = function (dispatch: any, genreId: any) {

}