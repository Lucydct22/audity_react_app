export default function tracksCycle(tracks: any[], id: string) {
	let idsArray: any = []
	tracks.forEach(el => {
		idsArray.push(el._id)
	});
	const index = idsArray.indexOf(id);
	if (index === -1) return undefined;
	return tracks[(index + 1) % idsArray.length];
}