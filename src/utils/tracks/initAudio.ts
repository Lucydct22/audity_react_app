export function initAudio(data: any) {
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