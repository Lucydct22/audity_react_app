import { createContext } from "react";
import initialMyLibraryState from "./initialMyLibraryState";

const MyLibraryContext = createContext(initialMyLibraryState)

export default MyLibraryContext