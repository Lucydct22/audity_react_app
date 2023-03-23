import { getTracksApi, getTrackByIdApi } from "../../api/music/tracks";
import { getDuration } from "../../utils/tracks/getDuration";
import { initAudio } from "../../utils/tracks/initAudio";
import makeArrayOfTrackIds from "../../utils/tracks/makeArrayOfTrackIds";
import { tracksCycle } from "../../utils/tracks/tracksCycle";
import * as TrackTypes from './trackTypes'

export const initCurrentTrackAction = function (dispatch: any) {
	getTracksApi().then(tracksResponse => {
		const tracksList = makeArrayOfTrackIds(tracksResponse);
		const random = Math.floor(Math.random() * tracksList.length);

		getTrackByIdApi(random.toString()).then(async res => {
			if (res) {
				const audio: any = initAudio(res);
				const duration: any = await getDuration(res.url);

				return dispatch({
					type: TrackTypes.INIT_CURRENT_TRACK,
					payload: {
						currentTrack: res,
						tracksList: tracksList,
						trackData: {
							url: res.url,
							audio: audio,
							duration: duration,
							currentTime: audio.currentTime,
							timeToEnd: duration - audio.currentTime,
							isPlaying: false
						}
					}
				})
			}
		})
	})
}

export const nextTrackAction = function (dispatch: any, trackState: any) {
	const trackId = tracksCycle(trackState.tracksList, trackState.currentTrack.id);

	getTrackByIdApi(trackId).then(async res => {
		const audio: any = initAudio(res);
		const duration: any = await getDuration(res.url);
		trackState.trackData.audio.pause();
		trackState.trackData.isPlaying && audio.play();

		return dispatch({
			type: TrackTypes.NEXT_TRACK,
			payload: {
				currentTrack: res,
				trackData: {
					url: res.url,
					audio: audio,
					duration: duration,
					currentTime: audio.currentTime,
					timeToEnd: duration - audio.currentTime,
					isPlaying: trackState.trackData.isPlaying
				}
			}
		})
	})
}

export const previousTrackAction = function (dispatch: any, trackState: any) {
	const tracksReverse = trackState.tracksList.reverse();
	const trackId = tracksCycle(tracksReverse, trackState.currentTrack.id);

	getTrackByIdApi(trackId).then(async res => {
		const audio: any = initAudio(res);
		const duration: any = await getDuration(res.url);
		trackState.trackData.audio.pause();
		trackState.trackData.isPlaying && audio.play();

		return dispatch({
			type: TrackTypes.PREV_TRACK,
			payload: {
				currentTrack: res,
				trackData: {
					url: res.url,
					audio: audio,
					duration: duration,
					currentTime: audio.currentTime,
					timeToEnd: duration - audio.currentTime,
					isPlaying: trackState.trackData.isPlaying
				}
			}
		})
	})
}