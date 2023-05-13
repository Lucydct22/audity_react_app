import { useReducer, useMemo, useEffect, useCallback } from 'react'
import GenreAdminContext from './GenreAdminContext'
import initialGenreState from './initialGenreState'
import userReducer from 'reducers/admin/genreAdmin/genreAdmin.reducer'
import * as action from "reducers/admin/genreAdmin/genreAdmin.actions";
import { ChildrenProps } from 'interfaces/global'
import { useAuth0 } from '@auth0/auth0-react';

export default function GenreAdminProvider(props: ChildrenProps) {
	const [genresState, dispatch] = useReducer(userReducer, initialGenreState)
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

	useEffect(() => {
		const initGenres = async () => {
			if (!isLoading && isAuthenticated) {
				action.initGenresAction(dispatch)
			}
		}
		initGenres()
	}, [isLoading, isAuthenticated])

	const postGenre = useCallback(async (genre: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Creating genre '${genre.name}'` })
		const token = await getAccessTokenSilently()
		action.postGenreAction(dispatch, genre, token, messageApi)
	}, []);

	const deleteGenre = useCallback(async (genre: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Removing genre`, duration: 5 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && genre) {
			action.deleteGenreAction(dispatch, genre, token, genresState, messageApi)
		}
	}, [genresState]);

	const memoProvider = useMemo(
		() => ({
			...genresState,
			postGenre,
			deleteGenre
		}), [
		genresState,
		postGenre,
		deleteGenre
	]
	);

	return (
		<GenreAdminContext.Provider value={memoProvider}>
			{props.children}
		</GenreAdminContext.Provider>
	)
}