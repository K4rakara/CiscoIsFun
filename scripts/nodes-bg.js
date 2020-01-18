let canvas = document.querySelector('#nodes-bg');
let ctx = canvas.getContext('2d');
let width = canvas.clientWidth;
let height = canvas.clientHeight;
let cx = width / 2;
let cy = height / 2;
let fov = width * 0.8;
let rad = width / 4;
canvas.width = width;
canvas.height = height;

let nodes = [];

class node {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.px = 0;
		this.py = 0;
		this.ps = 0;
		this.theta = Math.random() * 2 * Math.PI;
		this.phi = Math.acos( (Math.random() * 2) - 1);
		this.alt = Math.cos( this.theta );
		this.v = Math.random() / 100 + 0.001;
	}
	update() {
		this.theta += this.v;
		this.phi -= this.v;
		this.alt = Math.abs( Math.cos( this.theta ) );
		this.x = (
			(rad + this.alt)
			* Math.sin(this.phi + Math.cos(this.theta))
			* Math.cos(this.theta)
		);
		this.y = (
			(rad + this.alt)
			* Math.sin(this.phi + Math.cos(this.theta))
			* Math.sin(this.theta)
		);
		this.z = (
			(rad + this.alt)
			* Math.cos(this.phi + Math.cos(this.theta))
		);
		this.ps = fov / ( fov - this.z);
		this.px = ( this.x * this.ps ) + cx;
		this.py = ( this.y * this.ps ) + cy;
	}
	draw() {
		ctx.globalAlpha = 1;
		ctx.fillStyle = '#fcfcfc';
		ctx.beginPath();
		ctx.arc( this.px, this.py, 2, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		nodes.forEach((node) => {
			let distance = Math.abs(Math.sqrt(
				Math.pow(node.px - this.px, 2)
				+ Math.pow(node.py - this.py, 2)
			));
			ctx.globalAlpha = Math.abs(distance);
			if (distance <= 200) {
				ctx.strokeStyle = '#fcfcfc';
				ctx.globalAlpha = (200 - distance) / 200;
				ctx.beginPath();
				ctx.moveTo(this.px, this.py);
				ctx.lineTo(node.px, node.py);
				ctx.stroke();
				ctx.closePath();
			}
		});
	}
}

function configure() {
	width = canvas.clientWidth;
	height = canvas.clientHeight;
	cx = width / 2;
	cy = height / 2;
	fov = width * 0.8;
	if (width > height) {
		rad = width / 4;
	} else {
		rad = height / 4;
	}
	canvas.width = width;
	canvas.height = height;
}

function genNodes() {
	for (let i = 0; i < 32; i++) {
		nodes.push(new node());
	}
}

function update() {
	nodes.forEach((node) => {
		node.update();
	});
	ctx.clearRect(0,0,width,height);
	nodes.forEach((node) => {
		node.draw();
	});
	requestAnimationFrame(update);
}

genNodes();
configure();
requestAnimationFrame(update);