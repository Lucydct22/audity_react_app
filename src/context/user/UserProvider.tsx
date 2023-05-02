import { useReducer, useMemo, useEffect, useCallback } from 'react'
import UserContext from './UserContext'
import initialUserState from './initialUserState'
import userReducer from 'reducers/user/user.reducer'
import * as action from "reducers/user/user.actions";
import { useAuth0 } from '@auth0/auth0-react'

export default function UserProvider({ children }: any) {
	const [userState, dispatch] = useReducer(userReducer, initialUserState)
	const { user, isAuthenticated, getIdTokenClaims, getAccessTokenSilently } = useAuth0()
	
	useEffect(() => {
		const registerLoginUser = async () => {
			const userAuth0 = await getIdTokenClaims()
			const token = await getAccessTokenSilently()
			if (userAuth0) {
				action.registerLoginUserAction(dispatch, user, token)
			}
		}
		registerLoginUser()
	}, [isAuthenticated, user])

	const updateUserInfo = useCallback(() => {
		console.log('callback');
	}, [])

	const userMemo = useMemo(
		() => ({
			...userState,
			updateUserInfo
		}),
		[
			userState,
			updateUserInfo
		]
	)

	return (
		<UserContext.Provider value={userMemo}>
			{children}
		</UserContext.Provider>
	)
}
