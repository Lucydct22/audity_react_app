import { basePath } from "./utils/config"

export const registerLoginUserAPI = async (user: any, token: string): Promise<any> => {
	const params = {
		method: "POST",
		headers: {
      Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	}
	const response = await fetch(`${basePath}/register-login-user`, params)
	const data = await response.json()
	return data
}

export const updateUserLanguageAPI = async ( token: string, lang: any): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
      Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(lang),
	}
	const response = await fetch(`${basePath}/update-user-language`, params)
	const dataLanguage = await response.json()
	return dataLanguage
}

export const updateUserCountryAPI = async ( token: string, count: any): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
      Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(count),
	}
	const response = await fetch(`${basePath}/update-user-country`, params)
	const dataCountry = await response.json()
	return dataCountry
}


