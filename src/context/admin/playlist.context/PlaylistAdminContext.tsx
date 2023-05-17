import { createContext } from "react";
import initialPlaylistState from "./initialPlaylistState";
const PlaylistAdminContext = createContext(initialPlaylistState)

export default PlaylistAdminContext