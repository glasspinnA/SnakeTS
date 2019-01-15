"use strict";
var snakeGame;
var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["UP"] = 2] = "UP";
    Direction[Direction["DOWN"] = 3] = "DOWN";
})(Direction || (Direction = {}));
var Position = /** @class */ (function () {
    function Position(xPosition, yPosition) {
        this.xPostion = xPosition;
        this.yPosition = yPosition;
    }
    return Position;
}());
var SnakeGame = /** @class */ (function () {
    function SnakeGame(mCanvas) {
        this.gameSpeed = 100;
        this.isGamePaused = false;
        this.canvas = mCanvas;
        this.context = mCanvas.getContext("2d");
        this.canvasHeight = mCanvas.height;
        this.canvasWidth = mCanvas.width;
    }
    SnakeGame.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    };
    SnakeGame.prototype.pauseGame = function () {
        //clearInterval(this.game);
        this.isGamePaused = !this.isGamePaused;
    };
    SnakeGame.prototype.start = function () {
        var _this = this;
        this.SnakePosition = new Position(100, 100);
        this.food = new Position(100, 164);
        setInterval(function () {
            if (!_this.isGamePaused) {
                snakeGame.loop();
            }
        }, this.gameSpeed);
    };
    SnakeGame.prototype.loop = function () {
        this.move();
        if (this.SnakePosition.xPostion == this.food.xPostion && this.SnakePosition.yPosition == this.food.yPosition) {
            this.eat();
        }
        this.checkBorderCollision();
        this.draw();
    };
    SnakeGame.prototype.eat = function () {
        console.log("eat");
    };
    SnakeGame.prototype.drawApple = function () {
        this.context.fillStyle = "red";
        this.context.fillRect(this.food.xPostion, this.food.yPosition, 32, 32);
    };
    SnakeGame.prototype.draw = function () {
        this.clearCanvas();
        this.drawApple();
        this.context.fillStyle = "green";
        this.context.fillRect(this.SnakePosition.xPostion, this.SnakePosition.yPosition, 32, 32);
    };
    SnakeGame.prototype.checkBorderCollision = function () {
        if (this.SnakePosition.xPostion <= 8) {
            console.log("dead");
            this.isGamePaused = true;
        }
        if (this.SnakePosition.xPostion >= this.canvasWidth - 32) {
            console.log("dead");
            this.isGamePaused = true;
        }
        if (this.SnakePosition.yPosition >= this.canvasHeight - 32) {
            console.log("dead");
            this.isGamePaused = true;
        }
        if (this.SnakePosition.yPosition <= 8) {
            console.log("dead");
            this.isGamePaused = true;
        }
    };
    SnakeGame.prototype.move = function () {
        switch (this.direction) {
            case Direction.LEFT:
                this.SnakePosition.xPostion -= 32;
                break;
            case Direction.UP:
                this.SnakePosition.yPosition -= 32;
                break;
            case Direction.RIGHT:
                this.SnakePosition.xPostion += 32;
                break;
            case Direction.DOWN:
                this.SnakePosition.yPosition += 32;
                break;
        }
    };
    SnakeGame.prototype.moveLeft = function () {
        if (this.direction != Direction.RIGHT) {
            this.direction = Direction.LEFT;
        }
    };
    SnakeGame.prototype.moveUp = function () {
        if (this.direction != Direction.DOWN) {
            this.direction = Direction.UP;
        }
    };
    SnakeGame.prototype.moveRight = function () {
        if (this.direction != Direction.LEFT) {
            this.direction = Direction.RIGHT;
        }
    };
    SnakeGame.prototype.moveDown = function () {
        if (this.direction != Direction.UP) {
            this.direction = Direction.DOWN;
        }
    };
    return SnakeGame;
}());
function keyPressed(event) {
    var KEYBOARD_BUTTON = event.keyCode;
    var KEY_LEFT = 37;
    var KEY_UP = 38;
    var KEY_RIGHT = 39;
    var KEY_DOWN = 40;
    var KEY_STOP_GAME = 80;
    switch (KEYBOARD_BUTTON) {
        case KEY_RIGHT: {
            snakeGame.moveRight();
            break;
        }
        case KEY_DOWN: {
            snakeGame.moveDown();
            break;
        }
        case KEY_LEFT: {
            snakeGame.moveLeft();
            break;
        }
        case KEY_UP: {
            snakeGame.moveUp();
            break;
        }
        case KEY_STOP_GAME: {
            snakeGame.pauseGame();
            break;
        }
    }
}
window.onload = function () {
    document.addEventListener("keydown", keyPressed);
    var canvas = document.getElementById('snakeCanvas');
    snakeGame = new SnakeGame(canvas);
    snakeGame.start();
};
