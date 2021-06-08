/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = { //these are the key code values to avoid magic numbers
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  }
  
  // Game Item Objects
  var positionX = 0; // the x-coordinate location for the game item
  var speedX = 0; // the speed for the game item along the x-axis
  var positionY = 0; // the y-coordinate location for the game item
  var speedY = 0; // the speed for the game item along the y-axis



  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();

  }
  
  /* 
  Called in response to pressing a key down.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) { //when the left arrow is pressed, make speedX -5
      speedX = -5; 
    }
    if (event.which === KEY.UP) { //when the up arrow is pressed, make speedY -5
      speedY = -5;
    }
    if (event.which === KEY.RIGHT) { //when the right arrow is pressed, make speedX 5
      speedX = 5;
    }
    if (event.which === KEY.DOWN) { //when the up arrow is pressed, make speedY 5
      speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT) { //when the left arrow is released, reset speedX to 0
      speedX = 0; 
    }
    if (event.which === KEY.UP) { //when the up arrow is released, reset speedY to 0
      speedY = 0;
    }
    if (event.which === KEY.RIGHT) { //when the right arrow is released, reset speedX to 0
      speedX = 0;
    }
    if (event.which === KEY.DOWN) { //when the up arrow is released, reset speedY to 0
      speedY = 0;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    positionX += speedX; // update the position of the game item along the x-axis
    positionY += speedY; // update the position of the game item along the y-axis
    checkBorders(); //call the checkBorder function here, so the position gets fixed in the reposition function
  }

  function redrawGameItem(){
    $("#gameItem").css("left", positionX);    // draw the game item in the new location, positionX pixels away from the "left"
    $("#gameItem").css("top", positionY);    // draw the game item in the new location, positionY pixels away from the "top"
  }

  function checkBorders(){
    if (positionX + 50 >= $("#board").width()) { //if the position of the game item is going to be over the right border
      console.log("right border");
      positionX = $("#board").width() -50; //reset the position back to the border
    }
    if (positionY + 50 >= $("#board").height()) { //if the position of the game item is going to be over the bottom border
      console.log("bottom border");
      positionY = $("#board").height() -50; //reset the position back to the border
    }
    if (positionX  <= 0) { //if the position of the game item is going to be less than the left border
      console.log("left border");
      positionX = 0; //reset the position back to the border
    }
    if (positionY <= 0) { //if the position of the game item is going to be less than the top border
      console.log("top border");
      positionY = 0; //reset the position back to the border
    }
  }

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
