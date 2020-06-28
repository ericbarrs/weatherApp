export function tempConverter(numCelcius) {
	if (numCelcius) {
		return Math.round((numCelcius * 9) / 5 + 32);
	} else {
		return "No Data at this time";
	}
}
