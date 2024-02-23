var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = 1900;
var height = 900;

canvas.width = width;
canvas.height = height;

var platforms = [];

var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FFFFFF", "#000000"];

var color = colors[Math.floor(Math.random() * colors.length)];

var platformWidth = 16;
var platformHeight = 16;

var platformCount = 10000;

var keys = [];

setInterval(update, 1000 / 60);

function update() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    if (platforms.length < platformCount) {
        updateBlocks();
    }

    for (var i = 0; i < platforms.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);

        platforms[i].y -= platforms[i].dy;

        if (platforms[i].y < 0) {
            platforms.splice(i, 1);
        }
    }
}

function updateBlocks() {
    platforms.push({
        x: Math.random() * (width - platformWidth),
        y: 0,
        width: platformWidth,
        height: platformHeight,
        dy: -((Math.random() * 10.5))
    });
}

function clearAllBlocks() {
    platforms = [];
}

window.addEventListener("load", function () {
    update();
});

window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;

    if (keys[32]) {
        clearAllBlocks();
        keys[32] = false;
    }
});