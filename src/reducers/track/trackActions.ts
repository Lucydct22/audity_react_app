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
							isPlaying: false,
							isMuted: false,
							hasLoop: false,
							volume: 0.5
						}
					}
				})
			}
		})
	})
}

export const nextTrackAction = function (dispatch: any, trackState: any) {
	const { tracksList, currentTrack, trackData } = trackState;
	const trackId = tracksCycle(tracksList, currentTrack.id);
	trackData.isPlaying && trackData?.audio.pause();
	trackData.audio = null;

	getTrackByIdApi(trackId).then(async res => {
		const audio: any = initAudio(res);
		const duration: any = await getDuration(res.url);
		trackData.isPlaying && audio.play();

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
					isPlaying: trackData.isPlaying,
					isMuted: false,
					hasLoop: false,
					volume: 0.5
				}
			}
		})
	})
}

export const previousTrackAction = function (dispatch: any, trackState: any) {
	const { tracksList, currentTrack, trackData } = trackState;
	const tracksReverse = [...tracksList].reverse();
	const trackId = tracksCycle(tracksReverse, currentTrack.id);
	trackData.isPlaying && trackData?.audio.pause();
	trackData.audio = null;

	getTrackByIdApi(trackId).then(async res => {
		const audio: any = initAudio(res);
		const duration: any = await getDuration(res.url);
		trackData.isPlaying && audio.play();

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
					isPlaying: trackData.isPlaying,
					isMuted: false,
					hasLoop: false,
					volume: 0.5
				}
			}
		})
	})
}