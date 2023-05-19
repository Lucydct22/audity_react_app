import { getRandomTrackApi } from "api/music/tracks";
import { updateTotalTrackPlayed } from "api/statistic.api";
import getDuration from "utils/tracks/getDuration";
import initAudio from "utils/tracks/initAudio";
import tracksCycle from "utils/tracks/tracksCycle";
import * as CurrentTrackTypes from './currentTrackTypes'

export const initCurrentTrackAction = async function (dispatch: any, trackData: any) {
	await getRandomTrackApi().then(async (res: any) => {
		if (res.track) {
			const audio: HTMLAudioElement = initAudio(res.track, trackData.volume);
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
						volume: 1,
					}
				}
			})
		}
	})
}

export async function nextTrackAction(dispatch: any, trackState: any, tracklist: any) {
	const { currentTrack, trackData } = trackState;
	const track = await tracksCycle(tracklist.tracks, currentTrack._id);
	if (track && trackData.audio) {
		trackData.audio.pause();
		trackData.audio = null;
		const findNextTrack = tracklist.tracks.find((tr: any) => tr._id === track._id)
		const audio: HTMLAudioElement = initAudio(findNextTrack, trackData?.volume);
		const duration: any = await getDuration(audio);
		trackData.isPlaying && audio.play();
		trackData.isMuted && (audio.muted = true);
		trackData.hasLoop && (audio.loop = true);
		dispatch({
			type: CurrentTrackTypes.NEXT_TRACK,
			payload: {
				currentTrack: findNextTrack,
				trackData: {
					url: findNextTrack.audioUrl,
					audio: audio,
					duration: Math.round(duration),
					currentTime: audio.currentTime,
					isPlaying: true,
					isMuted: trackData.isMuted,
					hasLoop: trackData.hasLoop,
					volume: trackData.volume,
				}
			}
		})
		return await updateTotalTrackPlayed('global')
	}
}

export const previousTrackAction = async function (dispatch: any, trackState: any, tracklist: any) {
	const { currentTrack, trackData } = trackState;
	const tracksReverse = [...tracklist.tracks].reverse();
	const track = await tracksCycle(tracksReverse, currentTrack._id);
	if (track && trackData.audio) {
		trackData.audio.pause();
		trackData.audio = null;
		const findPrevTrack = tracklist.tracks.find((tr: any) => tr._id === track._id)
		const audio: HTMLAudioElement = initAudio(findPrevTrack, trackData.volume);
		const duration: any = await getDuration(audio);
		trackData.isPlaying && audio.play();
		trackData.isMuted && (audio.muted = true);
		trackData.hasLoop && (audio.loop = true);
		dispatch({
			type: CurrentTrackTypes.PREV_TRACK,
			payload: {
				currentTrack: findPrevTrack,
				trackData: {
					url: findPrevTrack.audioUrl,
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
		return await updateTotalTrackPlayed('global')
	}
}

export const selectCurrentTrackAction = async function (dispatch: any, track: any, currentTrackState: any) {
	currentTrackState.trackData.audio.pause()
	currentTrackState.trackData.audio = null
	const audio: HTMLAudioElement = initAudio(track, currentTrackState.trackData.volume);
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