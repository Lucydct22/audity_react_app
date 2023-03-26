import { getTrackByIdApi } from "../../api/music/tracks";
import getDuration from "../../utils/tracks/getDuration";
import initAudio from "../../utils/tracks/initAudio";
import tracksCycle from "../../utils/tracks/tracksCycle";
import * as CurrentTrackTypes from './currentTrackTypes'

export const initCurrentTrackAction = async function (dispatch: any) {
	await getTrackByIdApi('1').then(async res => {
		if (res) {
			const audio: HTMLAudioElement = initAudio(res);
			const duration: any = await getDuration(audio);

			return dispatch({
				type: CurrentTrackTypes.INIT_CURRENT_TRACK,
				payload: {
					currentTrack: res,
					trackData: {
						url: res.url,
						audio: audio,
						duration: Math.round(duration),
						currentTime: audio.currentTime,
						isPlaying: false,
						isMuted: false,
						hasLoop: false,
						volume: 0.5,
					}
				}
			})
		}
	})
}

export const nextTrackAction = async function (dispatch: any, trackState: any, tracksList: any) {
	const { currentTrack, trackData } = trackState;
	const trackId = tracksCycle(tracksList.tracks, currentTrack.id);
	trackData.isPlaying && trackData?.audio.pause();
	trackData.audio = null;

	await getTrackByIdApi(trackId).then(async res => {
		const audio: HTMLAudioElement = initAudio(res);
		const duration: any = await getDuration(audio);
		trackData.isPlaying && audio.play();
		trackData.isMuted && (audio.muted = true);
		trackData.hasLoop && (audio.loop = true);

		return dispatch({
			type: CurrentTrackTypes.NEXT_TRACK,
			payload: {
				currentTrack: res,
				trackData: {
					url: res.url,
					audio: audio,
					duration: Math.round(duration),
					currentTime: audio.currentTime,
					isPlaying: trackData.isPlaying,
					isMuted: trackData.isMuted,
					hasLoop: trackData.hasLoop,
					volume: trackData.volume,
				}
			}
		})
	})
}

export const previousTrackAction = async function (dispatch: any, trackState: any, tracksList: any) {
	const { currentTrack, trackData } = trackState;
	const tracksReverse = [...tracksList.tracks].reverse();
	const trackId = tracksCycle(tracksReverse, currentTrack.id);
	trackData.isPlaying && trackData?.audio.pause();
	trackData.audio = null;

	await getTrackByIdApi(trackId).then(async res => {
		const audio: HTMLAudioElement = initAudio(res);
		const duration: any = await getDuration(audio);
		trackData.isPlaying && audio.play();
		trackData.isMuted && (audio.muted = true);
		trackData.hasLoop && (audio.loop = true);

		return dispatch({
			type: CurrentTrackTypes.PREV_TRACK,
			payload: {
				currentTrack: res,
				trackData: {
					url: res.url,
					audio: audio,
					duration: Math.round(duration),
					currentTime: audio.currentTime,
					isPlaying: trackData.isPlaying,
					isMuted: trackData.isMuted,
					hasLoop: trackData.hasLoop,
					volume: trackData.volume,
				}
			}
		})
	})
}