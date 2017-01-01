window.setTimeout(() => {
	var divs = document.querySelectorAll('div[role="youtube-wrapper"]');
	for (var i = 0; i < divs.length; i++) {
		var wrap = divs.item(i),
			id = divs.item(i).getAttribute('data-for-id'),
			w = wrap.parentElement.offsetWidth,
			ifr = document.createElement('iframe');
		
		ifr.setAttribute('src', 'https://www.youtube.com/embed/' + id);
		ifr.setAttribute('width', w);
		ifr.setAttribute('height', (w / 16 * 9) | 0);
		ifr.setAttribute('frameborder', '0');
		ifr.setAttribute('allowfullscreen', '');

		wrap.appendChild(ifr);
	}
}, 250);