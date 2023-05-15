import { createContext } from "react";
import initialAlbumState from "./initialAlbumState";
const AlbumAdminContext = createContext(initialAlbumState)

export default AlbumAdminContext