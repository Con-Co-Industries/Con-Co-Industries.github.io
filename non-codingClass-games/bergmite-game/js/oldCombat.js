//This is literally just a referecnce for the original combat button code stuff, don't actually use anything in here

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