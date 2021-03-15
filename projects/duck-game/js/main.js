

var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");
setInterval(update, 60);
//variables//
var x = 0;
var y = 0;
var speedX = 0;
var speedY = 0;
var gravity = speedY + 1;
var frictionVar = 2.1;
var DownPressed = false;
var UpPressed = false;
var RightPressed = false;
var LeftPressed = false;

//Objects//
var terrainObjList = [];
var npcObjList = [];


function borders() {
    if (playerObj.x < 0) {
        playerObj.speedX = 0;
        playerObj.x = 0;
    }
    if (playerObj.y < 0) {
        playerObj.speedY = 0;
        playerObj.y = 0;
    }
    if (playerObj.x + playerObj.width >= canvas.width) {
        playerObj.speedX = 0;
        playerObj.x = canvas.width - playerObj.width;
    }
    if (playerObj.y + playerObj.height >= canvas.height) {
        playerObj.speedY = 0;
        playerObj.y = canvas.height - playerObj.height;
    }
}

function friction() {
    if (Math.abs(playerObj.speedX) < 0.9) {
        playerObj.speedX = 0;
    }
    if (Math.abs(playerObj.speedY) < 0.9) {
        playerObj.speedY = 0;
    }
    if (playerObj.speedX === 0) {

    } else if (playerObj.speedX > 0) {
        playerObj.speedX = playerObj.speedX - (frictionVar + 0.1);
    } else {
        playerObj.speedX = playerObj.speedX + frictionVar;
    }

    if (playerObj.speedY === 0) {

    } else if (playerObj.speedY > 0) {
        playerObj.speedY = playerObj.speedY - (frictionVar + 0.1);
    } else {
        playerObj.speedY = playerObj.speedY + frictionVar;
    }
}

function terrainCollisionCheck() {
    for (var i=0; i<terrainObjList.length; i++) {
        if (playerObj.y > terrainObjList[i].y + terrainObjList[i].height) {

        } else if (playerObj.y + playerObj.height < terrainObjList[i].y) {

        } else if (playerObj.x > terrainObjList[i].x + terrainObjList[i].width) {

        } else if (playerObj.x + playerObj.width < terrainObjList[i].x) {

        } else {
            //Look at bounding box collision//
            if (playerObj.oldX + playerObj.width <= terrainObjList[i].x && playerObj.x + playerObj.width > terrainObjList[i].x) {
                //Ok, so funny bug thing. If you make your oldX check *less than* terrainObj.x (<), then place the playerObj at the terrainObj.x, the check only runs once, because
                //(cont) terrainObj.x *equals* terrainObj.x, and therefore terrainObj.x isn't *less than* terrainObj.x (similar to the 1-in-256 glitch: 255 isn't less than 255). 
                //(cont) There are 2 ways to fix this: either make the check less than OR EQUAL TO (<=), which works better and is what I did here, or just don't place the playerObj at the terrainObj.x (which looks jankier)
                playerObj.speedX = 0;
                playerObj.x = terrainObjList[i].x - playerObj.width;
            } else if (playerObj.oldX >= terrainObjList[i].x + terrainObjList[i].width && playerObj.x < terrainObjList[i].x + terrainObjList[i].width) {
                playerObj.speedX = 0;
                playerObj.x = terrainObjList[i].x + terrainObjList[i].width;
            } else if (playerObj.oldY + playerObj.height <= terrainObjList[i].y && playerObj.y + playerObj.height > terrainObjList[i].y) {
                playerObj.speedY = 0;
                playerObj.y = terrainObjList[i].y - playerObj.height;
            } else if (playerObj.oldY >= terrainObjList[i].y + terrainObjList[i].height && playerObj.y < terrainObjList[i].y + terrainObjList[i].height) {
                playerObj.speedY = 0;
                playerObj.y = terrainObjList[i].y + terrainObjList[i].height;
            } else {

            }
        }
    }
    
}

function npcCollisionCheck() {
    for (var i=0; i<npcObjList.length; i++) {
        if (playerObj.y > npcObjList[i].y + npcObjList[i].height) {

        } else if (playerObj.y + playerObj.height < npcObjList[i].y) {

        } else if (playerObj.x > npcObjList[i].x + npcObjList[i].width) {

        } else if (playerObj.x + playerObj.width < npcObjList[i].x) {

        } else {
            //Look at bounding box collision//
            if (playerObj.oldX + playerObj.width <= npcObjList[i].x && playerObj.x + playerObj.width > npcObjList[i].x) {
                //You run into the same issue here as you do with terrainObjList (I think)
                playerObj.speedX = 0;
                playerObj.x = npcObjList[i].x - playerObj.width;
            } else if (playerObj.oldX >= npcObjList[i].x + npcObjList[i].width && playerObj.x < npcObjList[i].x + npcObjList[i].width) {
                playerObj.speedX = 0;
                playerObj.x = npcObjList[i].x + npcObjList[i].width;
            } else if (playerObj.oldY + playerObj.height <= npcObjList[i].y && playerObj.y + playerObj.height > npcObjList[i].y) {
                playerObj.speedY = 0;
                playerObj.y = npcObjList[i].y - playerObj.height;
            } else if (playerObj.oldY >= npcObjList[i].y + npcObjList[i].height && playerObj.y < npcObjList[i].y + npcObjList[i].height) {
                playerObj.speedY = 0;
                playerObj.y = npcObjList[i].y + npcObjList[i].height;
            } else {

            }
        }
    }
    
}



function update() {
    playerObj.oldX = playerObj.x;
    playerObj.oldY = playerObj.y;
    //background//
    ctx.fillStyle = backgroundObj.color;
    ctx.fillRect(backgroundObj.x, backgroundObj.y, backgroundObj.width, backgroundObj.height);
    //terrain//
    for (var i=0; i<terrainObjList.length; i++) {
        ctx.fillStyle = terrainObjList[i].color;
        ctx.fillRect(terrainObjList[i].x, terrainObjList[i].y, terrainObjList[i].width, terrainObjList[i].height);
        terrainCollisionCheck();
    }
    //NPC//
    for (var i=0; i<npcList.length; i++) {
        ctx.fillStyle = npcObjList[i].color;
        ctx.fillRect(npcObjList[i].x, npcObjList[i].y, npcObjList[i].width, npcObjList[i].height);
        npcCollisionCheck();
    }
    //player character//
    ctx.fillStyle = playerObj.color;
    ctx.fillRect(playerObj.x, playerObj.y, playerObj.width, playerObj.height);


    movementKeys();
    friction();
    // use this if you want the player to have gravity: playerObj.speedY =playerObj.speedY + gravity;//
    playerObj.x = playerObj.x + playerObj.speedX;
    playerObj.y = playerObj.y + playerObj.speedY;
    borders();

}