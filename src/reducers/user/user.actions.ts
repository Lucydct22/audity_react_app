import { registerLoginUserAPI } from 'api/user.api';
import { updateUserLanguageAPI } from 'api/user.api';
import * as UserTypes from './user.types'

export async function registerLoginUserAction(dispatch: any, user: any, token: any) {
	try {		
		const response = await registerLoginUserAPI({ user }, token)
		if (response.status === 200 || response.status === 201) {
			return dispatch({
				type: UserTypes.REGISTER_LOGIN_USER,
				payload: {
					auth0User: user,
					dbUser: response.user
				}
			})
		} else {
			throw new Error()
		}
	} catch (err) {
		console.log(err);
	}
}

export async function updateUserLanguageAction(dispatch: any, token: any, lang: any) {
	try {		
		const response = await updateUserLanguageAPI(token, { language: lang })
		console.log(lang);
		
			return dispatch({
				type: UserTypes.UPDATE_USER_LANGUAGE,
				payload: lang
			})
		// if (response.status === 200) {
		// } else {
		// 	throw new Error()
		// }
	} catch (err) {
		console.log(err);
	}
}