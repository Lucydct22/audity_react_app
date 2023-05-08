import { registerLoginUserAPI } from 'api/user.api';
import { updateUserLanguageAPI, updateUserCountryAPI } from 'api/user.api';
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
		await updateUserLanguageAPI(token, { language: lang })
		return dispatch({
			type: UserTypes.UPDATE_USER_LANGUAGE,
			payload: lang
		})
	} catch (err) {
		console.log(err);
	}
}


export async function updateUserCountryAction(dispatch: any, token: any, count: any) {
	try {
		await updateUserCountryAPI(token, { country: count })
		return dispatch({
			type: UserTypes.UPDATE_USER_COUNTRY,
			payload: count
		})

	} catch (err) {
		console.log(err);
	}
}