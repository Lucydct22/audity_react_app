import { createContext } from "react";
import initialTrackState from "./initialTrackState";

export const CurrentTrackContext = createContext(initialTrackState);

export default CurrentTrackContext;