import { useReducer } from "react";
import {
	initCurrentTracklistAction,
	shuffleTracklistAction
} from "@/reducers/currentTracklist/currentTracklistActions";
import currentTrackReducer from "@/reducers/currentTracklist/currentTracklistReducer";
import CurrentTracklistContext from "./CurrentTracklistContext";
import initialTracklistState from "./initialTracklistState";

export default function CurrentTracklistProvider ({ children }: any) {
	const [tracklistState, dispatch] = useReducer(currentTrackReducer, initialTracklistState);

	const initCurrentTracklist = function () {
		initCurrentTracklistAction(dispatch);
	}

	const shuffleTracklist = function () {
		shuffleTracklistAction(dispatch, tracklistState)
	}

	return (
		<CurrentTracklistContext.Provider value={{
			...tracklistState,
			initCurrentTracklist,
			shuffleTracklist
		}}>
			{children}
		</CurrentTracklistContext.Provider>
	)
}