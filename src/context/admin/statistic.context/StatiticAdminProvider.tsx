import { useMemo, useEffect, useState, useReducer } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import StatisticAdminContext from './StatisticAdminContext'
import initialStatisticState from './initialStatisticState'
import { getStatisticsApi } from 'api/statistic.api';
import { ChildrenProps } from 'interfaces/global'
import statisticAdminReducer from 'reducers/admin/statisticAdmin/statisticAdmin.reducer';
import * as statisticAdminTypes from 'reducers/admin/statisticAdmin/statisticAdmin.types';

export default function StatisticAdminProvider(props: ChildrenProps) {
	const [statisticState, dispatch] = useReducer(statisticAdminReducer, initialStatisticState)
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

	useEffect(() => {
		const getStatisticsFetch = async () => {
			const token = await getAccessTokenSilently()
			if (!isLoading && isAuthenticated && token) {
				const getStatistics = await getStatisticsApi(token)
				if (getStatistics.status === 200) {
					return dispatch({
						type: statisticAdminTypes.INIT_STATISTICS,
						payload: {
							name: getStatistics.statistics[0].name,
							tracksFailed: getStatistics.statistics[0].tracksFailed,
							totalTracksPlayed: getStatistics.statistics[0].totalTracksPlayed,
							totalLikes: getStatistics.statistics[0].totalLikes,
						}
					})
				}
			}
		}
		getStatisticsFetch()
	}, [])

	const memoProvider = useMemo(
		() => ({
			...statisticState
		}), [
		statisticState
	]
	);

	return (
		<StatisticAdminContext.Provider value={memoProvider}>
			{props.children}
		</StatisticAdminContext.Provider>
	)
}