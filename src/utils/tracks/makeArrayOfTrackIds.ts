export default function makeArrayOfTrackIds(tracks: any) {
	let newTracksList: any[] = [];
	tracks.forEach((track: any) => {
		newTracksList.push(track.id)
	});
	return newTracksList;
}