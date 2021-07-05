$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
    function newFrame() {
       if (!oPressed) {
            //Initalizing changeRoom//
            changeRoom()
            overworldMovement();
        } else {
            combat();
        }
    }
}
