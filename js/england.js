// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1150;
canvas.height = 598;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/england.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var trashArray = ["images/beerbottle.png", "images/paper.png"];
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;
var seconds = 90;

function secondPassed() {

	var minutes = Math.round((seconds - 30)/60);

	var remainingSeconds = seconds % 60;

	if (remainingSeconds < 10) {

		remainingSeconds = "0" + remainingSeconds;	

	}

	//document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;

	if (seconds === 0) {

		clearInterval(countdownTimer);

		document.getElementById('countdown').innerHTML = "STOP!";

	} else {

		seconds--;

	}

}

var countdownTimer = setInterval('secondPassed()', 1000);

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

	hero.x = 50; //canvas.width / 2;
	hero.y = 420; //canvas.height / 2;
// Reset the game when the player catches a monster
var reset = function () {
	//hero.x = 100; //canvas.width / 2;
	//hero.y = 100; //canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	var randtrash = Math.floor((Math.random()*2)+1);
	if (randtrash == 1) {
		monsterImage.src = "images/beerbottle.png";
	}
	if (randtrash == 2) {
		monsterImage.src = "images/paper.png";
	}
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
	//touching wall
	if(
		hero.x < (canvas.width / canvas.width) 
	|| 
		hero.x > 1150 ){
			hero.speed = hero.speed * -1;
				}
				
	if(
		hero.y < (canvas.height / canvas.height) 
	|| 
		hero.y > 597 ){
			hero.speed = hero.speed * -1;
				}
	//Level 3
	if (monstersCaught == 20
	&& seconds > 0 
	) {
		window.location.href = 	"haiti.html";
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Litter Collected: " + monstersCaught + "/20", 32, 32);
	
	//Timer
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	//ctx.textAlign = "center";
	ctx.textAlign="start"; 
	//ctx.fillText("textAlign=start",150,60); 
	ctx.textBaseline = "top";
	ctx.fillText("Time: " + "0:" + seconds, 1000, 32);
	
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);

	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();