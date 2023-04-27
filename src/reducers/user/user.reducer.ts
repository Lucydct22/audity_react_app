import * as UserTypes from './user.types'

export default function userReducer(state: any, action: any) {
  const { type, payload } = action;

	switch (type) {
		case UserTypes.REGISTER_LOGIN_USER:
			return {
				auth0User: payload.auth0User,
				user: payload.user
			}			
	
		default:
			break;
	}
}