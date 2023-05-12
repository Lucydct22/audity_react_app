import { basePath } from "../utils/config";

export const searchContentApi = async (query: string): Promise<any> => {
	
	const response = await fetch(`${basePath}/search-content/${query}`)
	const data = await response.json()
	console.log(response);
	return data
}