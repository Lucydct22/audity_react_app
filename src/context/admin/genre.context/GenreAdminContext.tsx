import { createContext } from "react";
import initialGenreState from "./initialGenreState";
const GenreAdminContext = createContext(initialGenreState)

export default GenreAdminContext