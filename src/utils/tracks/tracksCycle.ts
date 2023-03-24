export function tracksCycle(array: any, str: string) {
	const i = array.indexOf(str);
	if (i === -1) return undefined;
	return array[(i + 1) % array.length];
}