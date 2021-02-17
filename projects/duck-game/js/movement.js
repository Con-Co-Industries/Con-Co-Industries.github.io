
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === "ArrowDown") {
        DownPressed = true;
    }
    if(e.key === "ArrowUp") {
        UpPressed = true;
    }
    if(e.key === "ArrowRight") {
        RightPressed = true;
    }
    if(e.key === "ArrowLeft") {
        LeftPressed = true;
    }

}

function keyUpHandler(e) {
    if(e.key === "ArrowDown") {
        DownPressed = false;
    }
    if(e.key === "ArrowUp") {
        UpPressed = false;
    }
    if(e.key === "ArrowRight") {
        RightPressed = false;
    }
    if(e.key === "ArrowLeft") {
        LeftPressed = false;
    }

}

function movementKeys() {
    if (DownPressed) {
        playerObj.speedY = playerObj.speedY + 3;
    }
    if (UpPressed) {
        playerObj.speedY = playerObj.speedY - 3;
    }
    if (RightPressed) {
        playerObj.speedX = playerObj.speedX + 3;
    }
    if (LeftPressed) {
        playerObj.speedX = playerObj.speedX - 3;
    }
}
