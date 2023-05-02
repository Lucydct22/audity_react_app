import { registerLoginUserAPI } from 'api/user.api';
import * as UserTypes from './user.types'

export async function registerLoginUserAction(dispatch: any, user: any, token: any) {
	try {		
		const response = await registerLoginUserAPI({ user }, token)
		if (response.status === 200 || response.status === 201) {
			return dispatch({
				type: UserTypes.REGISTER_LOGIN_USER,
				payload: {
					auth0User: user,
					user: response.user
				}
			})
		} else {
			throw new Error()
		}
	} catch (err) {
		console.log(err);
	}
}