import * as CurrentTracksListReducer from './currentTracksListTypes';

export default function currentTracksListReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case CurrentTracksListReducer.INIT_CURRENT_TRACKS_LIST:
			return {
				listType: payload.listType,
				listId: payload.listId,
				tracks: payload.tracks,
				shuffle: false
			}

		case CurrentTracksListReducer.SHUFFLE_TRACKS_LIST:
			return {
				listType: state.listType,
				listId: state.listId,
				tracks: payload.tracks,
				shuffle: !state.shuffle,
			}

		default:
			return state;
	}
}