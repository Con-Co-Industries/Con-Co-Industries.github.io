// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    debugger;
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter(changeCharacter);
    if (regularFilters){
        applyFilterNoBackground(reddify);
        applyFilterNoBackground(decreaseBlue);
        applyFilterNoBackground(increaseGreenByBlue);
    }
    render($display, image);
});
var wah = false; //set this to true if you want off-brand waluigi
var wahoo = false; //set this to true if you want marrio
var warioTime = false; //set this to true if you want wario
var regularFilters = true; //set this to false if you want to turn off the filters
var BACKGROUND = image[0][0];


/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(filterFunction){ //Higher Order Function (HOF)
    for (var r = 0; r < image.length; r++) { //iterate through each pixel
        var row = image[r];
        
        for (var c = 0; c < row.length; c++) { 
            var value = image[r][c];
            var rgbString = value; //I could've just set rbgString to the image but I wanted to have a ref. of the original values just incase
            var rgbNumbers = rgbStringToArray(rgbString);

            filterFunction(rgbNumbers);

            rgbString = rgbArrayToString(rgbNumbers);
            image[r][c] = rgbString;
        }
    }
        
}

// TODO 5: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
    for (var r = 0; r < image.length; r++) { //iterate through each pixel
        var row = image[r];
        
        for (var c = 0; c < row.length; c++) { 
            var value = image[r][c];
            var rgbString = value;
            if (rgbString !== image[0][0]){ //only run if the rgbString isn't image[0][0] (image[0][0] is the top left pixel, which is the background)
                //note: I tried to make a const BACKGROUND = image[0][0], but for some reason it couldn't tell that rbgString equaled image[0][0]
                //{cont.} even though in debugger it showed their values being equal. 
                var rgbNumbers = rgbStringToArray(rgbString);

                filterFunction(rgbNumbers);

                rgbString = rgbArrayToString(rgbNumbers);
                image[r][c] = rgbString;
            }
        }
    }
}


// TODO 2 & 4: Create filter functions

function reddify(Arr){
    Arr[RED] = 255;
}

function decreaseBlue(Arr){
    Arr[BLUE] = Math.max(0, (Arr[BLUE]-30)); //if blue-30 is < 0, return 0
}

function increaseGreenByBlue(Arr){
    Arr[GREEN] = Math.min(255, (Arr[GREEN]+Arr[BLUE])); //if green + blue is > 255, return 255
}

function changeCharacter(Arr){
    if ((Arr[RED]===50)&&(Arr[GREEN]===200)&&(Arr[BLUE]===50)){ //since I only want to change the green parts
        //{cont.} we have to chack to make sure we're actually affecting the green clothes
        if (wah){ //this turns the green purple for waluigi
            Arr[RED] = 150;
            Arr[GREEN] = 0;
            Arr[BLUE] = 130;
        }
        else if (wahoo){ //this turns the green red for mario
            Arr[RED] = 255;
            Arr[GREEN] = 0;
            Arr[BLUE] = 0;
        }
        else if (warioTime){ //this turns the green yello for wario
            Arr[RED] = 255;
            Arr[GREEN] = 255;
            Arr[BLUE] = 0;
        }
        //if you just want to keep it as luigi, then none of them are true and we don't do anything, which is why
        //it's an else if instead of an else
    }
    if (((Arr[RED]===0)&&(Arr[GREEN]===50)&&(Arr[BLUE]===180))&&warioTime){ //if the pixel is part of the overalls and we're making Wario
        //make the overalls purple because, for some reason, wario's overalls are purple while everyone else's are blue
        Arr[RED] = 155;
        Arr[GREEN] = 40;
        Arr[BLUE] = 175;
    }
}
// I don't think I'm going to do the challenge lol
