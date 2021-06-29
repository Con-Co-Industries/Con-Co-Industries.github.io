setInterval(update, 60);

function update() {
    if (!oPressed) {
        //Initalizing changeRoom//
        changeRoom()
        overworldMovement();
    } else {
        combat();
    }
    
}