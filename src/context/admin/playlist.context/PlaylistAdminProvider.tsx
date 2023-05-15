import { useReducer, useMemo, useEffect, useCallback, useContext } from 'react'
import PlaylistAdminContext from './PlaylistAdminContext'
import initialPlaylistState from './initialPlaylistState'
import playlistReducer from 'reducers/admin/playlistAdmin/playlistAdmin.reducer'
import * as action from "reducers/admin/playlistAdmin/playlistAdmin.actions";
import { ChildrenProps } from 'interfaces/global'
import { useAuth0 } from '@auth0/auth0-react';
import { message } from 'antd';
import UserContext from 'context/user/UserContext';

export default function PlaylistAdminProvider(props: ChildrenProps) {
	const [playlistsState, dispatch] = useReducer(playlistReducer, initialPlaylistState)
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
	const { dbUser } = useContext(UserContext)

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			action.initPlaylistsAction(dispatch)
		}
	}, [isLoading, isAuthenticated])

	const postPlaylist = useCallback(async (playlist: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Creating playlist '${playlist.name}'` })
		const token = await getAccessTokenSilently()
		action.postPlaylistAction(dispatch, dbUser._id, playlist, token, messageApi)
	}, []);

	const deletePlaylist = useCallback(async (playlist: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Removing playlist` })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && playlist) {
			action.deletePlaylistAction(dispatch, playlist, dbUser._id, token, playlistsState, messageApi)
		}
	}, [playlistsState]);

	const updatePlaylist = useCallback(async (data: any, playlist: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Updating playlist` })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && data && playlist) {
			action.updatePlaylistAction(dispatch, data, playlist, token, playlistsState, messageApi)
		}
	}, [playlistsState]);

	const memoProvider = useMemo(
		() => ({
			...playlistsState,
			postPlaylist,
			deletePlaylist,
			updatePlaylist
		}), [
		playlistsState,
		postPlaylist,
		deletePlaylist,
		updatePlaylist
	]
	);

	return (
		<PlaylistAdminContext.Provider value={memoProvider}>
			{props.children}
		</PlaylistAdminContext.Provider>
	)
}