import { registerLoginUserAPI } from 'api/user.api';
import { updateUserLanguageAPI, updateUserCountryAPI, updateUserSettingsAPI } from 'api/user.api';
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

export async function updateUserCountryAction(dispatch: any, token: any, count: any) {
	try {		
		const response = await updateUserCountryAPI(token, { country: count })
		console.log(count);
		
			return dispatch({
				type: UserTypes.UPDATE_USER_COUNTRY,
				payload: count
			})
		
	} catch (err) {
		console.log(err);
	}
}

export async function updateUserSettingsAction(dispatch: any, token: any, name: string, lastname: string, nickname: string, dateOfBirth: string) {
	try {		
		const response = await updateUserSettingsAPI(token, name, lastname, nickname, dateOfBirth )
		//console.log(name, lastname, nickname, dateOfBirth);
			return dispatch({
				type: UserTypes.UPDATE_USER_SETTINGS,
				payload: {
					name: name, 
					lastname: lastname, 
					nickname: nickname, 
					dateOfBirth: dateOfBirth
				}
			})
	} catch (err) {
		console.log(err);
	}
}