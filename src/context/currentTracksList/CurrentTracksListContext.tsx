import { createContext } from "react";
import initialTracksListState from "./initialTracksListState";

const CurrentTracksListContext = createContext(initialTracksListState);

export default CurrentTracksListContext;