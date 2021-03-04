

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

function collisionCheck() {
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
                console.log("Collision from Right")
                playerObj.speedX = 0;
                playerObj.x = terrainObjList[i].x + terrainObjList[i].width;
            } else if (playerObj.oldY + playerObj.height <= terrainObjList[i].y && playerObj.y + playerObj.height > terrainObjList[i].y) {
                console.log("Collision from Top")
                playerObj.speedY = 0;
                playerObj.y = terrainObjList[i].y - playerObj.height;
            } else if (playerObj.oldY >= terrainObjList[i].y + terrainObjList[i].height && playerObj.y < terrainObjList[i].y + terrainObjList[i].height) {
                console.log("Collision from Bottom")
                playerObj.speedY = 0;
                playerObj.y = terrainObjList[i].y + terrainObjList[i].height;
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
    }
    //player character//
    ctx.fillStyle = playerObj.color;
    ctx.fillRect(playerObj.x, playerObj.y, playerObj.width, playerObj.height);


    movementKeys();
    friction();
    // use this if you want the player to have gravity: playerObj.speedY =playerObj.speedY + gravity;//
    playerObj.x = playerObj.x + playerObj.speedX;
    playerObj.y = playerObj.y + playerObj.speedY;
    collisionCheck();
    borders();

}