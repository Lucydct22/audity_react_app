import { createContext, useReducer } from "react";
import {
	initCurrentTrackAction,
	nextTrackAction,
	previousTrackAction
} from "../../reducers/track/trackActions";
import trackReducer from "../../reducers/track/trackReducer";
import * as TrackTypes from '../../reducers/track/trackTypes';
import { currentTrack, trackData } from "./trackObjects";

const initialState = {
	currentTrack,
	tracksList: [],
	trackData,
	initCurrentTrack: () => { },
	playCurrentTrack: () => { },
	pauseCurrentTrack: () => { },
	updateCurrentTime: () => { },
	nextTrack: () => { },
	previousTrack: () => { },
	muteTrack: () => { },
	loopTrack: () => { }
}

export const TrackContext = createContext(initialState);

export const TrackProvider = ({ children }: any) => {
	const [trackState, dispatch] = useReducer(trackReducer, initialState);

	const initCurrentTrack = function () {
		initCurrentTrackAction(dispatch);
	}

	const playCurrentTrack = function () {
		dispatch({ type: TrackTypes.PLAY_CURRENT_TRACK })
	}

	const pauseCurrentTrack = function () {
		dispatch({ type: TrackTypes.PAUSE_CURRENT_TRACK })
	}

	const updateCurrentTime = function () {
		trackState?.trackData?.audio?.ended && nextTrack()		
		dispatch({
			type: TrackTypes.UPDATE_CURRENT_TIME,
			payload: Math.round(trackState.trackData.audio.currentTime)
		})
	}

	const nextTrack = function () {
		nextTrackAction(dispatch, trackState)
	}

	const previousTrack = function () {
		previousTrackAction(dispatch, trackState)
	}

	const muteTrack = function () {
		trackState.trackData.audio.muted = !trackState.trackData.audio.muted;
		dispatch({
			type: TrackTypes.MUTE_TRACK,
			payload: {isMuted: trackState.trackData.audio.muted}
		})
	}

		const loopTrack = function () {
		trackState.trackData.audio.loop = !trackState.trackData.audio.loop;
		dispatch({
			type: TrackTypes.LOOP_TRACK,
			payload: { hasLoop: trackState.trackData.audio.loop }
		})
	}

	return (
		<TrackContext.Provider value={{
			...trackState,
			initCurrentTrack,
			playCurrentTrack,
			pauseCurrentTrack,
			updateCurrentTime,
			nextTrack,
			previousTrack,
			muteTrack,
			loopTrack
		}}>
			{children}
		</TrackContext.Provider>
	)
}