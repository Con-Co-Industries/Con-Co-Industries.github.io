
var currentBtn = {num: 0, boolean: false}

function drawButtons() { 
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    for (var i=0; i<4; i++) {
        ctx.fillText(btnObj[i].txt, btnObj[i].txtX, btnObj[i].txtY);
        ctx.strokeRect(btnObj[i].x,btnObj[i].y,btnObj[i].width, btnObj[i].height);
    }
    
    if (currentBtn.boolean) {
        switch (currentBtn.num) {
            case 0:
                ctx.fillStyle = "white";
                ctx.fillText("Button 1 has been activated!", 20, 50);
                for (var i=4; i<6; i++) {
                    ctx.fillText(btnObj[i].txt, btnObj[i].txtX, btnObj[i].txtY);
                    ctx.strokeRect(btnObj[i].x,btnObj[i].y,btnObj[i].width, btnObj[i].height);
                }
                if (SpacePressed) {
                    if (currentBtn.num === 0 && currentBtn.boolean === true) {
                        console.log("I'm gay lmao");
                    } else if (currentBtn.num === 1 && currentBtn.boolean === true) {

                    }

                }
                break;
            case 1:
                ctx.fillStyle = "white";
                ctx.fillText("Button 2 has been activated!", 20, 50)
                break;
            case 2:
                ctx.fillStyle = "white";
                ctx.fillText("Button 3 has been activated!", 20, 50)
                break;
            case 3:
                ctx.fillStyle = "white";
                ctx.fillText("Button 4 has been activated!", 20, 50)
                break;    
            default:
                console.log("currentBtn selection invalid");
                break;            
        }
    }   
}

function drawFeather() {
    ctx.drawImage(featherImage, btnObj[currentBtn.num].x+10, btnObj[currentBtn.num].y +10, 40, 40)
    if (RightPressed) {
        currentBtn.num = (currentBtn.num+1) % btnObj.length;
        //by adding %4, you're basically dividing your currentBtn# by 4, so you'll always have a remainder between 0 and 3, which is exactly what each # of our buttons are
        RightPressed = false;         
    }
    if (LeftPressed) {
        currentBtn.num = Math.abs((currentBtn.num-1) % btnObj.length);
        LeftPressed = false;
    }
    currentBtn.num = currentBtn.num % btnObj.length;  
    
}

function buttonPressed() {
    switch (currentBtn.num) {
        case 0:
            currentBtn.boolean = true;
            break;
        case 1:
            currentBtn.boolean = true;
            break;
        case 2:
            currentBtn.boolean = true;
            break;
        case 3:
            currentBtn.boolean = true;
            break;    
        default:
            console.log("currentBtn selection invalid");
            return;
    }
    SpacePressed = !SpacePressed;
}


function drawButtons2() {
    for (i=0; i<btnObj.length; i++) {
        ctx.fillStyle = btnObj[i].color;
        ctx.fillText(btnObj[i].txt, btnObj[i].txtX, btnObj[i].txtY);
        ctx.strokeRect(btnObj[i].x,btnObj[i].y,btnObj[i].width, btnObj[i].height);
        if (currentBtn.boolean === true && currentBtn.num === 0) {
            attackDraw();
        }
        if (currentBtn.boolean === true && currentBtn.num === 2) {
            itemDraw();
        }

    }
}

function buttonPressed2() {
    currentBtn.boolean = true;
    if (currentBtn.boolean === true && currentBtn.num === 1) {
        ctx.fillStyle = "white";
        ctx.fillText("You Just Defended!", 20, 50);
        currentBtn.boolean = false;
    }
    if (currentBtn.boolean === true && currentBtn.num === 3) {
        !oPressed;
        currentBtn.boolean = false;
    }

}


function combat() {
    //background//
    ctx.fillStyle = "black";
    ctx.fillRect(backgroundObj.x, backgroundObj.y, backgroundObj.width, backgroundObj.height);

    ctx.drawImage(enemyObjList.bergmite.picture, 387, 50)

    

    //Buttons//
    drawButtons();
    drawFeather();
    
    if (SpacePressed) {
        buttonPressed();
    }
}


