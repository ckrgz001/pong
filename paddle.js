var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById('pong');
var width = 800;
var height = 500;
var context = canvas.getContext('2d');
var keysDown = {};


var step = function() {
    update();
    render();
    animate(step);
  };

var update = function() {
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

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  if(this.y < 30) {
    this.y = 30;
  } else if (this.y + this.height > 495) {
    this.y = 495 - this.height;
  }
};
  

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 38) {
      this.paddle.move(0, -this.paddle.speed);
    } else if (value == 40) {
      this.paddle.move(0, this.paddle.speed);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

Computer.prototype.update = function() {
  if (playerTwo == true) {
    for(var key in keysDown) {
      var value = Number(key);
      if(value == 65) {
        this.paddle.move(0, -this.paddle.speed);
      } else if (value == 90) {
        this.paddle.move(0, this.paddle.speed);
      } else {
        this.paddle.move(0, 0);
      }
    }
  } else {
    (this.paddle.y + this.paddle.height/2) > ball.y ? this.paddle.move(0, -this.paddle.speed) : this.paddle.move(0,0);
    (this.paddle.y + this.paddle.height/2) < ball.y ? this.paddle.move(0, this.paddle.speed) : this.paddle.move(0,0);
  }
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
  this.x_speed = 0;
  this.y_speed = 0;
  this.radius = 10;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#fff";
  context.fill();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 250);




window.onload = function() {
    animate(step);
  };


window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});
