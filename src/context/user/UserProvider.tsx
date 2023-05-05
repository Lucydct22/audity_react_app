import { useReducer, useMemo, useEffect, useCallback } from 'react'
import UserContext from './UserContext'
import initialUserState from './initialUserState'
import userReducer from 'reducers/user/user.reducer'
import * as action from "reducers/user/user.actions";
import { useAuth0 } from '@auth0/auth0-react'

export interface ChildrenProps {
	children: React.ReactNode
}

export default function UserProvider(props: ChildrenProps) {

	const [userState, dispatch] = useReducer(userReducer, initialUserState)
	const { user, isAuthenticated, getIdTokenClaims, getAccessTokenSilently } = useAuth0()
	
	useEffect(() => {
		const registerLoginUser = async () => {
			const token = await getAccessTokenSilently()			
			if (token) {
				action.registerLoginUserAction(dispatch, user, token)
				//	console.log(token)
			}
		}
		registerLoginUser()
	}, [isAuthenticated, user])

	const updateUserLanguage = useCallback(async (lang: string) => {
		const token = await getAccessTokenSilently()
		action.updateUserLanguageAction(dispatch, token, lang)
	 }, []);

	 const updateUserCountry = useCallback(async (count: string) => {
		const token = await getAccessTokenSilently()
		action.updateUserCountryAction(dispatch, token, count)
	 }, []);



	const memoProvider = useMemo(
		() => ({
			...userState,
			updateUserLanguage,
			updateUserCountry
		}), [
			userState,
			updateUserLanguage,
			updateUserCountry
		]
	);

	return (
		<UserContext.Provider value={memoProvider}>
			{props.children}
		</UserContext.Provider>
	)
}
