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
	const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

	useEffect(() => {
		const registerLoginUser = async () => {
			const token = await getAccessTokenSilently()
			if (!isLoading && isAuthenticated && token) {
				action.registerLoginUserAction(dispatch, user, token)
			}
		}
		registerLoginUser()
	}, [isAuthenticated])

	const updateUserLanguage = useCallback(async (lang: string) => {
		const token = await getAccessTokenSilently()
		action.updateUserLanguageAction(dispatch, token, lang)
	}, []);

	const updateUserCountry = useCallback(async (count: string) => {
		const token = await getAccessTokenSilently()
		action.updateUserCountryAction(dispatch, token, count)
	}, []);

	 const updateUserSettings = useCallback(async (name: string, lastname: string, nickname: string, dateOfBirth: string) => {
		const token = await getAccessTokenSilently()
		action.updateUserSettingsAction(dispatch, token, name, lastname, nickname, dateOfBirth)
	 }, []);

	const memoProvider = useMemo(
		() => ({
			...userState,
			updateUserLanguage,
			updateUserCountry,
			updateUserSettings
		}), [
			userState,
			updateUserLanguage,
			updateUserCountry,
			updateUserSettings
		]
	);

	return (
		<UserContext.Provider value={memoProvider}>
			{props.children}
		</UserContext.Provider>
	)
}
