import * as StatisticAdminTypes from './statisticAdmin.types'

export default function statisticAdminReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case StatisticAdminTypes.INIT_STATISTICS:
			return {
				name: payload.name,
				tracksFailed: payload.tracksFailed,
				totalTracksPlayed: payload.totalTracksPlayed,
				totalLikes: payload.totalLikes
			}

		default:
			return state
	}
}