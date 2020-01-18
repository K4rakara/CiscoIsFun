let hasTouchScreen = false;
if ("maxTouchPoints" in navigator) { 
    hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0; 
} else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
		hasTouchScreen = !!mQ.matches;
	}
}

function aniHeader() {
	let scrollY = document.querySelector('#contain').scrollTop;
	if (scrollY >= (document.querySelector('.full-section').clientHeight * 0.75)) {
		document.querySelector('#header').style.transform = 'translateY(0)';
	} else {
		document.querySelector('#header').style.transform = 'translateY(-5em)';
	}
	requestAnimationFrame(aniHeader);
}

if (!hasTouchScreen)
	requestAnimationFrame(aniHeader);