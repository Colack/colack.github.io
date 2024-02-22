var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

canvas.width = game.width;
canvas.height = game.height;

setInterval(update, 1000 / 60);

function update() {
    switch (currentMenuOption) {
        case 0:
            createTitleScreen();
            if (!audioPlaying & options.music) {
                menuAudio.currentTime = 0;
                menuAudio.play();
                audioPlaying = true;
            }
            titleScreenControls();
            break;
        case 1:
            if (inGame) {
                if (!levelTranslated) {
                    translateLevelData(allStoryModeLevels[currentLevel - 1]);
                    levelTranslated = true;
                }
                if (!doneOnce) {
                    checkForMusicSwap();
                    doneOnce = true;
                }
                drawLevel(level);
                playerController();
                if (!controlsMenuShown) {
                    drawControlsMenu();
                }
                if (currentLevel == 41) {
                    inGame = false;
                    currentMenuOption = 9;
                    audioPlaying = false;
                }
            }
            break;
        case 2:
            if (!audioPlaying && options.music) {
                muteAllMusic();
                editorAudio.currentTime = 0;
                editorAudio.play();
                audioPlaying = true;
            }
            createEditorScreen();
            editorMenuControls();
            break;
        case 3:
            createSettingsScreen();
            if (!audioPlaying && options.music) {
                settingsAudio.currentTime = 0;
                settingsAudio.play();
                audioPlaying = true;
            }
            settingsMenuControls();
            break;
        case 4:
            createCreditsScreen();
            if (!timerStarted) {
                timerStarted = true;
                setTimeout(function() {
                    currentMenuOption = 0;
                    timerStarted = false;
                }, 5000);
            }
            break;
        case 5:
            createStartScreen();
            startScreenControls();
            break;
        case 6:
            createEditScreen();
            editorControls();
            break;
        case 7:
            if (!sentInfoNotif) {
                var levelCode = prompt("Enter the level data to load: ", "Level data");
                if (levelCode != null) {
                    resetPlayerPosition();
                    translateLevelData(levelCode);
                }
                sentInfoNotif = true;
            }
            drawLevel(level);
            if (trailerMode) {
                createCubeTop(cubetop);
            }
            playerController();
            break;
        case 8:
            createDebugScreen();
            break;
        case 9:
            if (keys[32]) {
                player.score = 0;
                currentMenuOption = 0;
                currentLevel = 1;
                levelLoaded = false;
                levelTranslated = false;
                doneOnce = false;
                inGame = false;
                controlsMenuShown = false;
                sentCompleteNotif = false;
                sentInfoNotif = false;
                audioPlaying = false;
                cannotPress = false;
                timerStarted = false;
                levelLoaded = false;
                menuShowing = false;
                pressSpaceToOpenMenu = false;
                soundEffectPlaying = false;
                muteAllMusic();
            }

            drawFinalScreen();
            break;
    }
}

