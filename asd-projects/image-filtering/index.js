// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    debugger;
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter(reddify);





    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(filterFunction){
    for (var r = 0; r < image.length; r++) { 
        var row = image[r];
        
        for (var c = 0; c < row.length; c++) { 
            var value = image[r][c];
            var rgbString = value;
            var rgbNumbers = rgbStringToArray(rgbString);

            rgbNumbers[RED] = 255;
            filterFunction(rbgNumbers);

            rgbString = rgbArrayToString(rgbNumbers);
            image[r][c] = rgbString;
            
            //action(value);
            // or
            //action(image[r][c])
            // or;
            //action(row[c])
        }
    }
        
}

// TODO 5: Create the applyFilterNoBackground function


// TODO 2 & 4: Create filter functions

function reddify(Arr){
    Arr[RED] = 255;
}


// CHALLENGE code goes below here
