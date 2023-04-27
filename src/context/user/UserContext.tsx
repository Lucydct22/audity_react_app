import { createContext } from "react";
import initialUserState from "./initialUserState";

interface InitialUserState {
	auth0User: object,
	user: {
		_id: string,
		userId: string,
		name: string,
		lastname: string,
		nickname: string,
		email: string,
		country: string,
		language: string,
		// following: [],
	},
	updateUserInfo: () => void
}

const UserContext = createContext<any>(initialUserState)

export default UserContext