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
  var player1Vars = {
    positionX: 0, // the x-coordinate location for player1
    positionY: 0, // the speed for player1 along the x-axis
    speedX: 0, // the y-coordinate location for player1
    speedY: 0, // the speed for player1 along the y-axis
  }
  var player2Vars = {
    positionX: 100, // the x-coordinate location for player2
    positionY: 0, // the speed for player2 along the x-axis
    speedX: 0, // the y-coordinate location for player2
    speedY: 0, // the speed for player2 along the y-axis
  }



  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);
  makePlayer2(); //use jQuery to make a player2 div
  startTag(2); //randomly choose either player1 or player 2 to start off as 'it'
  

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(player1Vars);
    repositionGameItem(player2Vars);
    redrawGameItem();

  }
  
  /* 
  Called in response to pressing a key down.
  */
  function handleKeyDown(event) {
    player1DownPressed(event); //checks the keys specifically related to player1
    player2DownPressed(event); //checks the keys specifically related to player2
  }

  function handleKeyUp(event) {
    player1UpPressed(event); //checks the keys specifically related to player1
    player2UpPressed(event); //checks the keys specifically related to player2
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(player){ 
    player.positionX += player.speedX; // update the position of the player along the x-axis
    player.positionY += player.speedY; // update the position of the player along the y-axis
    checkContact(); //check to see if the players have made contact, and, if they have, adress that
    checkBorders(player); //call the checkBorder functions here, last, so the position gets fixed in the reposition function
  }

  function redrawGameItem(){ //I was trying to figure out a way to make this function like the repositionGameItem function, but the jQuery was making it too hard for me
    $("#player1").css("left", player1Vars.positionX);    // draw player1 in the new location, positionX pixels away from the "left"
    $("#player1").css("top", player1Vars.positionY);    // draw player1 in the new location, positionY pixels away from the "top"
    $("#player2").css("left", player2Vars.positionX);    // draw player2 in the new location, positionX pixels away from the "left"
    $("#player2").css("top", player2Vars.positionY);    // draw player2 in the new location, positionY pixels away from the "top"
  }

  function checkBorders(player){ 
    if (player.positionX + 50 > $("#board").width()) { //if the player's position is going to be over the right border
      console.log("right border");
      player.positionX = $("#board").width() - 50; //reset the position back to the border
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

  function checkContact(){ //this probly looks weird, but it makes the most sense to me.
    if (player1Vars.positionX + $(".gameItem").width() < player2Vars.positionX){} //if player1's right isn't touching player 2's left, don't do anything 
    else if (player1Vars.positionY + $(".gameItem").height() < player2Vars.positionY){} //if player1's bottom isn't touching player 2's top, don't do anything
    else if (player1Vars.positionX > player2Vars.positionX + $(".gameItem").width()){} //if player1's left isn't touching player 2's right, don't do anything
    else if (player1Vars.positionY > player2Vars.positionY + $(".gameItem").height()){} //if player1's top isn't touching player 2's bottom, don't do anything
    else { //only activate after we've checked everything to make sure we know we're touching somewhere... there's probably a more efficent way to do this but this is what I came up with
      changeWhoIsIt();
    }
  }

  function makePlayer2(){ //shockingly enough, the makePlayer2 function uses jQuery to make a 2nd player
    $('<div>')      
      .css("position", "absolute")
      .css('top', 0)
      .css('left', 100)
      .addClass("gameItem")
      .attr("id", "player2")
      .appendTo("#board");
  }
  
  function startTag(playerAmount){ //this can work for any amount of players, even though all we'll ever have is 2
    var randomNum = Math.floor(Math.random() * playerAmount); //the amount of numbers math.random can produce is dependent on how many players you have
    if (randomNum === 0){
      console.log("player1 is it");
        $( "#player1" ).css( "background-color", "rgb(255, 0, 0)"); //if player1 is "it", make their background red to symbolize that they're it
    }
    else if (randomNum === 1){
      console.log("player2 is it");
      $( "#player2" ).css( "background-color", "rgb(255, 0, 0)"); //if player2 is "it", make their background red to symbolize that they're it
    } 

  }

  function changeWhoIsIt(){
    if ($( "#player1" ).css( "background-color") === "rgb(255, 0, 0)"){ //if player1's background is red
      $( "#player2" ).css( "background-color", "rgb(255, 0, 0)"); //make player2's background red
      $( "#player1" ).css( "background-color", "teal"); //reset player1's background back to teal
      console.log("player2 tagged");
    }
    else if ($( "#player2" ).css( "background-color") === "rgb(255, 0, 0)"){ //if player2's background is red
      $( "#player1" ).css( "background-color", "rgb(255, 0, 0)"); //make player1's background red
      $( "#player2" ).css( "background-color", "teal"); //reset player2's background to teal
      console.log("player1 tagged");
    }
    player1Vars.positionX = 0; //no matter who gets tagged, always...
    player1Vars.positionY = 0;//move player1 to the top left and...
    player2Vars.positionX = $("#board").width() - $(".gameItem").width(); //move player2 to the bottom right
    player2Vars.positionY = $("#board").height() - $(".gameItem").height();  
    
  }

  function player1DownPressed(event){
    if (event.which === KEY.LEFT) { //when the left arrow is pressed, make player1's speedX -5
      console.log("left pressed");
      player1Vars.speedX = -5; 
    }
    if (event.which === KEY.UP) { //when the up arrow is pressed, make player1's speedY -5
      console.log("up pressed");
      player1Vars.speedY = -5;
    }
    if (event.which === KEY.RIGHT) { //when the right arrow is pressed, make player1's speedX 5
      console.log("right pressed");
      player1Vars.speedX = 5;
    }
    if (event.which === KEY.DOWN) { //when the up arrow is pressed, make player1's speedY 5
      console.log("down pressed");
      player1Vars.speedY = 5;
    }
  }

  function player2DownPressed(event){
    if (event.which === KEY.A) { //when A is pressed, make player2's speedX -5
      console.log("A pressed");
      player2Vars.speedX = -5; 
    }
    if (event.which === KEY.W) { //when W is pressed, make player2's speedY -5
      console.log("W pressed");
      player2Vars.speedY = -5;
    }
    if (event.which === KEY.D) { //when D is pressed, make player2's speedX 5
      console.log("D pressed");
      player2Vars.speedX = 5;
    }
    if (event.which === KEY.S) { //when S is pressed, make player2's speedY 5
      console.log("S pressed");
      player2Vars.speedY = 5;
    }
  }

  function player1UpPressed(event){
    if (event.which === KEY.LEFT) { //when the left arrow is released, reset player1's speedX to 0
      console.log("left released");
      player1Vars.speedX = 0; 
    }
    if (event.which === KEY.UP) { //when the up arrow is released, reset player1's speedY to 0
      console.log("up released");
      player1Vars.speedY = 0;
    }
    if (event.which === KEY.RIGHT) { //when the right arrow is released, player1's reset speedX to 0
      console.log("right released");
      player1Vars.speedX = 0;
    }
    if (event.which === KEY.DOWN) { //when the up arrow is released, reset speedY to 0
      console.log("down released");
      player1Vars.speedY = 0;
    }
  }

  function player2UpPressed(event){
    if (event.which === KEY.A) { //when A is released, reset player2's speedX to 0
      console.log("A released");
      player2Vars.speedX = 0; 
    }
    if (event.which === KEY.W) { //when W is released, reset player2's speedY to 0
      console.log("W released");
      player2Vars.speedY = 0;
    }
    if (event.which === KEY.D) { //when D is released, reset player2's speedX to 0
      console.log("D released");
      player2Vars.speedX = 0;
    }
    if (event.which === KEY.S) { //when S is released, reset player2's speedY to 0
      console.log("S released");
      player2Vars.speedY = 0;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
