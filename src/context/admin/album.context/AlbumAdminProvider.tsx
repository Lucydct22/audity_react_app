import { useReducer, useMemo, useEffect, useCallback } from 'react'
import AlbumAdminContext from './AlbumAdminContext'
import initialAlbumState from './initialAlbumState'
import albumReducer from 'reducers/admin/albumAdmin/albumAdmin.reducer'
import * as action from "reducers/admin/albumAdmin/albumAdmin.actions";
import { ChildrenProps } from 'interfaces/global'
import { useAuth0 } from '@auth0/auth0-react';

export default function AlbumAdminProvider(props: ChildrenProps) {
	const [albumsState, dispatch] = useReducer(albumReducer, initialAlbumState)
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

	useEffect(() => {
		const initAlbums = async () => {
			if (!isLoading && isAuthenticated) {
				await action.initAlbumsAction(dispatch)
			}
		}
		initAlbums()
	}, [isLoading, isAuthenticated])

	const postAlbum = useCallback(async (album: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Creating album '${album.name}'`, duration: 0 })
		const token = await getAccessTokenSilently()
		await action.postAlbumAction(dispatch, album, token, messageApi)
	}, []);

	const deleteAlbum = useCallback(async (album: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Removing album`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && album) {
			await action.deleteAlbumAction(dispatch, album, token, albumsState, messageApi)
		}
	}, [albumsState]);

	const updateAlbum = useCallback(async (data: any, album: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Updating album`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && data && album) {
			await action.updateAlbumAction(dispatch, data, album, token, albumsState, messageApi)
		}
	}, [albumsState]);

	const memoProvider = useMemo(
		() => ({
			...albumsState,
			postAlbum,
			deleteAlbum,
			updateAlbum
		}), [
		albumsState,
		postAlbum,
		deleteAlbum,
		updateAlbum
	]
	);

	return (
		<AlbumAdminContext.Provider value={memoProvider}>
			{props.children}
		</AlbumAdminContext.Provider>
	)
}