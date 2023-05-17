import { createContext } from "react";
import initialUserState from "./initialUserState";
const UserAdminContext = createContext(initialUserState)

export default UserAdminContext