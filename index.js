let hasTouchScreen2 = false;
if ("maxTouchPoints" in navigator) { 
    hasTouchScreen2 = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen2 = navigator.msMaxTouchPoints > 0; 
} else {
    var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
		hasTouchScreen2 = !!mQ.matches;
	}
}

function animate() {
	let scrollY = document.querySelector('#contain').scrollTop;
	let sections = document.querySelectorAll('.section');
	if (scrollY >= (document.querySelector('.full-section').clientHeight * 0.25)) {
		sections[0].style.transform = 'translatex(0)';
		sections[0].style.opacity = 1;
	} else {
		sections[0].style.transform = 'translateX(-5em)';
		sections[0].style.opacity = 0;
	}
	if (scrollY >= (document.querySelector('.full-section').clientHeight * 1)) {
		sections[1].style.transform = 'translatex(0)';
		sections[1].style.opacity = 1;
	} else {
		sections[1].style.transform = 'translateX(5em)';
		sections[1].style.opacity = 0;
	}
	if (scrollY >= (document.querySelector('.full-section').clientHeight * 1.1)) {
		sections[2].style.transform = 'translatex(0)';
		sections[2].style.opacity = 1;
	} else {
		sections[2].style.transform = 'translateX(-5em)';
		sections[2].style.opacity = 0;
	}
	requestAnimationFrame(animate);
}

if (!hasTouchScreen2)
	requestAnimationFrame(animate);