import { useEffect, useReducer } from "react";
import * as action from "reducers/currentTracklist/currentTracklistActions";
import currentTracklistReducer from "reducers/currentTracklist/currentTracklistReducer";
import CurrentTracklistContext from "./CurrentTracklistContext";
import initialTracklistState from "./initialTracklistState";

export default function CurrentTracklistProvider({ children }: any) {
	const [tracklistState, dispatch] = useReducer(currentTracklistReducer, initialTracklistState);

	useEffect(() => {
		action.initCurrentTracklistAction(dispatch);
	}, []);

	const shuffleTracklist = function () {
		action.shuffleTracklistAction(dispatch, tracklistState)
	}

	return (
		<CurrentTracklistContext.Provider value={{
			...tracklistState,
			shuffleTracklist
		}}>
			{children}
		</CurrentTracklistContext.Provider>
	)
}