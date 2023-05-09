export default function initAudio(data: any) {
	const audio = new Audio();
	audio.src = data.audioUrl;
	audio.preload = 'auto';
	audio.loop = false;
	audio.muted = false;
	audio.volume = 0.5;
	return audio;
}