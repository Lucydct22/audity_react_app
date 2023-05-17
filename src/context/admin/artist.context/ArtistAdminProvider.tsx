import { useReducer, useMemo, useEffect, useCallback } from 'react'
import ArtistAdminContext from './ArtistAdminContext'
import initialArtistState from './initialArtistState'
import artistReducer from 'reducers/admin/artistAdmin/artistAdmin.reducer'
import * as action from "reducers/admin/artistAdmin/artistAdmin.actions";
import { ChildrenProps } from 'interfaces/global'
import { useAuth0 } from '@auth0/auth0-react';

export default function ArtistAdminProvider(props: ChildrenProps) {
	const [artistsState, dispatch] = useReducer(artistReducer, initialArtistState)
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			action.initArtistsAction(dispatch)
		}
	}, [isLoading, isAuthenticated])

	const postArtist = useCallback(async (artist: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Creating artist '${artist.name}'`, duration: 0 })
		const token = await getAccessTokenSilently()
		action.postArtistAction(dispatch, artist, token, messageApi)
	}, []);

	const deleteArtist = useCallback(async (artist: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Removing artist`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && artist) {
			action.deleteArtistAction(dispatch, artist, token, artistsState, messageApi)
		}
	}, [artistsState]);

	const updateArtist = useCallback(async (data: any, artist: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Updating artist`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && data && artist) {
			action.updateArtistAction(dispatch, data, artist, token, artistsState, messageApi)
		}
	}, [artistsState]);

	const memoProvider = useMemo(
		() => ({
			...artistsState,
			postArtist,
			deleteArtist,
			updateArtist
		}), [
		artistsState,
		postArtist,
		deleteArtist,
		updateArtist
	]
	);

	return (
		<ArtistAdminContext.Provider value={memoProvider}>
			{props.children}
		</ArtistAdminContext.Provider>
	)
}