import { getTracksApi } from "../../api/music/tracks";
import makeArrayOfTrackIds from "../../utils/tracks/makeArrayOfTrackIds";
import shuffleArray from "../../utils/tracks/shuffleArray";
import * as CurrentTracksListReducer from './currentTracksListTypes';


export const initCurrentTracksListAction = function (dispatch: any) {
	getTracksApi().then(async tracksResponse => {
		const tracksList = makeArrayOfTrackIds(tracksResponse);
		return dispatch({
			type: CurrentTracksListReducer.INIT_CURRENT_TRACKS_LIST,
			payload: { listType: 'all', listId: 'all-songs', tracks: tracksList }
		})
	})
}

export const shuffleTracksListAction = function (dispatch: any, tracksListState: any) {
	const orderedTracksList = function () {
		if (tracksListState.shuffle) {
			return tracksListState.tracks.sort((a: number, b: number) => { return a - b });
		} else {
			return shuffleArray(tracksListState.tracks);
		}
	}

	return dispatch({
		type: CurrentTracksListReducer.SHUFFLE_TRACKS_LIST,
		payload: { tracks: orderedTracksList() }
	})
}