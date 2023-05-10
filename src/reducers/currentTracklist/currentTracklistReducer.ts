import * as CurrentTracklistReducer from './currentTracklistTypes';

export default function currentTracklistReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case CurrentTracklistReducer.INIT_CURRENT_TRACKLIST:
			return {
				listType: payload.listType,
				listId: payload.listId,
				listName: payload.listName,
				tracks: payload.tracks,
				shuffle: false
			}

		case CurrentTracklistReducer.SHUFFLE_TRACKLIST:
			return {
				...state,
				tracks: payload.tracks,
				shuffle: !state.shuffle,
			}

		case CurrentTracklistReducer.SELECT_CURRENT_TRACKLIST:
			return {
				...state,
				listType: payload.listType,
				listId: payload.listId,
				listName: payload.listName,
				tracks: payload.tracks
			}

		default:
			return state;
	}
}