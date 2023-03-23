import { getAlbumsByIdApi } from "../../api/music/albums";
import { getTrackByIdApi } from "../../api/music/tracks";
import { getDuration } from "../../utils/tracks/getDuration";
import { initAudio } from "../../utils/tracks/initAudio";
import { tracksCycle } from "../../utils/tracks/tracksCycle";
import * as TrackTypes from './trackTypes'

export const initCurrentTrackAction = function (dispatch: any) {
	getAlbumsByIdApi('1').then(albumResponse => {
		const random = Math.floor(Math.random() * albumResponse.tracks.length);

		getTrackByIdApi(albumResponse.tracks[random]).then(async res => {
			if (res) {
				const audio: any = initAudio(res);
				const duration: any = await getDuration(res.url);

				return dispatch({
					type: TrackTypes.INIT_CURRENT_TRACK,
					payload: {
						currentTrack: res,
						album: albumResponse.tracks,
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
	const albumCycle = tracksCycle(trackState.album, trackState.currentTrack.id);
		
		getTrackByIdApi(albumCycle).then(async res => {
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
	const albumReverse = trackState.album.reverse();
	const albumCycle = tracksCycle(albumReverse, trackState.currentTrack.id);
		
		getTrackByIdApi(albumCycle).then(async res => {
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