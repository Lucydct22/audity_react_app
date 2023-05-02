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