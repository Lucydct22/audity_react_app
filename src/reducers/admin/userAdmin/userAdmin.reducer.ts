import * as UserAdminTypes from './userAdmin.types'

export default function userAdminReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case UserAdminTypes.INIT_USERS:
			return {
				...state,
				users: payload
			}

		case UserAdminTypes.DELETE_USER:
			return {
				...state,
				users: payload
			}

		case UserAdminTypes.UPDATE_USER_ROLE:
			return {
				...state,
				users: payload.users
			}

		default:
			return state
	}
}