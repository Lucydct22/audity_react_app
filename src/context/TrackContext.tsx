import { createContext, useReducer } from "react";
import { initCurrentTrackAction } from "../reducers/track/trackActions";
import trackReducer from "../reducers/track/trackReducer";
import * as TrackTypes from '../reducers/track/trackTypes';
import { currentTrack, trackData } from "./trackObjects";

const initialState = {
	currentTrack,
	trackData,
	initCurrentTrack: () => { },
	playCurrentTrack: () => { },
	pauseCurrentTrack: () => { },
	updateCurrentTime: () => { },
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
		dispatch({
			type: TrackTypes.UPDATE_CURRENT_TIME,
			payload: Math.round(trackState.trackData.audio.currentTime)
		})
	}

	return (
		<TrackContext.Provider value={{
			...trackState,
			initCurrentTrack,
			playCurrentTrack,
			pauseCurrentTrack,
			updateCurrentTime
		}}>
			{children}
		</TrackContext.Provider>
	)
}