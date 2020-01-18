var olScrollbar = true;

document.addEventListener('load', () => {
	let target = document.querySelector('#contain');
	olScrollbar = !(target.offsetWidth - target.clientWidth > 0);
	target.style.paddingRight = `${target.offsetWidth - target.clientWidth}px`;
	document.addEventListener('resize', () => {
		let target = document.querySelector('#contain');
		target.style.paddingRight = '0px';
		if (target.offsetWidth - target.clientWidth > 0) olScrollbar = false;
		target.style.paddingRight = `${target.offsetWidth - target.clientWidth}px`;
	});
});

