import { createContext } from "react";
import initialTracklistState from "./initialTracklistState";

const CurrentTracklistProvider = createContext(initialTracklistState);

export default CurrentTracklistProvider;