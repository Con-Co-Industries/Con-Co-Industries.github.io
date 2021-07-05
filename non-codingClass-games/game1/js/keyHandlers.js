$(document).on('keydown', handleKeyDown);
$(document).on('keyup', handleKeyUp);
$(document).on('click', handleClick);

function keyDownHandler(event) {
    if(event.key === "ArrowDown") {
        DownPressed = true;
    }
    if(event.key === "ArrowUp") {
        UpPressed = true;
    }
    if(event.key === "ArrowRight") {
        RightPressed = true;
    }
    if(event.key === "ArrowLeft") {
        LeftPressed = true;
    }
    if(event.key === " ") {
        SpacePressed = !SpacePressed;
    }
    if(event.key === "o") {
        oPressed = !oPressed;
    }
    if(event.key === "s") {
        sPressed = !sPressed;
    }

}

function keyUpHandler(event) {
    if(event.key === "ArrowDown") {
        DownPressed = false;
    }
    if(event.key === "ArrowUp") {
        UpPressed = false;
    }
    if(event.key === "ArrowRight") {
        RightPressed = false;
    }
    if(event.key === "ArrowLeft") {
        LeftPressed = false;
    }
    
}

function clickHandler(event) {}

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