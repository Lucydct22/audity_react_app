import { Track } from "../../interfaces/music";

export default function makeArrayOfTrackIds(tracks: any) {
	let newTracklist: any[] = [];
	tracks.forEach((track: Track) => {
		newTracklist.push(track.id)
	});
	return newTracklist;
}