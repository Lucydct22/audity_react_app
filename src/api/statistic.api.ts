import { basePath } from "./utils/config"

export const getStatisticsApi = async (token: any): Promise<any> => {
	const params = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await fetch(`${basePath}/statistics`, params)
	const data = await response.json()
	return data
}

export const reportErroredTrack = async (statisticName: string, trackId: any, token: string): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: statisticName }),
	}
	const response = await fetch(`${basePath}/report-errored-track/${trackId}`, params)
	const data = await response.json()
	return data
}

export const removeReportErroredTrack = async (statisticName: string, trackId: any, token: string): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(statisticName),
	}
	const response = await fetch(`${basePath}/remove-report-errored-track/${trackId}`, params)
	const dataLanguage = await response.json()
	return dataLanguage
}

export const updateTotalTrackPlayed = async (statisticName: string): Promise<any> => {
	const params = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: statisticName }),
	}
	const response = await fetch(`${basePath}/update-total-tracks-played`, params)
	const dataLanguage = await response.json()
	return dataLanguage
}