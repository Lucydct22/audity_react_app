export default function tracksCycle(array: any[], str: string) {
	let idsArray: any = []
	array.forEach(el => {
		idsArray.push(el._id)
	});
	const index = idsArray.indexOf(str);
	if (index === -1) return undefined;
	return idsArray[(index + 1) % idsArray.length];
}