import { message } from 'antd';
import * as UserAdminTypes from './userAdmin.types'
import * as api from 'api/user.api';

export async function initUsersAction(dispatch: any, token: any) {
	try {
		const response: any = await api.getUsersApi(token)
		if (response.status === 200) {
			return dispatch({
				type: UserAdminTypes.INIT_USERS,
				payload: response.users
			})
		} else {
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		message.error('Server error')
	}
}

export async function deleteUserAction(dispatch: any, userId: string, token: any, usersState: any, messageApi: any) {
	try {
		const userToDelete: any = await api.deleteUserApi(userId, token)
		if (usersState.users.length > 0 || userToDelete.status === 200) {
			const filteredUsers = usersState.users.filter((item: any) => item._id !== userId)
			messageApi.destroy()
			message.success(`User deleted`)
			return dispatch({
				type: UserAdminTypes.DELETE_USER,
				payload: filteredUsers
			})
		} else {
			messageApi.destroy()
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		messageApi.destroy()
		message.error('Server error')
	}
}

export async function updateUserRoleAction(dispatch: any, role: string, userId: any, token: any, userState: any, messageApi: any) {
	try {
		const userToUpdate = await api.updateUserRoleApi(role, userId, token)
		
		if (userToUpdate.status === 200) {
			const findIndexUser = userState.users.findIndex((user: any) => user._id === userId)
			userState.users[findIndexUser].role = role
			messageApi.destroy()
			message.success(`User role updated`)
			return dispatch({
				type: UserAdminTypes.UPDATE_USER_ROLE,
				payload: userState
			})
		} else {
			messageApi.destroy()
			message.warning(`Something went wrong`)
		}
	} catch (err) {
		messageApi.destroy()
		message.error(`Server error`)
	}
}