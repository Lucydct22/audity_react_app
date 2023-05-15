import { createContext } from "react";
import initialArtistState from "./initialArtistState";
const ArtistAdminContext = createContext(initialArtistState)

export default ArtistAdminContext