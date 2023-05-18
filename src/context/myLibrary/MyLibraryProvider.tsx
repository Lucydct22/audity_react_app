import { useReducer, useMemo, useEffect, useContext, useCallback, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import MyLibraryContext from './MyLibraryContext'
import UserContext from 'context/user/UserContext';
import initialMyLibraryState from './initialMyLibraryState'
import myLibraryReducer from 'reducers/myLibrary/myLibrary.reducer'
import * as action from "reducers/myLibrary/myLibrary.actions";
import { ChildrenProps } from 'interfaces/global';
import { message } from 'antd';

export default function MyLibraryProvider(props: ChildrenProps) {
	const [myLibraryState, dispatch] = useReducer(myLibraryReducer, initialMyLibraryState)
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
	const { dbUser } = useContext(UserContext)

	useEffect(() => {
		const initMyLibrary = async () => {
			const token = await getAccessTokenSilently()
			if (!isLoading && isAuthenticated && token && dbUser._id) {
				action.initMyLibraryAction(dispatch, token, dbUser._id)
			}
		}
		initMyLibrary()
	}, [isAuthenticated, dbUser._id, getAccessTokenSilently])

	const postPlaylist = useCallback(async (name: string, description: string) => {
		const token = await getAccessTokenSilently()
		isAuthenticated && action.postPlaylistAction(dispatch, token, name, description, dbUser._id)
	}, [isAuthenticated, dbUser]);



	const postArtists = useCallback(async (artistIds: string[]) => {
		const token = await getAccessTokenSilently()
		isAuthenticated && action.postArtistAction(dispatch, token, artistIds, dbUser._id)
	}, [isAuthenticated, dbUser]);

	const postPrivateTrack = useCallback(async (data: any) => {
		message.loading(`Creating track`)
		const token = await getAccessTokenSilently()
		isAuthenticated && action.postPrivateTrackAction(dispatch, token, data, dbUser._id)
	}, [isAuthenticated, dbUser]);

	const putTrackToPlaylist = useCallback(async (playlistId: string, trackId: string) => {
		const token = await getAccessTokenSilently()
		if (token && isAuthenticated) {
			action.putTrackToPlaylistAction(dispatch, token, playlistId, trackId)
		}
	}, [isAuthenticated, dbUser]);

	const likeDislikeTrack = useCallback(async (trackId: string) => {
		const token = await getAccessTokenSilently()
		if (token && isAuthenticated) {
			action.likeDislikeTrackAction(dispatch, trackId, dbUser._id, myLibraryState, token)
		}
	}, [isAuthenticated, dbUser, myLibraryState]);

	const likeDislikeArtist = useCallback(async (artistId: string) => {
		const token = await getAccessTokenSilently()
		if (token && isAuthenticated) {
			action.likeDislikeArtistAction(dispatch, artistId, dbUser._id, myLibraryState, token)
		}
	}, [isAuthenticated, dbUser, myLibraryState]);

	const likeDislikeAlbum = useCallback(async (albumId: string) => {
		const token = await getAccessTokenSilently()
		if (token && isAuthenticated) {
			action.likeDislikeAlbumAction(dispatch, albumId, dbUser._id, myLibraryState, token)
		}
	}, [isAuthenticated, dbUser, myLibraryState]);

	const likeDislikePlaylist = useCallback(async (playlistId: string) => {
		const token = await getAccessTokenSilently()
		if (token && isAuthenticated) {
			action.likeDislikePlaylistAction(dispatch, playlistId, dbUser._id, myLibraryState, token)
		}
	}, [isAuthenticated, dbUser, myLibraryState]);


	const memoProvider = useMemo(
		() => ({
			...myLibraryState,
			postPlaylist,
			postArtists,
			postPrivateTrack,
			putTrackToPlaylist,
			likeDislikeTrack,
			likeDislikeArtist,
			likeDislikeAlbum,
			likeDislikePlaylist
		}), [
		myLibraryState,
		postPlaylist,
		postArtists,
		postPrivateTrack,
		putTrackToPlaylist,
		likeDislikeTrack,
		likeDislikeArtist,
		likeDislikeAlbum,
		likeDislikePlaylist
	]
	);

	return (
		<MyLibraryContext.Provider value={memoProvider}>
			{props.children}
		</MyLibraryContext.Provider>
	)
} 