var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var scoreId = document.getElementById("score");

var width = 1600;
var height = 720;

canvas.width = width;
canvas.height = height;

var platforms = [];

var friction = 0.9;
var gravity = 0.98;

var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"];

var color = colors[Math.floor(Math.random() * colors.length)];

var platformWidth = 16;
var platformHeight = 16;

var scoreCount = 0;

var platformCount = 10000;

function update() {
    setTimeout(update, 1000 / 60);

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // make it so that the number of blocks specified by platformCount is always on the screen
    if (platforms.length < platformCount) {
        updateBlocks();
    }

    for (var i = 0; i < platforms.length; i++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);

        platforms[i].y -= platforms[i].dy;

        if (platforms[i].y < 0) {
            platforms.splice(i, 1);
            scoreCount++;
        }
    }

    scoreId.innerHTML = 'Score: ' + scoreCount;
    
}

function updateBlocks() {
    platforms.push({
        x: Math.random() * (width - platformWidth),
        y: height,
        width: platformWidth,
        height: platformHeight,
        dy: Math.random() * 10
    });
}

window.addEventListener("load", function () {
    update();
});
