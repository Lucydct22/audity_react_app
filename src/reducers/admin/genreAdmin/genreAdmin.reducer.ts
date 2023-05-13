import * as GenreAdminTypes from './genreAdmin.types'

export default function genreAdminReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case GenreAdminTypes.INIT_GENRES:
			return {
				...state,
				genres: payload
			}

		case GenreAdminTypes.POST_GENRE:
			return {
				...state,
				genres: [...state.genres, payload]
			}

		case GenreAdminTypes.DELETE_GENRE:
			return {
				...state,
				genres: payload
			}

		default:
			return state
	}
}