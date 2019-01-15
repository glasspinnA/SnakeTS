"use strict";
var snakeGame;
var SnakeGame = /** @class */ (function () {
    function SnakeGame(mCanvas) {
        this.gameSpeed = 100;
        this.canvas = mCanvas;
        this.context = this.canvas.getContext("2d");
    }
    SnakeGame.prototype.start = function () {
        this.restart();
        setInterval(function () { return snakeGame.loop(); }, this.gameSpeed);
    };
    SnakeGame.prototype.restart = function () {
    };
    SnakeGame.prototype.loop = function () {
        this.draw();
    };
    SnakeGame.prototype.draw = function () {
        console.log("draw");
        this.context.fillStyle = "green";
        this.context.fillRect(100, 100, 32, 32);
    };
    return SnakeGame;
}());
function direction(event) {
    var key = event.keyCode;
    var KEY_LEFT = 37;
    var KEY_UP = 38;
    var KEY_RIGHT = 39;
    var KEY_DOWN = 40;
    switch (key) {
        case KEY_RIGHT: {
            console.log("right");
            break;
        }
        case KEY_DOWN: {
            console.log("down");
            break;
        }
        case KEY_LEFT: {
            console.log("left");
            break;
        }
        case KEY_UP: {
            console.log("up");
            break;
        }
    }
}
window.onload = function () {
    document.addEventListener("keydown", direction);
    var canvas = document.getElementById('snakeCanvas');
    snakeGame = new SnakeGame(canvas);
    //snakeGame.start();
};
