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

export const updateUserLanguageAPI = async (token: string, lang: any): Promise<any> => {
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

export const updateUserCountryAPI = async (token: string, count: any): Promise<any> => {
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

export const updateUserSettingsAPI = async (token: string, name: string, lastname: string, nickname: string, dateOfBirth: string): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, lastname, nickname, dateOfBirth }),
	}
	const response = await fetch(`${basePath}/update-user-settings`, params)
	const dataUserSettings = await response.json()
	return dataUserSettings
}

export const getUserRole = async (token: any): Promise<any> => {
	
	const params = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await fetch(`${basePath}/user-role`, params)
	const data = await response.json()
	return data
}

export const updateUserRoleApi = async (role: string, userId: any, token: any): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ role: role }),
	}
	const response = await fetch(`${basePath}/user-role/${userId}`, params)
	const dataUserSettings = await response.json()
	return dataUserSettings
}

export const getUsersApi = async (token: any): Promise<any> => {
	const params = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await fetch(`${basePath}/users`, params)
	const data = await response.json()
	return data
}


export const deleteUserApi = async (userId: any, token: any): Promise<any> => {
	const params = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		}
	}
	const response = await fetch(`${basePath}/delete-user/${userId}`, params)
	const result = await response.json()
	return result
}