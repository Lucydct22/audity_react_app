export default function tracksCycle(array: any[], str: string) {
	const index = array.indexOf(str);
	if (index === -1) return undefined;
	return array[(index + 1) % array.length];
}