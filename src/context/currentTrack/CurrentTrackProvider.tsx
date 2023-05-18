import { useContext, useEffect, useMemo, useReducer } from "react";
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

	const playCurrentTrack = function () {
		audio?.play();
		dispatch({ type: CurrentTrackTypes.PLAY_CURRENT_TRACK })
	}

	const pauseCurrentTrack = function () {
		audio?.pause();
		dispatch({ type: CurrentTrackTypes.PAUSE_CURRENT_TRACK })
	}

	const updateCurrentTime = function () {
		audio.ended && nextTrack()
		dispatch({
			type: CurrentTrackTypes.UPDATE_CURRENT_TIME,
			payload: Math.round(audio.currentTime)
		})
	}

	const changeCurrentTime = function (currentTime: number) {
		audio.currentTime = currentTime;
		dispatch({
			type: CurrentTrackTypes.CHANGE_CURRENT_TIME,
			payload: { currentTime: currentTime }
		})
	}

	const nextTrack = async function () {
		await nextTrackAction(dispatch, currentTrackState, currentTracklist)
	}

	const previousTrack = async function () {
		await previousTrackAction(dispatch, currentTrackState, currentTracklist)
	}

	const muteTrack = function () {
		audio.muted = !audio.muted;
		dispatch({
			type: CurrentTrackTypes.MUTE_TRACK,
			payload: { isMuted: audio.muted }
		})
	}

	const loopTrack = function () {
		audio.loop = !audio.loop;
		dispatch({
			type: CurrentTrackTypes.LOOP_TRACK,
			payload: { hasLoop: audio.loop }
		})
	}

	const selectCurrentTrack = function (track: any) {
		selectCurrentTrackAction(dispatch, track, currentTrackState)
	}

	const updateVolume = function (volume: number) {
		const newVolume = Number((volume / 100).toFixed(1))
		audio.volume = newVolume
		dispatch({
			type: CurrentTrackTypes.UPDATE_VOLUME,
			payload: newVolume
		})
	}

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