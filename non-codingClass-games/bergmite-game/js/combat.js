
var currentBtn = {num: 0, boolean: false}

function drawFeather() {
    ctx.drawImage(featherImage, btnObj[currentBtn.num].x+10, btnObj[currentBtn.num].y +10, 40, 40)
    if (RightPressed) {
        currentBtn.num = (currentBtn.num+1) % btnObj.length;
        //by adding %4, you're basically dividing your currentBtn# by 4, so you'll always have a remainder between 0 and 3, which is exactly what each # of our buttons are
        RightPressed = false;         
    }
    if (LeftPressed) {
        currentBtn.num = currentBtn.num-1;
        if (currentBtn.num <= -1) {
            currentBtn.num = 3;
        }        
        LeftPressed = false;
    }
    currentBtn.num = currentBtn.num % btnObj.length;  
    
}
function drawButtons2() {
    for (i=0; i<btnObj.length; i++) {
        ctx.fillStyle = btnObj[i].color;
        ctx.strokeStyle = btnObj[i].color;
        ctx.fillText(btnObj[i].txt, btnObj[i].txtX, btnObj[i].txtY);
        ctx.strokeRect(btnObj[i].x,btnObj[i].y,btnObj[i].width, btnObj[i].height);
    }
}

function buttonPressed2() {
    currentBtn.boolean = !currentBtn.boolean;
    if (currentBtn.boolean === true && currentBtn.num === 0) {
        if (btnObj[0].txt === "Attack") {
            attackDraw();
        } else if (btnObj[0].txt === "Melee") {
            ctx.fillStyle = "white";
            ctx.fillText("You Used Sword Bonk", 20, 50);
            currentBtn.num = 0;
            defaultDraw();
        }
        currentBtn.boolean = !currentBtn.boolean;
    }
    if (currentBtn.boolean === true && currentBtn.num === 1) {
        if (btnObj[1].txt === "Defend") {
            ctx.fillStyle = "white";
            ctx.fillText("You Just Defended!", 20, 50);
            currentBtn.num = 0;
        } else if (btnObj[1].txt === "Magic") {
            ctx.fillStyle = "white";
            ctx.fillText("Skidadle Skidoodle Your Dick Is Now A Noodle", 20, 50);
            currentBtn.num = 0;
            defaultDraw();
        }
        currentBtn.boolean = !currentBtn.boolean;
    }
    if (currentBtn.boolean === true && currentBtn.num === 2) {
            itemDraw();
            currentBtn.boolean = !currentBtn.boolean;
    }
    if (currentBtn.boolean === true && currentBtn.num === 3) {
        oPressed = !oPressed;
        currentBtn.boolean = !currentBtn.boolean;
    }
    SpacePressed = !SpacePressed;    

}


function combat() {
    //background//
    ctx.fillStyle = "black";
    ctx.fillRect(backgroundObj.x, backgroundObj.y, backgroundObj.width, backgroundObj.height);

    ctx.drawImage(enemyObjList.bergmite.picture, 387, 50)

    
    if (SpacePressed) {
        buttonPressed2();
    }

    //Buttons//
    drawButtons2();
    drawFeather();
    
    
}


