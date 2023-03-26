import { useContext, useReducer } from "react";
import {
	initCurrentTrackAction,
	nextTrackAction,
	previousTrackAction,
} from "../../reducers/track/trackActions";
import trackReducer from "../../reducers/track/trackReducer";
import * as TrackTypes from '../../reducers/track/trackTypes';
import CurrentTracksListContext from "../currentTracksList/CurrentTracksListContext";
import CurrentTrackContext from "./CurrentTrackContext";
import initialTrackState from "./initialTrackState";

export default function CurrentTrackProvider({ children }: any) {
	const [trackState, dispatch] = useReducer(trackReducer, initialTrackState);
	const tracksList = useContext(CurrentTracksListContext);
	const { trackData } = trackState;
	const { audio } = trackData;

	const initCurrentTrack = function () {
		initCurrentTrackAction(dispatch);
	}

	const playCurrentTrack = function () {
		audio.play();
		dispatch({ type: TrackTypes.PLAY_CURRENT_TRACK })
	}

	const pauseCurrentTrack = function () {
		audio.pause();
		dispatch({ type: TrackTypes.PAUSE_CURRENT_TRACK })
	}

	const updateCurrentTime = function () {
		audio.ended && nextTrack()
		dispatch({
			type: TrackTypes.UPDATE_CURRENT_TIME,
			payload: Math.round(audio.currentTime)
		})
	}

	const changeCurrentTime = function (currentTime: number) {
		audio.currentTime = currentTime;
		dispatch({
			type: TrackTypes.CHANGE_CURRENT_TIME,
			payload: { currentTime: currentTime }
		})
	}

	const nextTrack = function () {
		nextTrackAction(dispatch, trackState, tracksList)
	}

	const previousTrack = function () {
		previousTrackAction(dispatch, trackState, tracksList)
	}

	const muteTrack = function () {
		audio.muted = !audio.muted;
		dispatch({
			type: TrackTypes.MUTE_TRACK,
			payload: { isMuted: audio.muted }
		})
	}

	const loopTrack = function () {
		audio.loop = !audio.loop;
		dispatch({
			type: TrackTypes.LOOP_TRACK,
			payload: { hasLoop: audio.loop }
		})
	}

	return (
		<CurrentTrackContext.Provider value={{
			...trackState,
			initCurrentTrack,
			playCurrentTrack,
			pauseCurrentTrack,
			updateCurrentTime,
			nextTrack,
			previousTrack,
			muteTrack,
			loopTrack,
			changeCurrentTime,
		}}>
			{children}
		</CurrentTrackContext.Provider>
	)
}