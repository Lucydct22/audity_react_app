import { getRandomTrackApi, getTrackByIdApi } from "api/music/tracks";
import getDuration from "utils/tracks/getDuration";
import initAudio from "utils/tracks/initAudio";
import tracksCycle from "utils/tracks/tracksCycle";
import * as CurrentTrackTypes from './currentTrackTypes'

export const initCurrentTrackAction = async function (dispatch: any, trackState: any, tracklist: any) {
	await getRandomTrackApi().then(async (res: any) => {
		if (res.track) {
			const audio: HTMLAudioElement = initAudio(res.track);
			const duration: any = await getDuration(audio);
			return dispatch({
				type: CurrentTrackTypes.INIT_CURRENT_TRACK,
				payload: {
					currentTrack: res.track,
					trackData: {
						url: res.track.audioUrl,
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

export const nextTrackAction = async function (dispatch: any, trackState: any, tracklist: any) {
	const { currentTrack, trackData } = trackState;
	const trackId = tracksCycle(tracklist.tracks, currentTrack._id);
	trackData.isPlaying && trackData?.audio.pause();
	trackData.audio = null;

	await getTrackByIdApi(trackId).then(async (res: any) => {
		const audio: HTMLAudioElement = initAudio(res.track);
		const duration: any = await getDuration(audio);
		trackData.isPlaying && audio.play();
		trackData.isMuted && (audio.muted = true);
		trackData.hasLoop && (audio.loop = true);

		return dispatch({
			type: CurrentTrackTypes.NEXT_TRACK,
			payload: {
				currentTrack: res.track,
				trackData: {
					url: res.track.audioUrl,
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

export const previousTrackAction = async function (dispatch: any, trackState: any, tracklist: any) {
	const { currentTrack, trackData } = trackState;
	const tracksReverse = [...tracklist.tracks].reverse();
	const trackId = tracksCycle(tracksReverse, currentTrack._id);
	trackData.isPlaying && trackData?.audio.pause();
	trackData.audio = null;

	await getTrackByIdApi(trackId).then(async (res: any) => {
		const audio: HTMLAudioElement = initAudio(res.track);
		const duration: any = await getDuration(audio);
		trackData.isPlaying && audio.play();
		trackData.isMuted && (audio.muted = true);
		trackData.hasLoop && (audio.loop = true);

		return dispatch({
			type: CurrentTrackTypes.PREV_TRACK,
			payload: {
				currentTrack: res.track,
				trackData: {
					url: res.track.audioUrl,
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

export const selectCurrentTrackAction = async function (dispatch: any, track: any, currentTrackState: any) {
	currentTrackState.trackData.audio.pause()
	const audio: HTMLAudioElement = initAudio(track);
	const duration: any = await getDuration(audio);
	dispatch({
		type: CurrentTrackTypes.SELECT_CURRENT_TRACK,
		payload: {
			currentTrack: track,
			trackData: {
				url: track.audioUrl,
				audio: audio,
				duration: Math.round(duration),
				currentTime: audio.currentTime,
			}
		}
	})
	return audio.play()
}