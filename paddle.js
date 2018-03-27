var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById('pong');
var width = 800;
var height = 600;
var context = canvas.getContext('2d');
var keysDown = {};
var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 250);
var score1 = 0;
var score2 = 0;


var step = function() {
    update();
    render();
    animate(step);
  };

var update = function() {
  player.update();
  computer.update(ball);
  ball.update(player.paddle, computer.paddle);
};


Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 38) { // up arrow
      this.paddle.move(0, -this.paddle.speed);
    } else if (value == 40) { // down arrow
      this.paddle.move(0, this.paddle.speed);
    } else {
      this.paddle.move(0, 0);
    }
  }
};
  
Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.y < 5) { // all the way up
    this.y = 5;
  } else if (this.y + this.height > 595 ) { // all the way down
    this.y = 595 - this.height;
  }
}
  
Computer.prototype.update = function(ball) {
  var y_pos = ball.y;
  var diff = -((this.paddle.y + (this.paddle.height / 2)) - y_pos);
  if(diff < 0 && diff < -4) { // max speed left
    diff = -5;
  } else if(diff > 0 && diff > 4) { // max speed right
    diff = 5;
  }
  this.paddle.move(0, diff);
  if(this.paddle.y < 0) {
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > 400) {
    this.paddle.y = 400 - this.paddle.height;
  }
};


var render = function() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 5;
};
  
Paddle.prototype.render = function() {
  context.fillStyle = "#0000FF";
  context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
  this.paddle = new Paddle(770, 175, 15, 100);
}

function Computer() {
  this.paddle = new Paddle(20, 175, 15, 100);
}

Player.prototype.render = function() {
  this.paddle.render();
};

Computer.prototype.render = function() {
  this.paddle.render();
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 3;
  this.y_speed = 0;
  this.radius = 10;
}

function reset(){
  this.x_speed = -this.x_speed;
  this.x = canvas.width/2;
  this.y = canvas.height/2;
 };

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#fff";
  context.fill();
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  this.right = this.x + 5;
  this.top = this.y + 5;
  this.left = this.x - 5;
  this.bottom = this.y - 5;


  if(this.top < 30) {
    this.y = 30;
    this.y_speed = -this.y_speed;
  } else if(this.bottom > 590) {
    this.y = 585;
    this.y_speed = -this.y_speed;
  }

  
  if(this.right > (paddle1.x - paddle1.width) && this.right < (paddle1.x + paddle1.width) && (this.top < (paddle1.y + paddle1.height) && this.bottom > (paddle1.y - paddle1.height/2))) {
    this.x_speed = -this.x_speed;
    this.y > (paddle1.y + paddle1.height/2) ? this.y_speed += (paddle1.speed / 2) : this.y_speed -= (paddle1.speed / 2);
  } 

  if(this.left > (paddle2.x - paddle2.width) && this.left < (paddle2.x + paddle2.width) && (this.top < (paddle2.y + paddle2.height) && this.bottom > (paddle2.y - paddle2.height/2))) {
    this.x_speed = -this.x_speed;
    this.y > (paddle2.y + paddle2.height/2) ? this.y_speed += (paddle2.speed / 2) : this.y_speed -= (paddle2.speed / 2);
  } 

  if(this.x < 5 || this.x > 795) {
    this.x < 5 ? score1 ++ : score2 ++;
    document.getElementById("player1Score").innerHTML = score1;
    document.getElementById("player2Score").innerHTML = score2;
    this.x = 400;
    this.y = 300;
    this.xSpeed = 1;
    this.ySpeed = 1;
}
    
};

window.onload = function() {
    animate(step);
  };


window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});
