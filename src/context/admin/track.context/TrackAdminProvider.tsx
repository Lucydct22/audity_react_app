import { useReducer, useMemo, useEffect, useCallback } from 'react'
import TrackAdminContext from './TrackAdminContext'
import initialTrackState from './initialTrackState'
import trackReducer from 'reducers/admin/trackAdmin/trackAdmin.reducer'
import * as action from "reducers/admin/trackAdmin/trackAdmin.actions";
import { ChildrenProps } from 'interfaces/global'
import { useAuth0 } from '@auth0/auth0-react';

export default function TrackAdminProvider(props: ChildrenProps) {
	const [tracksState, dispatch] = useReducer(trackReducer, initialTrackState)
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

	useEffect(() => {
		if (!isLoading && isAuthenticated) {
			action.initTracksAction(dispatch)
		}
	}, [isLoading, isAuthenticated])

	const postTrack = useCallback(async (track: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Creating track '${track.name}'`, duration: 0 })
		const token = await getAccessTokenSilently()
		action.postTrackAction(dispatch, track, token, messageApi)
	}, []);

	const deleteTrack = useCallback(async (track: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Removing track`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && track) {
			action.deleteTrackAction(dispatch, track, token, tracksState, messageApi)
		}
	}, [tracksState]);

	const updateTrack = useCallback(async (data: any, track: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Updating track`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && data && track) {
			action.updateTrackAction(dispatch, data, track, token, tracksState, messageApi)
		}
	}, [tracksState]);

	const memoProvider = useMemo(
		() => ({
			...tracksState,
			postTrack,
			deleteTrack,
			updateTrack
		}), [
		tracksState,
		postTrack,
		deleteTrack,
		updateTrack
	]
	);

	return (
		<TrackAdminContext.Provider value={memoProvider}>
			{props.children}
		</TrackAdminContext.Provider>
	)
}