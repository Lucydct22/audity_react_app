import * as UserTypes from './user.types'

export default function userReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case UserTypes.REGISTER_LOGIN_USER:
			return {
				auth0User: payload.auth0User,
				dbUser: payload.dbUser
			}

		case UserTypes.UPDATE_USER_LANGUAGE:
			console.log(payload);
			return {
				...state,
				dbUser: {
					...state.dbUser,
					language: payload
				}
			}

		case UserTypes.UPDATE_USER_COUNTRY:
			console.log(payload);
			return {
				...state,
				dbUser: {
					...state.dbUser,
					country: payload
				}
			}

		default:
			return state
	}
}