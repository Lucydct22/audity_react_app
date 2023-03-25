export default function getDuration(audio: HTMLAudioElement) {
	return new Promise(function (resolve) {
		audio.addEventListener("loadedmetadata", function () {
			resolve(audio.duration);
		});
	});
}