import { createContext } from "react";
import initialTracklistState from "./initialTracklistState";

const CurrentTracklistContext = createContext(initialTracklistState);

export default CurrentTracklistContext;