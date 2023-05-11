import { basePath } from "api/utils/config"

export async function getContentLikedByUserId(userId: string, model: string, token: any) {
	const params = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}
	const response = await fetch(`${basePath}/${model}-liked-by-user/${userId}`, params)
	const data = await response.json()
	return data
}