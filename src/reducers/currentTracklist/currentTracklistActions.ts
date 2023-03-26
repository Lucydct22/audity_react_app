import { getTracksApi } from "../../api/music/tracks";
import makeArrayOfTrackIds from "../../utils/tracks/makeArrayOfTrackIds";
import shuffleArray from "../../utils/tracks/shuffleArray";
import * as CurrentTracklistReducer from './currentTracklistTypes';


export const initCurrentTracklistAction = function (dispatch: any) {
	getTracksApi().then(async tracksResponse => {
		const tracklist = makeArrayOfTrackIds(tracksResponse);
		return dispatch({
			type: CurrentTracklistReducer.INIT_CURRENT_TRACKLIST,
			payload: { listType: 'all', listId: 'all-songs', tracks: tracklist }
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