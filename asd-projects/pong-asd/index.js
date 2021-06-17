/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var leftPaddle = FactoryPog('#leftPaddle');
  var rightPaddle = FactoryPog('#rightPaddle');
  var ball = FactoryPog('#ball');
  var board = FactoryPog('#board');
  var player1ScoreBox = FactoryPog('#player1ScoreBox');
  var player2ScoreBox = FactoryPog('#player2ScoreBox');
  var countdownBox = FactoryPog('#countdownBox');
  var countdownTime = 3;
  ball.speedY = 3;
  ball.speedX = 3;
  player1ScoreBox.text = $(player1ScoreBox.id).text(player1ScoreBox.score);
  player2ScoreBox.text = $(player2ScoreBox.id).text(player2ScoreBox.score);

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);
  var countdownTimer;  
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //do all the repositioning and checks
    repositionGameItem(leftPaddle);
    repositionGameItem(rightPaddle);
    repositionGameItem(ball);
    wallCollision(leftPaddle, 'paddle');
    wallCollision(rightPaddle, 'paddle');
    wallCollision(ball, 'ball');
    paddleBallCollision(leftPaddle);
    paddleBallCollision(rightPaddle);
    
    //once we figure out where everything is, actually draw it on the board
    redrawGameItem(leftPaddle);
    redrawGameItem(rightPaddle);
    redrawGameItem(ball);
    

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.key === 'w') { //when w is pressed, make player1's paddle's speedY -5
      console.log("player1 pressed up");
      leftPaddle.speedY = -5; 
    }
    if (event.key === 's') { //when s is pressed, make player1's paddle's speedY 5
      console.log("player1 pressed down");
      leftPaddle.speedY = 5; 
    }
    if (event.key === 'ArrowUp') { //when the up arrow is pressed, make player2's paddle's speedY -5
      console.log("player2 pressed up");
      rightPaddle.speedY = -5; 
    }
    if (event.key === 'ArrowDown') { //when the down arrow is pressed, make player2's paddle's speedY 5
      console.log("player2 pressed down");
      rightPaddle.speedY = 5; 
    }
  }

  function handleKeyUp(event){
    if (event.key === 'w') { //when w is released, make player1's paddle's speedY 0
      console.log("player1 released up");
      leftPaddle.speedY = 0; 
    }
    if (event.key === 's') { //when s is released, make player1's paddle's speedY 0
      console.log("player1 released down");
      leftPaddle.speedY = 0; 
    }
    if (event.key === 'ArrowUp') { //when the up arrow is released, make player2's paddle's speedY 0
      console.log("player2 released up");
      rightPaddle.speedY = 0; 
    }
    if (event.key === 'ArrowDown') { //when the down arrow is released, make player2's paddle's speedY 0
      console.log("player2 released down");
      rightPaddle.speedY = 0; 
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(obj) {
    obj.x += obj.speedX; // update the position of the box along the x-axis
    obj.left = obj.x;
    obj.right = obj.x + obj.width;
    obj.y += obj.speedY;
    obj.top = obj.y;
    obj.bottom = obj.y + obj.height;
  }

  function redrawGameItem(obj) {
    $(obj.id).css("top", obj.y);
    $(obj.id).css("left", obj.x);
  }


  function wallCollision(obj, type){
    if (type === 'paddle') {
      if (obj.top < board.top){
        obj.y = board.top;
      } else if (obj.bottom > board.bottom) {
        obj.y = board.bottom - obj.height;
      }
    } 
    else if (type === 'ball') { //If the object's type is ball
      if (obj.top < board.top){
        obj.top = board.top;
        obj.speedY = -obj.speedY;
      } 
      else if (obj.bottom > board.bottom) {
        obj.y = board.bottom - obj.height;
        obj.speedY = -obj.speedY;
      } else if (obj.left < board.left){
        increaseScore(player2ScoreBox);
      } else if (obj.right > board.right){
        increaseScore(player1ScoreBox);
      }
    }
  }

  function increaseScore(player){
    player.score += 1;
    player.text = $(player.id).text(player.score);
    if (player.score >= 11){
      endGame();
    }
    else {
      reset();
    }
  }

  function reset(){
    ball.x = 210;
    ball.y = 210;
    if (ball.speedX > 0){
      ball.speedX += 0.25;
    } else {
      ball.speedX -= 0.25;
    }
    if (ball.speedY > 0){
      ball.speedY += 0.25;
    } else {
      ball.speedY -= 0.25;
    }
    var num = Math.ceil(Math.random() * 4);
    if (num === 1) {
      ball.speedX = -ball.speedX;
      ball.speedY = -ball.speedY;
    } else if (num === 2) {
      ball.speedX = -ball.speedX;
    } else if (num === 3) {
      ball.speedY = -ball.speedY;
    }
    clearInterval(interval);     
    countdownTimer = setInterval(countdown, 500);
    
    
  }

  function countdown(){
    countdownBox.score = countdownTime;
    countdownBox.text = $(countdownBox.id).text(countdownBox.score);
    countdownTime -= 1;
    if (countdownTime < 0) {
      countdownBox.text = $(countdownBox.id).text("Go!");
      stopCountdown();
      interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL)
      countdownTime = 3;
    }
  }

  function stopCountdown(){
    clearInterval(countdownTimer);
  }

  function paddleBallCollision(paddle) {
    if (collisionCheck(paddle, ball)) {
      ball.speedX = -ball.speedX;
      if (ball.right > paddle.left && ball.left < paddle.left){        
          ball.x = paddle.left - ball.width;
        }        
      else if (ball.left < paddle.right && ball.right > paddle.right) {
        ball.x = paddle.right;
      }
    }
  }
    

  function collisionCheck(obj1, obj2) {
    if ((obj1.left < obj2.right) && (obj1.right > obj2.left) && (obj1.top < obj2.bottom) && (obj1.bottom > obj2.top)) {
      return true;
	  } else {
      return false
    }
  }
  

  function FactoryPog($id){
    var element = {};
    element.id = $id;
    element.x = parseFloat($(element.id).css("left"));
    element.y = parseFloat($(element.id).css("top"));
    element.speedX = 0;
    element.speedY = 0;
    element.width = $(element.id).width();
    element.height = $(element.id).height();
    element.left = element.x;
    element.right = element.x + element.width;
    element.top = element.y;
    element.bottom = element.y + element.height;
    element.score = 0;
    return element;
  }

  
  
  function endGame() {
    // stop the interval timer
    stopCountdown();
    clearInterval(interval);
    var winner = player1ScoreBox.score === 11 ? 1 : 2;
    countdownBox.text = $(countdownBox.id).text("Game! Player " + winner + " wins!");
    

    // turn off event handlers
    $(document).off();
  }
  
}
