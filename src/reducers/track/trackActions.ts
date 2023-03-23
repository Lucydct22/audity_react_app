import { getTrackByIdApi } from "../../api/music/tracks";
import * as TrackTypes from './trackTypes'

export const initCurrentTrackAction = function (dispatch: any) {
	function initAudio(data: any) {
		const audio = document.createElement("audio");
		audio.src = data.url;
		audio.setAttribute("controls", "none");
		audio.setAttribute("preload", "auto");
		audio.setAttribute("loop", 'false');
		audio.setAttribute("muted", 'false');
		audio.style.display = "none";
		document.body.appendChild(audio);
		return audio;
	}

	function getDuration(src: any) {
		return new Promise(function (resolve) {
			var audio = new Audio();
			audio.addEventListener("loadedmetadata", function () {
				resolve(audio.duration);
			});
			audio.src = src;
		});
	}

	getTrackByIdApi('1').then(async res => {
		if (res) {
			const audio: any = initAudio(res);
			const duration: any = await getDuration(res.url);

			return dispatch({
				type: TrackTypes.INIT_CURRENT_TRACK,
				payload: {
					currentTrack: res,
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
}