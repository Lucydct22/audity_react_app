import { createContext } from "react";
import initialTrackState from "./initialCurrentTrackState";

export const CurrentTrackContext = createContext(initialTrackState);

export default CurrentTrackContext;