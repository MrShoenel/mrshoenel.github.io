~function() {
	if (location.host !== 'mrshoenel.github.io') {
		return; // only run on mrshoenel.github.io
	}
	if (location.protocol === 'http:') {
		location.replace('https://' + location.host + location.pathname + location.search + location.hash, true);
	}
}();