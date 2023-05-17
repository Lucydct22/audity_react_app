import { useReducer, useMemo, useEffect, useCallback } from 'react'
import GenreAdminContext from './GenreAdminContext'
import initialGenreState from './initialGenreState'
import genreReducer from 'reducers/admin/genreAdmin/genreAdmin.reducer'
import * as action from "reducers/admin/genreAdmin/genreAdmin.actions";
import { ChildrenProps } from 'interfaces/global'
import { useAuth0 } from '@auth0/auth0-react';

export default function GenreAdminProvider(props: ChildrenProps) {
	const [genresState, dispatch] = useReducer(genreReducer, initialGenreState)
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			action.initGenresAction(dispatch)
		}
	}, [isLoading, isAuthenticated])

	const postGenre = useCallback(async (genre: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Creating genre '${genre.name}'`, duration: 0 })
		const token = await getAccessTokenSilently()
		action.postGenreAction(dispatch, genre, token, messageApi)
	}, []);

	const deleteGenre = useCallback(async (genre: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Removing genre`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && genre) {
			action.deleteGenreAction(dispatch, genre, token, genresState, messageApi)
		}
	}, [genresState]);

	const updateGenre = useCallback(async (data: any, genre: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Updating genre`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && data && genre) {
			action.updateGenreAction(dispatch, data, genre, token, genresState, messageApi)
		}
	}, [genresState]);

	const memoProvider = useMemo(
		() => ({
			...genresState,
			postGenre,
			deleteGenre,
			updateGenre
		}), [
		genresState,
		postGenre,
		deleteGenre,
		updateGenre
	]
	);

	return (
		<GenreAdminContext.Provider value={memoProvider}>
			{props.children}
		</GenreAdminContext.Provider>
	)
}