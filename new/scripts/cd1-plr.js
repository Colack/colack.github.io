function playerController() {
    handleJumping();
    handleHorizontalMovement();
    handleSpeedAdjustment();
    handleReset();
    handleBounds();
    handleEscapeKey();

    createCubeDood(player);
}

function handleJumping() {
    if ((keys[32] || keys[38] || keys[87]) && !player.jumping && player.grounded) {
        initiateJump();
        playJumpAudioIfAllowed();
    }
}

function initiateJump() {
    controlsMenuShown = true;
    player.jumping = true;
    player.grounded = false;
    player.velY = -physics.jump * 2;
    player.direction = player.direction === "right" ? "upr" : "upl";
}

function playJumpAudioIfAllowed() {
    if (!soundEffectPlaying && options.sfx) {
        jumpAudio.currentTime = 0;
        jumpAudio.play();
        soundEffectPlaying = true;
        setTimeout(() => soundEffectPlaying = false, 250);
    }
}

function handleHorizontalMovement() {
    const movingRight = keys[39] || keys[68];
    const movingLeft = keys[37] || keys[65];
    if (movingRight && player.velX < physics.speed) {
        player.velX++;
        player.direction = player.jumping ? "upr" : "right";
    }
    if (movingLeft && player.velX > -physics.speed) {
        player.velX--;
        player.direction = player.jumping ? "upl" : "left";
    }
}

function handleSpeedAdjustment() {
    if (keys[16]) {
        physics.speed = 6;
    } else if (keys[17]) {
        physics.speed = 1;
    } else {
        physics.speed = 4;
    }
}

function handleReset() {
    if (keys[82] && !cannotPress) {
        cannotPress = true;
        setTimeout(() => cannotPress = false, 1000);
        resetPlayerPosition();
    }
}

function handleBounds() {
    if (player.y < canvas.height - player.h) {
        player.jumping = true;
    }

    player.velX *= physics.friction;
    player.velY += physics.gravity;
    player.x += player.velX;
    player.y += player.velY;

    if (player.x >= canvas.width - player.w) {
        player.x = canvas.width - player.w;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if (player.y >= canvas.height - player.h) {
        player.y = canvas.height - player.h;
        player.jumping = false;
        player.grounded = true;
        player.direction = player.direction === "upr" ? "right" : "left";
    }

    if (player.y <= 0) {
        player.y = 1;
    }
}

function handleEscapeKey() {
    if (keys[27] && currentMenuOption == 7 && !cannotPress) {
        cannotPress = true;
        currentMenuOption = 2;
        currentEditorMenuOption = 0;
        sentInfoNotif = false;
        setTimeout(() => {
            cannotPress = false;
            keys[27] = false;
        }, 250);
    }
}

function resetPlayerPosition() {
    player.x = levelStartPost.x * 32;
    player.y = levelStartPost.y * 32;
    player.velX = 0;
    player.velY = 0;
    player.direction = "right";
    player.grounded = true;
    player.jumping = false;
}

function collisionSide(player, tile) {
    var deltaX = player.x + player.w / 2 - (tile.x + tile.w / 2);
    var deltaY = player.y + player.h / 2 - (tile.y + tile.h / 2);
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return deltaX > 0 ? "right" : "left";
    } else {
        return deltaY > 0 ? "bottom" : "top";
    }
}

function collisionCheck(level) {
    for (var i = 0; i < level.length; i++) {
        for (var j = 0; j < level[i].length; j++) {
            var x = j * 32;
            var y = i * 32;
            var tile = {
                x: x,
                y: y,
                w: 32,
                h: 32
            }
            var collision = player.x < x + tile.w && player.x + player.w > x && player.y < y + tile.h && player.y + player.h > y;
            if (!collision) continue;
            switch (level[i][j]) {
                case 0:
                    break;
                case 1:
                    var side = collisionSide(player, tile);
                    switch (side) {
                        case "bottom":
                            player.y = tile.y + tile.h;
                            player.velY = 0;
                            break;
                        case "top":
                            player.grounded = true;
                            player.jumping = false;
                            player.y = tile.y - player.h;
                            player.velY = 0;
                            if (player.direction == "upr") {
                                player.direction = "right";
                            } else if (player.direction == "upl") {
                                player.direction = "left";
                            }
                            break;
                        case "left":
                            player.x = tile.x - player.w;
                            break;
                        case "right":
                            player.x = tile.x + tile.w;
                            break;
                    }
                    break;
                case 2:
                    if (options.sfx) {
                        winAudio.currentTime = 0;
                        winAudio.play();
                    }
                    if (currentMenuOption == 1) {
                        currentLevel++;
                        levelTranslated = false;
                        checkForMusicSwap();
                    } else {
                        currentLevel = 1;
                        currentMenuOption = 2;
                        alert("Level Completed!");
                        resetAllButtons();
                        resetPlayerPosition();
                        sentInfoNotif = false;
                    }
                    break;
                case 3:
                    level[i][j] = 0;
                    player.score += 100;
                    break;
                case 4:
                    resetPlayerPosition();
                    break;
            }
        }
    }
}