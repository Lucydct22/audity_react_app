import { useReducer } from "react";
import {
	initCurrentTracksListAction,
	shuffleTracksListAction
} from "../../reducers/currentTracksList/currentTracksListActions";
import trackReducer from "../../reducers/currentTracksList/currentTracksListReducer";
import CurrentTracksListContext from "./CurrentTracksListContext";
import initialTracksListState from "./initialTracksListState";

export const CurrentTracksListProvider = ({ children }: any) => {
	const [tracksListState, dispatch] = useReducer(trackReducer, initialTracksListState);

	const initCurrentTracksList = function () {
		initCurrentTracksListAction(dispatch);
	}

	const shuffleTracksList = function () {
		shuffleTracksListAction(dispatch, tracksListState)
	}

	return (
		<CurrentTracksListContext.Provider value={{
			...tracksListState,
			initCurrentTracksList,
			shuffleTracksList
		}}>
			{children}
		</CurrentTracksListContext.Provider>
	)
}