function drawFinalScreen() {
    drawBackground("orange");
    ctx.fillStyle = "black";
    ctx.font = "30px Helvetica";

    player.x = 380;
    player.y = 80;
    player.direction = "right";
    cubetop.x = 98;
    cubetop.y = 80;

    drawBackground("orange");
    createCubeDood(player);
    createCubeTop(cubetop);
    drawLogo(192, 30, 125, 50)

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";

    ctx.fillText("CubeDood had completed all of the levels,", 75, 175);
    ctx.fillText("and had entered CubeTops castle,", 75, 200);
    ctx.fillText("But oh! That CubeTop! He had left without a trace.", 75, 225);
    ctx.fillText("However, CubeTop had left a note.", 75, 250);
    ctx.fillText("The note had some text written on it. It said:", 75, 275);
    ctx.fillText("CubeDood! You may have completed all my levels,", 75, 300);
    ctx.fillText("and have beaten level 15,", 75, 325);
    ctx.fillText("But when I return, you will not see it coming.", 75, 350);
    ctx.fillText("When I return, this whole world will come to fight you!", 75, 375);
    ctx.fillText("To be continued... in CubeDood vs The World!", 75, 400);
    ctx.fillText("Thank you for playing!", 75, 425);
    ctx.fillText("Press space to return to the main menu.", 75, 450);

    /*
    ctx.fillText("and entered a mysterious room, with a note.", 75, 200);
    ctx.fillText("It said:", 75, 225);
    ctx.fillText("Congratulations! You have completed the game!", 75, 250);
    ctx.fillText("You have beaten the game, and you are now a true CubeDood.", 75, 275);
    ctx.fillText("Thank you for playing!", 75, 300);
    ctx.fillText("Press space to return to the main menu.", 75, 325);
    ctx.fillText("But when flipped over, it said:", 75, 375);
    ctx.fillText("'CubeDood, you may have beaten me this time,'", 75, 400);
    ctx.fillText("'but I will be back, and this entire world will come with me.'", 75, 425);
    ctx.fillText("To be continued... in CubeDood 2!", 75, 450);
    */

    drawVersion();
    drawStudios();

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("in 'Finale'", 310, 130);
}

function createTitleScreen() {
    player.x = 380;
    player.y = 180;
    player.direction = "right";
    cubetop.x = 98;
    cubetop.y = 180;
    cubetop.direction = "left";

    drawBackground("orange");
    createCubeDood(player);
    createCubeTop(cubetop);
    drawLogo(192, 130, 125, 150);
    drawMainMenuButtons();
    drawVersion();
    drawStudios();
    drawButtonPointer(currentMainMenuOption);

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("In 'The Memory Snatcher'", 205, 230);
}

function drawControlsMenu() {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.rect(0, 279, 512, 200);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0, 279, 512, 200);
    ctx.stroke();
    ctx.closePath();

    ctx.font = "15px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText("Warning! This game is extremely hard!", 100, 300);

    ctx.font = "15px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText("The evil CubeTop is at it again!", 100, 340);
    ctx.fillText("He has stolen the memories of the world again.", 100, 360);
    ctx.fillText("To save the world, beat all 40 levels!", 100, 380);
    ctx.fillText("Use the arrow keys/WASD to move.", 100, 400);
    ctx.fillText("Press space to jump.", 100, 420);
    ctx.fillText("Press shift to speed up and control to slow down", 100, 440);
    ctx.fillText("(Press space to hide this menu)", 100, 460);

}

function createSettingsScreen() {
    cubetop.x = 98;
    cubetop.y = 180;
    cubetop.direction = "left";

    player.x = 380;
    player.y = 180;
    player.direction = "right";

    drawBackground("orange");
    createCubeDood(player);
    createCubeTop(cubetop);
    drawVersion();
    drawStudios();
    drawSettingsButtons();
    drawButtonPointer(currentSettingsMenuOption);
    drawLogo(192, 130, 125, 150);

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("in 'Settings'", 302, 230);
}

function createCreditsScreen() {
    player.x = 380;
    player.y = 80;
    player.direction = "right";
    cubetop.x = 98;
    cubetop.y = 80;

    drawBackground("orange");
    createCubeDood(player);
    createCubeTop(cubetop);
    drawLogo(192, 30, 125, 50)
    createCreditsText();
    drawVersion();
    drawStudios();

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("in 'Credits'", 310, 130);
}

function createEditorScreen() {
    player.x = 380;
    player.y = 180;
    player.direction = "right";
    cubetop.x = 98;
    cubetop.y = 180;
    cubetop.direction = "left";

    drawBackground("orange");
    createCubeDood(player);
    createCubeTop(cubetop);
    drawLogo(192, 130, 125, 150);
    drawEditorButtons();
    drawButtonPointer(currentEditorMenuOption);
    drawVersion();
    drawStudios();

    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("in 'Editor'", 310, 230);
}

function createStartScreen() {
    drawBackground("black");

    ctx.font = "15px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Press Space to Start", 195, 200);
}

