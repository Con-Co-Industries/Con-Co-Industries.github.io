setInterval(update, 60);

function update() {
    if (!oPressed) {
        overworldMovement();
    } else {
        combat();
    }
    
}