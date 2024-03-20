var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var txt = document.getElementById('text');
var colort = document.getElementById('colorthing');

canvas.width = 256
canvas.height = 256;

var color;
var colorstr;
var hash;
var str;

function main() {
    var username = prompt("Please enter your username:");
    str = username;
    hash = hashString();

    color = '#' + (hash & 0xFFFFFF).toString(16);
    colorstr = color;

    drawIcon();
}

function hashString() {
    str = str.toLowerCase(); // Make the string lowercase
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash); // Convert the current character at I to a number, then add it to the hash.
    }
    return hash; // Return the hash
}

function drawIcon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing

    for (var i = 0; i < 32; i++) {
        if (hash & (1 << i)) {
            var row = Math.floor(i / 4); // Calculate row
            var col = i % 4; // Calculate column
            ctx.fillStyle = color;
            ctx.fillRect(col * 32, row * 32, 32, 32); // Draw block
            ctx.fillRect((7 - col) * 32, row * 32, 32, 32); // Mirror horizontally
        }
    }

    txt.innerHTML = "Iconview for " + str + " with hash " + hash;
    colort.innerHTML = "Color: " + colorstr;

    requestAnimationFrame(drawIcon);
}

main();