function createEditScreen() {
    drawBackground("orange");

    ctx.fillStyle = "black";
    ctx.strokeRect(currentGridPosition.x * 32, currentGridPosition.y * 32, 32, 32);

    drawEditorLevel(editorLevel);

    if (!pressSpaceToOpenMenu) {
        ctx.font = "15px Helvetica";
        ctx.fillStyle = "black";
        ctx.fillText("Press space to open the editor menu", 130, 470);
    }

    if (menuShowing) {
        drawEditorMenu();
    }
}

function createCubeDood(player) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.w, player.h);
    ctx.fill();
    ctx.closePath();

    switch (player.direction) {
        case "right":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(player.x + 10, player.y + 10, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(player.x + 30, player.y + 10, 2, 0, Math.PI * 2, true);
            break;
        case "left":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(player.x + 3, player.y + 10, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(player.x + 25, player.y + 10, 2, 0, Math.PI * 2, true);
            break;
        case "upr":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(player.x + 10, player.y + 3, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(player.x + 30, player.y + 3, 2, 0, Math.PI * 2, true);
            break;
        case "upl":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(player.x + 3, player.y + 3, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(player.x + 25, player.y + 3, 2, 0, Math.PI * 2, true);
            break;
    }
    ctx.fill();
    ctx.closePath();
}

function createCubeTop(cubetop) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(cubetop.x, cubetop.y, cubetop.w, cubetop.h);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(cubetop.x, cubetop.y, cubetop.w, cubetop.h);
    ctx.fill();
    ctx.closePath();

    switch (cubetop.direction) {
        case "right":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubetop.x + 10, cubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubetop.x + 30, cubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
        case "left":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubetop.x + 3, cubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubetop.x + 25, cubetop.y + 10, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
        case "upr":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubetop.x + 10, cubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubetop.x + 30, cubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
        case "upl":
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cubetop.x + 3, cubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.arc(cubetop.x + 25, cubetop.y + 3, 3, 0, Math.PI, true);
            ctx.fill();
            ctx.closePath();
            break;
    }

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(cubetop.x + 3, cubetop.y - 5, 26, 5);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(cubetop.x + 6, cubetop.y - 30, 20, 25);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(cubetop.x + 16, cubetop.y - 5, 10, 0, Math.PI, true);
    ctx.fill();
    ctx.closePath();
}

function drawButtonPointer(pointer) {
    switch (pointer) {
        case 0:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.rect(180, 268, 15, 15);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(180 + 5, 268 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(180 + 14, 268 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            break;
        case 1:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.rect(180, 308, 15, 15);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(180 + 5, 308 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(180 + 14, 308 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            break;
        case 2:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.rect(180, 348, 15, 15);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(180 + 5, 348 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(180 + 14, 348 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            break;
        case 3:
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.rect(180, 388, 15, 15);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(180 + 5, 388 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.arc(180 + 14, 388 + 4, 1, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            break;
    }
}

function drawMainMenuButtons() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 260, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Start Game", 211, 283);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 300, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Editor", 237, 323);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 340, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Options", 230, 363);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 380, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Credits", 230, 403);
}

function drawSettingsButtons() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 260, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    if (options.sfx) {
        ctx.fillText("SFX " + assets.symbols.enabled, 240, 283);
    } else {
        ctx.fillText("SFX " + assets.symbols.disabled, 240, 283);
    }

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 300, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    if (options.music) {
        ctx.fillText("Music " + assets.symbols.enabled, 230, 323);
    } else {
        ctx.fillText("Music " + assets.symbols.disabled, 230, 323);
    }

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 340, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    if (options.fullscreen) {
        ctx.fillText("Secret " + assets.symbols.enabled, 230, 363);
    } else {
        ctx.fillText("Secret " + assets.symbols.disabled, 230, 363);
    }

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 380, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Back", 245, 403);
}

function drawEditorButtons() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 260, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Create", 230, 283);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 300, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Play", 240, 323);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 340, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Submit", 230, 363);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(200, 380, 125, 30);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.font = "20px Helvetica";
    ctx.fillText("Back", 240, 403);
}

function drawEditorMenu() {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.rect(0, 279, 512, 200);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(0, 279, 512, 200);
    ctx.stroke();
    ctx.closePath();

    ctx.font = "15px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText("Editor Menu", 10, 300);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.rect(10, 320, 32, 32);
    ctx.stroke();
    ctx.closePath();

    drawCurrentHeldBlock();

    ctx.font = "15px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText("Controls:", 200, 375);
    ctx.fillText("Arrow Keys - Move Grid Position", 10, 400);
    ctx.fillText("1-6 - Change Held Block", 10, 420);
    ctx.fillText("E - Place Block", 10, 440);
    ctx.fillText("R - Reset Level", 10, 460);
    ctx.fillText("S - Save level", 250, 400);
    ctx.fillText("Escape - Exit editor", 250, 420);
    ctx.fillText("Enter - Load level data", 250, 440);
    ctx.fillText("Space - Editor Menu", 250, 460);
}

function drawCurrentHeldBlock() {
    switch (editor.currentHeldBlock) {
        case 0:
            ctx.font = "15px Helvetica";
            ctx.fillText("Empty tile (1)", 50, 340);
            break;
        case 1:
            ctx.font = "15px Helvetica";
            ctx.fillText("Solid tile (2)", 50, 340);
            drawBlock(10, 320, 32, 32, "black");
            break;
        case 2:
            ctx.font = "15px Helvetica";
            ctx.fillText("Flag (3)", 50, 340);
            ctx.drawImage(goalFlag, 10, 320, 32, 32);
            break;
        case 3:
            ctx.font = "15px Helvetica";
            ctx.fillText("Coin (4)", 50, 340);
            drawBlock(10, 320, 32, 32, "yellow");
            break;
        case 4:
            ctx.font = "15px Helvetica";
            ctx.fillStyle = "black";
            ctx.fillText("Lava (5)", 50, 340);
            drawBlock(10, 320, 32, 32, "red");
            break;
        case 5:
            ctx.font = "15px Helvetica";
            ctx.fillText("Player Spawn (6)", 50, 340);
            drawEditorStartPos();
            break;
    }
}

function drawLogo(x, y, x2, y2) {
    ctx.drawImage(goalFlag, x, y, 32, 32);
    ctx.drawImage(logo, x2, y2, 261, 76);
}

function createCreditsText() {
    ctx.fillStyle = "black";
    ctx.font = "17px Helvetica";
    ctx.fillText("Created by " + game.author, 140, 170);
    ctx.fillText(game.author + ":", 140, 200);
    ctx.fillText("Jack Spencer (Colack)", 140, 220);
    ctx.fillText("Music: MotionArray", 140, 250);
    ctx.fillText("Special thanks to Jared,", 140, 280);
    ctx.fillText("All of the speedrunners,", 140, 300);
    ctx.fillText("All custom level creators,", 140, 320);
    ctx.fillText("and the people who play my game!", 140, 340);
    ctx.fillText("Press D on the main menu to join our discord!", 85, 390);
}

function drawBlock(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.closePath();
}

function drawEditorStartPos() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(18, 320 + 8, 15, 15);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(18 + 5, 320 + 14, 1, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.arc(18 + 14, 320 + 14, 1, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}

function drawStartPos(x, y) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(x * 32 + 8, y * 32 + 8, 15, 15);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x * 32 + 13, y * 32 + 14, 1, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.arc(x * 32 + 22, y * 32 + 14, 1, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}

function drawLevelText() {
    ctx.font = "32px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Level " + currentLevel, 5, 35);

    ctx.font = "16px Helvetica";
    ctx.fillStyle = "white";
    currentLevelName = currentLevelName.replace(/"/g, "");
    ctx.fillText(currentLevelName, 5, 55);

    ctx.font = "16px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("By " + currentLevelAuthor, 5, 75);

    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + player.score, 400, 30);
}

function drawBackground(color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
}

function createDebugScreen() {
    drawBackground("orange");

    if (!changedValues) {
        player.x = 100;
        player.y = 150;

        cubetop.x = 50;
        cubetop.y = 150;

        changedValues = true;
    }

    createCubeDood(player);
    createCubeTop(cubetop);
}

function resetEditorLevel() {
    for (var i = 0; i < editorLevel.length; i++) {
        for (var j = 0; j < editorLevel[i].length; j++) {
            editorLevel[i][j] = 0;
        }
    }
}

function drawLevel(level) {
    drawBackground("orange");

    for (var y = 0; y < level.length; y++) {
        for (var x = 0; x < level[y].length; x++) {
            switch (level[y][x]) {
                case 1:
                    drawBlock(x * 32, y * 32, 32, 32, "black");
                    break;
                case 2:
                    ctx.drawImage(goalFlag, x * 32, y * 32, 32, 32);
                    break;
                case 3:
                    drawBlock(x * 32, y * 32, 32, 32, "yellow");
                    break;
                case 4:
                    drawBlock(x * 32, y * 32, 32, 32, "red");
                    break;
                case 5:
                    drawStartPos(x, y);
                    break;
            }
        }
    }

    drawLevelText();

    collisionCheck(level);
}

function translateLevelData(levelData) {
    if (levelData[0] == "!") {
        levelData = levelData.substring(1);
        levelData = allStoryModeLevels[levelData - 1];
    }

    levelData = levelData.replace(/,/g, " ");

    currentLevelName = levelData.substring(0, levelData.indexOf(" "));
    currentLevelAuthor = levelData.substring(levelData.indexOf(" ") + 1, levelData.indexOf(" ", levelData.indexOf(" ") + 1));

    levelData = levelData.substring(levelData.indexOf(" ", levelData.indexOf(" ") + 1) + 1);

    levelData = levelData.replace(/"/g, "");

    var levelDataArray = levelData.split(" ");
    var levelDataArrayIndex = 0;

    for (var y = 0; y < level.length; y++) {
        for (var x = 0; x < level[y].length; x++) {
            if (levelDataArray[levelDataArrayIndex] == 5) {
                levelStartPost.x = x;
                levelStartPost.y = y;
            }
            if (levelDataArray[levelDataArrayIndex] == undefined) {
                level[y][x] = 0;
            } else {
                level[y][x] = Number(levelDataArray[levelDataArrayIndex]);
            }
            levelDataArrayIndex++;
        }
    }

    player.x = levelStartPost.x * 32;
    player.y = levelStartPost.y * 32;
}

function drawVersion() {
    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText("v" + game.version, 10, 470);
}

function drawStudios() {
    ctx.fillStyle = "black";
    ctx.font = "15px Helvetica";
    ctx.fillText(game.author, 420, 470);
}

function muteAllMusic() {
    menuAudio.pause();
    menuAudio.currentTime = 0;
    settingsAudio.pause();
    settingsAudio.currentTime = 0;
    editorAudio.pause();
    editorAudio.currentTime = 0;
    cubetopTheme.pause();
    cubetopTheme.currentTime = 0;
    boltTheme.pause();
    boltTheme.currentTime = 0;
    quadAudio.pause();
    quadAudio.currentTime = 0;
    squaredImpared.pause();
    squaredImpared.currentTime = 0;
}

function unmuteAllMusic() {
    if (!options.music) return;

    switch (currentMenuOption) {
        case 0:
            menuAudio.play();
            break;
        case 2:
            editorAudio.play();
            break;
        case 3:
            settingsAudio.play();
            break;
    }
}

function refreshMusic() {
    muteAllMusic();
    unmuteAllMusic();
}

function titleScreenControls() {
    if (keys[40] && !cannotPress) {
        if (currentMainMenuOption < 3) {
            currentMainMenuOption++;
        } else {
            currentMainMenuOption = 0;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[40] = false;
        }, 100);
    }
    if (keys[38] && !cannotPress) {
        if (currentMainMenuOption > 0) {
            currentMainMenuOption--;
        } else {
            currentMainMenuOption = 3;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[38] = false;
        }, 100);
    }
    if (keys[13]) {
        switch (currentMainMenuOption) {
            case 0:
                currentMenuOption = 1;
                inGame = true;
                currentMainMenuOption = 0;
                break;
            case 1:
                currentMenuOption = 2;
                currentMainMenuOption = 0;
                break;
            case 2:
                currentMenuOption = 3;
                currentMainMenuOption = 0;
                break;
            case 3:
                currentMenuOption = 4;
                currentMainMenuOption = 0;
                break;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[13] = false;
        }, 250);
        if (currentMenuOption != 4) {
            audioPlaying = false;
            menuAudio.pause();
            menuAudio.currentTime = 0;
            squaredImpared.pause();
            squaredImpared.currentTime = 0;
        }
    }
    if (keys[68]) {
        if (!cannotPress) {
            window.open("https://discord.com/invite/37BGK56jeU", "_blank");
            cannotPress = true;
            keys[68] = false;
            setTimeout(function() {
                cannotPress = false;
            }, 1000);
        }
    }
}

function checkForMusicSwap() {
    if (options.music) {
        if (currentLevel == 1) {
            muteAllMusic();
            boltTheme.currentTime = 0;
            boltTheme.loop = true;
            boltTheme.play();
        } else if (currentLevel == 11) {
            muteAllMusic();
            cubetopTheme.currentTime = 0;
            cubetopTheme.loop = true;
            cubetopTheme.play();
        } else if (currentLevel == 21) {
            muteAllMusic();
            settingsAudio.currentTime = 0;
            settingsAudio.loop = true;
            settingsAudio.play();
        } else if (currentLevel == 31) {
            muteAllMusic();
            swingAudio.currentTime = 0;
            swingAudio.loop = true;
            swingAudio.play();
        } else if (currentLevel == 41) {
            muteAllMusic();
            quadAudio.currentTime = 0;
            quadAudio.loop = true;
            quadAudio.play();
        }
    }
}

function settingsMenuControls() {
    if (keys[40] && !cannotPress) {
        if (currentSettingsMenuOption < 3) {
            currentSettingsMenuOption++;
        } else {
            currentSettingsMenuOption = 0;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[40] = false;
        }, 100);
    }
    if (keys[38] && !cannotPress) {
        if (currentSettingsMenuOption > 0) {
            currentSettingsMenuOption--;
        } else {
            currentSettingsMenuOption = 3;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[38] = false;
        }, 100);
    }
    if (keys[13] && !cannotPress) {
        switch (currentSettingsMenuOption) {
            case 0:
                if (options.sfx) {
                    options.sfx = false;
                } else {
                    options.sfx = true;
                }
                cannotPress = true;
                break;
            case 1:
                if (options.music) {
                    options.music = false;
                    muteAllMusic();
                } else {
                    options.music = true;
                    unmuteAllMusic();
                }
                cannotPress = true;
                break;
            case 2:
                if (options.fullscreen) {
                    options.fullscreen = false;
                } else {
                    options.fullscreen = true;
                }
                cannotPress = true;
                break;
            case 3:
                cannotPress = true;
                break;
        }
        setTimeout(function() {
            cannotPress = false;
            keys[13] = false;
            if (currentSettingsMenuOption == 3) {
                currentMenuOption = 0;
                currentSettingsMenuOption = 0;
                settingsAudio.pause();
                audioPlaying = false;
            }
        }, 100);
    }
}

function startScreenControls() {
    if (keys[32]) {
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[32] = false;
        }, 100);
        currentMenuOption = 0;
    }
}

function resetAllButtons() {
    keys = [];
}

update();