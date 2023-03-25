import { Track } from "../../interfaces/music";

export default function makeArrayOfTrackIds(tracks: any) {
	let newTracksList: any[] = [];
	tracks.forEach((track: Track) => {
		newTracksList.push(track.id)
	});
	return newTracksList;
}