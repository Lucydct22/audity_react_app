import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import CurrentTracklistContext from "../currentTracklist/CurrentTracklistContext";
import CurrentTrackContext from "./CurrentTrackContext";
import initialCurrentTrackState from "./initialCurrentTrackState";
import currentTrackReducer from "reducers/currentTrack/currentTrackReducer";
import * as CurrentTrackTypes from 'reducers/currentTrack/currentTrackTypes';
import {
	initCurrentTrackAction,
	nextTrackAction,
	previousTrackAction,
	selectCurrentTrackAction,
} from "reducers/currentTrack/currentTrackActions";
import { useAuth0 } from "@auth0/auth0-react";

export default function CurrentTrackProvider({ children }: any) {
	const [currentTrackState, dispatch] = useReducer(currentTrackReducer, initialCurrentTrackState);
	const currentTracklist = useContext(CurrentTracklistContext);
	const { getAccessTokenSilently, isLoading, isAuthenticated, user } = useAuth0()
	const { trackData } = currentTrackState;
	const { audio } = trackData;

	useEffect(() => {
		let isMounted = true;
		const interval = setInterval(() => {
			isMounted && trackData.duration && updateCurrentTime()
		}, 1000);
		trackData.isPlaying === true && interval
		return () => {
			clearInterval(interval);
			isMounted = false;
		};
	}, [trackData.duration]);

	useEffect(() => {
		const initCurrentTrack = async () => {
			initCurrentTrackAction(dispatch, trackData);
		}
		initCurrentTrack()
	}, [getAccessTokenSilently, isAuthenticated, isLoading, user]);

	const playCurrentTrack = useCallback(() => {
		if (audio) {
			audio.play();
			dispatch({ type: CurrentTrackTypes.PLAY_CURRENT_TRACK })
		}
	}, [audio]);

	const pauseCurrentTrack = useCallback(() => {
		if (audio) {
			audio.pause();
			dispatch({ type: CurrentTrackTypes.PAUSE_CURRENT_TRACK })
		}
	}, [audio]);

	const changeCurrentTime = useCallback((currentTime: number) => {
		audio.currentTime = currentTime;
		return dispatch({
			type: CurrentTrackTypes.CHANGE_CURRENT_TIME,
			payload: { currentTime: currentTime }
		})
	}, [audio]);

	const nextTrack = useCallback(async () => {
		await nextTrackAction(dispatch, currentTrackState, currentTracklist)
	}, [audio, currentTrackState]);

	const previousTrack = useCallback(async () => {
		await previousTrackAction(dispatch, currentTrackState, currentTracklist)
	}, [audio, currentTrackState]);

	const updateCurrentTime = useCallback(() => {
		if (audio) {
			audio.ended && nextTrack()
			return dispatch({
				type: CurrentTrackTypes.UPDATE_CURRENT_TIME,
				payload: Math.round(audio.currentTime)
			})
		}
	}, [audio, trackData.currentTime]);

	const muteTrack = useCallback(() => {
		if (audio) {
			audio.muted = !audio.muted;
			dispatch({
				type: CurrentTrackTypes.MUTE_TRACK,
				payload: { isMuted: audio.muted }
			})
		}
	}, [audio]);

	const loopTrack = useCallback(() => {
		audio.loop = !audio.loop;
		dispatch({
			type: CurrentTrackTypes.LOOP_TRACK,
			payload: { hasLoop: audio.loop }
		})
	}, [audio]);

	const selectCurrentTrack = useCallback(async (track: any) => {
		return await selectCurrentTrackAction(dispatch, track, currentTrackState)
	}, [currentTrackState]);

	const updateVolume = useCallback((volume: number) => {
		const newVolume = Number((volume / 100).toFixed(1))
		audio.volume = newVolume
		return dispatch({
			type: CurrentTrackTypes.UPDATE_VOLUME,
			payload: newVolume
		})
	}, [audio]);

	const memoProvider = useMemo(
		() => ({
			...currentTrackState,
			playCurrentTrack,
			pauseCurrentTrack,
			updateCurrentTime,
			nextTrack,
			previousTrack,
			muteTrack,
			loopTrack,
			changeCurrentTime,
			selectCurrentTrack,
			updateVolume
		}), [
		currentTrackState,
		playCurrentTrack,
		pauseCurrentTrack,
		updateCurrentTime,
		nextTrack,
		previousTrack,
		muteTrack,
		loopTrack,
		changeCurrentTime,
		selectCurrentTrack,
		updateVolume
	]
	);

	return (
		<CurrentTrackContext.Provider value={memoProvider}>
			{children}
		</CurrentTrackContext.Provider>
	)
}