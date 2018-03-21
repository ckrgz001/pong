var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById('pong');
var width = 800;
var height = 500;
var context = canvas.getContext('2d');


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
    this.x_speed = 0;
    this.y_speed = 0;
  }
  
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
    this.x_speed = 0;
    this.y_speed = 3;
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
