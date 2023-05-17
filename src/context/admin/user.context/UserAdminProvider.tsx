import { useReducer, useMemo, useEffect, useCallback } from 'react'
import UserAdminContext from './UserAdminContext'
import initialUserState from './initialUserState'
import userReducer from 'reducers/admin/userAdmin/userAdmin.reducer'
import * as action from "reducers/admin/userAdmin/userAdmin.actions";
import { ChildrenProps } from 'interfaces/global'
import { useAuth0 } from '@auth0/auth0-react';

export default function UserAdminProvider(props: ChildrenProps) {
	const [userState, dispatch] = useReducer(userReducer, initialUserState)
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

	useEffect(() => {
		const getUsersFetch = async () => {
			const token = await getAccessTokenSilently()
			if (!isLoading && isAuthenticated && token) {
				action.initUsersAction(dispatch, token)
			}
		}
		getUsersFetch()
	}, [isLoading, isAuthenticated])

	const deleteUser = useCallback(async (userId: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Removing user`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && userId) {
			action.deleteUserAction(dispatch, userId, token, userState, messageApi)
		}
	}, [userState]);

	const updateUserRole = useCallback(async (role: any, userId: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Updating user`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (isAuthenticated && token && role && userId) {
			action.updateUserRoleAction(dispatch, role, userId, token, userState, messageApi)
		}
	}, [userState]);

	const memoProvider = useMemo(
		() => ({
			...userState,
			deleteUser,
			updateUserRole
		}), [
		userState,
		deleteUser,
		updateUserRole
	]
	);

	return (
		<UserAdminContext.Provider value={memoProvider}>
			{props.children}
		</UserAdminContext.Provider>
	)
}