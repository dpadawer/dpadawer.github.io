const factoryCount = 6;

const ctxs = [
	document.getElementById("factory0").getContext("2d"),
	document.getElementById("factory1").getContext("2d"),
	document.getElementById("factory2").getContext("2d"),
	document.getElementById("factory3").getContext("2d"),
	document.getElementById("factory4").getContext("2d"),
	document.getElementById("factory5").getContext("2d")
];

const factories = [[], [], [], [], [], []];

const factoryStrings = [
	"RRQRRRR RRQRRRQ RRQRRQQ RRRRQQR RRRQQRR RRQRRRR RRQRRRQ RRQRRRR RRQQRRQ RRQQQRR RRQQQQR RRRQRQQ RRQRQQQ RRQRRQQ RRQQRQR RRQQRQR RRQRRRQ RRRQQRR RRQQQQR RRQQQRQ RRQRQQR RRQRRRQ RRQQRQR RRQRRQR RRQQQQR RRQRRRQ RRQRRRQ RRQQRRQ RRRQRQR RRQRRQQ RRQRRQQ RRQRRRQ RRQQQQR RRQRRQR RRQQRQR RRQQQQR RRQRRRQ RRQQRQQ RRRQRQQ RRQRQQR RRRQRQQ RRQRRQQ RRQQRQR",
	"QQ QQQ RRR Q QRR RQR R RQ QRR R QRR QQ QQQ QR RRR Q R RQR QR RQ Q RR RRRQ R Q QQQ Q RRRR R RQQR RQR RR QQ R QQ RQ Q R RQR RR RQ RQRR RQQR RQRR RQ QR R",
	"RRRRQQ RRRQRQ RQQQQQ RQQRQQ QRRRRQ QRQRQQ RQQRQQ RQQQRQ QRRRQQ RQQQRQ QRRRQQ QRRRQQ QRQRQQ RQRQRQ RQRRRQ",
	"QRRRR RQRRR RRQRQ RRQRQ QRRRR RRRRR RRQRQ RRQRQ RRQQQ RQRRR QRRQR RQRQQ RRQRR QRRQQ RQQQR RRRRR RQRQR RRRRQ QRRQQ RQRQQ",
	"RRRRRRRR RRRRRRRRRRRRRRRRRRRRR RRRR RRRR RRRRR RRRRRRRRRRRRRRRRRR RRRRRRRRRRRRRRRRRRR RRRRRR RRRRRRRRR RRRRR RRRRRRRRRRRR RRRR RR RRRRR RRRRRRRRRRRRRR RR RRRRRRRRRRRRRRRRRR RRRRR RRRRR RRRR",
	"QQQQPPPP QQPPPP QQQPP QQQQPPP QQQPP QQPPPP QQQQPPPP QQPPP QP QQQPPP QPPPP QQQQPPP QQQQPPPP QPPPPP QQQQQP QPPPPP QPP QPPPPP QPPPP QQQQQPP QPPPPP QQQP QQQP QPP QP QQQPPP QPPPP"
];

const imageUrls = ["images/factory.jpg", "images/q.png", "images/r.png", "images/blank.png", "images/machine.png"]
const images = [];

const space = 75;
const imgSize = 200;
const speed = 3;

const pausedFactories = [true, true, true, true, true, true];

function startFactory(idx) {
	pausedFactories[idx] = false;
	document.getElementById("startFactory" + idx).disabled = true;
	document.getElementById("pauseFactory" + idx).disabled = false;
	document.getElementById("resetFactory" + idx).disabled = false;
	drawFactory(idx);
}

function pauseFactory(idx) {
	pausedFactories[idx] = true;
	document.getElementById("startFactory" + idx).disabled = false;
	document.getElementById("pauseFactory" + idx).disabled = true;
	document.getElementById("resetFactory" + idx).disabled = false;
}

function resetFactory(idx) {
	initFactory(idx);
	startFactory(idx);
}

function drawFactory(idx) {		
	if (pausedFactories[idx]) {
		return;
	}
	
	let ctx = ctxs[idx];
	
	ctx.globalCompositeOperation = "destination-over";
	ctx.clearRect(0, 0, 1500, 840);

	// Top-layer stuff
	ctx.drawImage(images[4], 0, 0, 1500, 840);

	let curFactory = factories[idx];

	// All the letters
	for (let i = 0; i < curFactory.length; ++i) {
		let curLet = curFactory[i];
		ctx.drawImage(curLet[0], curLet[1], curLet[2], imgSize, imgSize);
		curLet[1] += speed;
		curLet[2] += (speed / 12);
	}
	
	if (curFactory[curFactory.length - 1][1] >= 2000) {
		// Everything's off the screen.
		pausedFactories[idx] = true;
		document.getElementById("pauseFactory" + idx).disabled = true;
	}
	
	// Bottom layer
	ctx.drawImage(images[0], 0, 0, 1500, 840);
}

function drawFactories() {
	for (let i = 0; i < factoryCount; ++i) {
		drawFactory(i);
	}
	
	window.requestAnimationFrame(drawFactories);
}

function initFactory(idx) {
	factory = [];
	let curStr = factoryStrings[idx];
	
	for (let i = 0; i < curStr.length; ++i) {
		let curChar = curStr[i];
		switch (curChar) {
			case "Q":
				factory.push([images[1], 0 - (i * (imgSize + space)), 525 - ((i * (imgSize + space)) / 12)]);
				break;
			case "R":
				factory.push([images[2], 0 - (i * (imgSize + space)), 525 - ((i * (imgSize + space)) / 12)]);
				break;
			case " ":
				factory.push([images[3], 0 - (i * (imgSize + space)), 525 - ((i * (imgSize + space)) / 12)]);
				break;
		}
	}
	
	factories[idx] = factory;
}

function startFactories() {
	for (let i = 0; i < factoryCount; ++i) {
		initFactory(i);
		drawUnstartedFactory(i);
	}
	drawFactories();
}

function drawUnstartedFactory(idx) {
	// Need this since we can't start everything at once, sadly.
	let ctx = ctxs[idx];
	
	ctx.globalCompositeOperation = "destination-over";
	ctx.clearRect(0, 0, 1500, 840);
	
	// Bottom layer
	ctx.drawImage(images[0], 0, 0, 1500, 840);
}

function initImages() {
	imageLoadCount = 0;
	imageUrls.forEach(src => {
		const image = new Image();
		image.src = src;
		image.onload = () => {
			++imageLoadCount;
			if (imageLoadCount === imageUrls.length) {
				startFactories();
			}
		}
		
		images.push(image);
	});
}

initImages();