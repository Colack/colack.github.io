function editorControls() {
    if (keys[37] && !cannotPress) {
        if (currentGridPosition.x > 0) {
            currentGridPosition.x--;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[37] = false;
        }, 100);
    }
    if (keys[39] && !cannotPress) {
        if (currentGridPosition.x < 15) {
            currentGridPosition.x++;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[39] = false;
        }, 100);
    }
    if (keys[38] && !cannotPress) {
        if (currentGridPosition.y > 0) {
            currentGridPosition.y--;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[38] = false;
        }, 100);
    }
    if (keys[40] && !cannotPress) {
        if (currentGridPosition.y < 14) {
            currentGridPosition.y++;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[40] = false;
        }, 100);
    }
    if (keys[32] && !cannotPress) {
        pressSpaceToOpenMenu = true;
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[32] = false;
        }, 100);
        if (menuShowing) {
            menuShowing = false;
        } else {
            menuShowing = true;
        }
    }
    if (keys[69] && !cannotPress) {
        editorLevel[currentGridPosition.y][currentGridPosition.x] = editor.currentHeldBlock;
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[69] = false;
        }, 100);
    }
    if (keys[49] && !cannotPress) {
        editor.currentHeldBlock = 0;
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[49] = false;
        }, 100);
    }
    if (keys[50] && !cannotPress) {
        editor.currentHeldBlock = 1;
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[50] = false;
        }, 100);
    }
    if (keys[51] && !cannotPress) {
        editor.currentHeldBlock = 2;
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[51] = false;
        }, 100);
    }
    if (keys[52] && !cannotPress) {
        editor.currentHeldBlock = 3;
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[52] = false;
        }, 100);
    }
    if (keys[53] && !cannotPress) {
        editor.currentHeldBlock = 4;
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[53] = false;
        }, 100);
    }
    if (keys[54] && !cannotPress) {
        editor.currentHeldBlock = 5;
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[54] = false;
        }, 100);
    }
    if (keys[82] && !cannotPress) {
        resetEditorLevel();
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[82] = false;
        }, 100);
    }
    if (keys[83] && !cannotPress) {
        saveEditorLevel(editorLevel);
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[83] = false;
        }, 100);
    }
    if (keys[27] && !cannotPress) {
        pressSpaceToOpenMenu = false;
        currentMenuOption = 2;
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[27] = false;
        }, 100);
        if (menuShowing) {
            menuShowing = false;
        } else {
            menuShowing = true;
        }
    }
    if (keys[13] && !cannotPress) {
        if (!sentEditorNotif) {
            sentEditorNotif = true;
            var x = prompt("Enter the level code to load:");
            if (x != null) {
                translateLevelDataToEditor(x);
            }
            setTimeout(function() {
                sentEditorNotif = false;
            }, 1000);
        }
    }
}

function editorMenuControls() {
    if (keys[40] && !cannotPress) {
        if (currentEditorMenuOption < 3) {
            currentEditorMenuOption++;
        } else {
            currentEditorMenuOption = 0;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[40] = false;
        }, 100);
    }
    if (keys[38] && !cannotPress) {
        if (currentEditorMenuOption > 0) {
            currentEditorMenuOption--;
        } else {
            currentEditorMenuOption = 3;
        }
        cannotPress = true;
        setTimeout(function() {
            cannotPress = false;
            keys[38] = false;
        }, 100);
    }
    if (keys[13] && !cannotPress) {
        switch (currentEditorMenuOption) {
            case 0:
                currentMenuOption = 6;
                createEditScreen();
                cannotPress = true;
                break;
            case 1:
                currentMenuOption = 7;
                cannotPress = true;
                break;
            case 2:
                window.open("https://forms.gle/5pvuPEWe2GdpaCsJA", "_blank");
                cannotPress = true;
                break;
            case 3:
                cannotPress = true;
                break;
        }
        setTimeout(function() {
            cannotPress = false;
            keys[13] = false;
            if (currentEditorMenuOption == 3) {
                currentMenuOption = 0;
                currentEditorMenuOption = 0;
                editorAudio.pause();
                audioPlaying = false;
            }
        }, 100);
    }
}

function drawEditorLevel(level) {
    for (var i = 0; i < level.length; i++) {
        for (var j = 0; j < level[i].length; j++) {
            switch (level[i][j]) {
                case 1:
                    drawBlock(j * 32, i * 32, 32, 32, "black")
                    break;
                case 2:
                    ctx.drawImage(goalFlag, j * 32, i * 32, 32, 32);
                    break;
                case 3:
                    drawBlock(j * 32, i * 32, 32, 32, "yellow");
                    break;
                case 4:
                    drawBlock(j * 32, i * 32, 32, 32, "red");
                    break;
                case 5:
                    drawStartPos(j, i);
                    break;
            }
        }
    }
}

function saveEditorLevel(level) {
    var moreThanOneBlock5 = false;
    var levelString = "";

    currentLevelName = "";
    currentLevelAuthor = "";

    for (var i = 0; i < level.length; i++) {
        for (var j = 0; j < level[i].length; j++) {
            if (level[i][j] == 5) {
                if (moreThanOneBlock5) {
                    alert("You can only have one player spawn! (6)");
                    return;
                } else {
                    moreThanOneBlock5 = true;
                }
            }
            levelString += level[i][j] + ",";
        }
    }

    if (!moreThanOneBlock5) {
        alert("You must have a player spawn! (6)");
        return;
    }

    currentLevelName = prompt("Enter level name", "Level-Name");
    currentLevelAuthor = prompt("Enter level author", "Level-Author");

    if (!currentLevelName || !currentLevelAuthor) {
        alert("You must enter a level name and author!");
        return;
    }

    if (levelString[levelString.length - 1] == ",") {
        levelString = levelString.substring(0, levelString.length - 1);
    }

    levelString = '"' + currentLevelName + "," + currentLevelAuthor + "," + levelString + '"';

    prompt("Here is your level! (CTRL + C to copy.)", levelString);
}

function translateLevelDataToEditor(levelData) {
    // If the first character is "!", retrieve corresponding story mode level
    if (levelData.startsWith("!")) {
        levelData = allStoryModeLevels[parseInt(levelData.substring(1), 10) - 1];
    }

    // Replace commas with spaces and remove quotes
    levelData = levelData.replace(/,/g, " ").replace(/"/g, "");

    // Split the level data by spaces for easier parsing
    const levelDataArray = levelData.split(" ");

    // Parse level name and author from the first two elements
    currentLevelName = levelDataArray.shift();
    currentLevelAuthor = levelDataArray.shift();

    for (let y = 0; y < editorLevel.length; y++) {
        for (let x = 0; x < editorLevel[y].length; x++) {
            const tileData = Number(levelDataArray.shift() || 0);

            if (tileData === 5) {
                levelStartPost.x = x;
                levelStartPost.y = y;
            }

            editorLevel[y][x] = tileData;
        }
    }
}