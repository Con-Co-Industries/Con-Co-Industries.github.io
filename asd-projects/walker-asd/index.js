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
    "A": 65,
    "D": 68,
    "S": 83,
    "W": 87,
  }
  
  // Game Item Objects
  var player1 = {
    positionX: 0, // the x-coordinate location for the game item
    positionY: 0, // the speed for the game item along the x-axis
    speedX: 0, // the y-coordinate location for the game item
    speedY: 0, // the speed for the game item along the y-axis
  }
  var player2 = {
    positionX: 100, // the x-coordinate location for the game item
    positionY: 0, // the speed for the game item along the x-axis
    speedX: 0, // the y-coordinate location for the game item
    speedY: 0, // the speed for the game item along the y-axis
  }



  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);
  makePlayer2();
  

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(player1);
    repositionGameItem(player2);
    redrawGameItem();

  }
  
  /* 
  Called in response to pressing a key down.
  */
  function handleKeyDown(event) {
    player1DownPressed(event);
    player2DownPressed(event);
  }

  function handleKeyUp(event) {
    player1UpPressed(event);
    player2UpPressed(event);
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(player){
    player.positionX += player.speedX; // update the position of the player along the x-axis
    player.positionY += player.speedY; // update the position of the player along the y-axis
    checkBorders(player); //call the checkBorder functions here, so the position gets fixed in the reposition function
  }

  function redrawGameItem(){
    $("#gameItem").css("left", player1.positionX);    // draw the game item in the new location, positionX pixels away from the "left"
    $("#gameItem").css("top", player1.positionY);    // draw the game item in the new location, positionY pixels away from the "top"
    $("#gameItem2").css("left", player2.positionX);    // draw the game item in the new location, positionX pixels away from the "left"
    $("#gameItem2").css("top", player2.positionY);    // draw the game item in the new location, positionY pixels away from the "top"
  }

  function checkBorders(player){ 
    if (player.positionX + 50 > $("#board").width()) { //if the player's position is going to be over the right border
      console.log("right border");
      player.positionX = $("#board").width() -50; //reset the position back to the border
    }
    if (player.positionY + 50 > $("#board").height()) { //if the player's position is going to be over the bottom border
      console.log("bottom border");
      player.positionY = $("#board").height() -50; //reset the position back to the border
    }
    if (player.positionX < 0) { //if the player's position is going to be less than the left border
      console.log("left border");
      player.positionX = 0; //reset the position back to the border
    }
    if (player.positionY < 0) { //if the player's position is going to be less than the top border
      console.log("top border");
      player.positionY = 0; //reset the position back to the border
    }
  }

  function makePlayer2(){
    $('<div>')
      .css("height", 50)
      .css("width", 50)
      .css("background-color", "teal")
      .css("position", "absolute")
      .css('top', 100)
      .css('left', 100)
      .attr("id", "gameItem2")
      .appendTo("#board");
  }
  
  function player1DownPressed(event){
    if (event.which === KEY.LEFT) { //when the left arrow is pressed, make player1's speedX -5
      console.log("left pressed");
      player1.speedX = -5; 
    }
    if (event.which === KEY.UP) { //when the up arrow is pressed, make player1's speedY -5
      console.log("up pressed");
      player1.speedY = -5;
    }
    if (event.which === KEY.RIGHT) { //when the right arrow is pressed, make player1's speedX 5
      console.log("right pressed");
      player1.speedX = 5;
    }
    if (event.which === KEY.DOWN) { //when the up arrow is pressed, make player1's speedY 5
      console.log("down pressed");
      player1.speedY = 5;
    }
  }

  function player2DownPressed(event){
    if (event.which === KEY.A) { //when A is pressed, make player2's speedX -5
      console.log("A pressed");
      player2.speedX = -5; 
    }
    if (event.which === KEY.W) { //when W is pressed, make player2's speedY -5
      console.log("W pressed");
      player2.speedY = -5;
    }
    if (event.which === KEY.D) { //when D is pressed, make player2's speedX 5
      console.log("D pressed");
      player2.speedX = 5;
    }
    if (event.which === KEY.S) { //when S is pressed, make player2's speedY 5
      console.log("S pressed");
      player2.speedY = 5;
    }
  }

  function player1UpPressed(event){
    if (event.which === KEY.LEFT) { //when the left arrow is released, reset player1's speedX to 0
      console.log("left released");
      player1.speedX = 0; 
    }
    if (event.which === KEY.UP) { //when the up arrow is released, reset player1's speedY to 0
      console.log("up released");
      player1.speedY = 0;
    }
    if (event.which === KEY.RIGHT) { //when the right arrow is released, player1's reset speedX to 0
      console.log("right released");
      player1.speedX = 0;
    }
    if (event.which === KEY.DOWN) { //when the up arrow is released, reset speedY to 0
      console.log("down released");
      player1.speedY = 0;
    }
  }

  function player2UpPressed(event){
    if (event.which === KEY.A) { //when A is released, reset player2's speedX to 0
      console.log("A released");
      player2.speedX = 0; 
    }
    if (event.which === KEY.W) { //when W is released, reset player2's speedY to 0
      console.log("W released");
      player2.speedY = 0;
    }
    if (event.which === KEY.D) { //when D is released, reset player2's speedX to 0
      console.log("D released");
      player2.speedX = 0;
    }
    if (event.which === KEY.S) { //when S is released, reset player2's speedY to 0
      console.log("S released");
      player2.speedY = 0;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
