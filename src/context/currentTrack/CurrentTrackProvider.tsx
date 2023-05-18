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

export default function CurrentTrackProvider({ children }: any) {
	const [currentTrackState, dispatch] = useReducer(currentTrackReducer, initialCurrentTrackState);
	const currentTracklist = useContext(CurrentTracklistContext);
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
			await initCurrentTrackAction(dispatch, trackData);
		}
		initCurrentTrack()
	}, []);

	// const playCurrentTrack = function () {
	// 	if (audio) {
	// 		audio.play();
	// 		dispatch({ type: CurrentTrackTypes.PLAY_CURRENT_TRACK })
	// 	}
	// }
	const playCurrentTrack = useCallback(() => {
		if (audio) {
			audio.play();
			dispatch({ type: CurrentTrackTypes.PLAY_CURRENT_TRACK })
		}
	}, [audio]);

	// const pauseCurrentTrack = function () {
	// 	if (audio) {
	// 		audio.pause();
	// 		dispatch({ type: CurrentTrackTypes.PAUSE_CURRENT_TRACK })
	// 	}
	// }
	const pauseCurrentTrack = useCallback(() => {
		if (audio) {
			audio.pause();
			dispatch({ type: CurrentTrackTypes.PAUSE_CURRENT_TRACK })
		}
	}, [audio]);

	// const changeCurrentTime = function (currentTime: number) {
	// 	if (audio) {
	// 		audio.currentTime = currentTime;
	// 		return dispatch({
	// 			type: CurrentTrackTypes.CHANGE_CURRENT_TIME,
	// 			payload: { currentTime: currentTime }
	// 		})
	// 	}
	// }
	const changeCurrentTime = useCallback((currentTime: number) => {
		if (audio) {
			audio.currentTime = currentTime;
			return dispatch({
				type: CurrentTrackTypes.CHANGE_CURRENT_TIME,
				payload: { currentTime: currentTime }
			})
		}
	}, [audio]);

	// const nextTrack = async function () {
	// 	audio?.pause();
	// 	return await nextTrackAction(dispatch, currentTrackState, currentTracklist)
	// }
	const nextTrack = useCallback(async () => {
		audio?.pause();
		return await nextTrackAction(dispatch, currentTrackState, currentTracklist)
	}, [audio, currentTrackState]);

	// const previousTrack = async function () {
	// 	audio?.pause();
	// 	return await previousTrackAction(dispatch, currentTrackState, currentTracklist)
	// }
	const previousTrack = useCallback(async () => {
		audio?.pause();
		return await previousTrackAction(dispatch, currentTrackState, currentTracklist)
	}, [audio, currentTrackState]);

	// const updateCurrentTime = function () {
	// 	if (audio) {
	// 		audio.ended && nextTrack()
	// 		return dispatch({
	// 			type: CurrentTrackTypes.UPDATE_CURRENT_TIME,
	// 			payload: Math.round(audio.currentTime)
	// 		})
	// 	}
	// }
	const updateCurrentTime = useCallback(() => {
		if (audio) {
			audio.ended && nextTrack()
			return dispatch({
				type: CurrentTrackTypes.UPDATE_CURRENT_TIME,
				payload: Math.round(audio.currentTime)
			})
		}
	}, [audio]);

	// const muteTrack = function () {
	// 	if (audio) {
	// 		audio.muted = !audio.muted;
	// 		dispatch({
	// 			type: CurrentTrackTypes.MUTE_TRACK,
	// 			payload: { isMuted: audio.muted }
	// 		})
	// 	}
	// }
	const muteTrack = useCallback(() => {
		if (audio) {
			audio.muted = !audio.muted;
			dispatch({
				type: CurrentTrackTypes.MUTE_TRACK,
				payload: { isMuted: audio.muted }
			})
		}
	}, [audio]);

	// const loopTrack = function () {
	// 	audio.loop = !audio.loop;
	// 	dispatch({
	// 		type: CurrentTrackTypes.LOOP_TRACK,
	// 		payload: { hasLoop: audio.loop }
	// 	})
	// }
	const loopTrack = useCallback(() => {
		audio.loop = !audio.loop;
		dispatch({
			type: CurrentTrackTypes.LOOP_TRACK,
			payload: { hasLoop: audio.loop }
		})
	}, [audio]);

	// const selectCurrentTrack = async function (track: any) {
	// 	return await selectCurrentTrackAction(dispatch, track, currentTrackState)
	// }
	const selectCurrentTrack = useCallback(async (track: any) => {
		return await selectCurrentTrackAction(dispatch, track, currentTrackState)
	}, [currentTrackState]);

	// const updateVolume = function (volume: number) {
	// 	const newVolume = Number((volume / 100).toFixed(1))
	// 	audio.volume = newVolume
	// 	dispatch({
	// 		type: CurrentTrackTypes.UPDATE_VOLUME,
	// 		payload: newVolume
	// 	})
	// }
	const updateVolume = useCallback((volume: number) => {
		const newVolume = Number((volume / 100).toFixed(1))
		audio.volume = newVolume
		dispatch({
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