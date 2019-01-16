"use strict";
var snakeGame;
var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["UP"] = 2] = "UP";
    Direction[Direction["DOWN"] = 3] = "DOWN";
})(Direction || (Direction = {}));
var TILE_SIZE = 10;
var GAME_SPEED = 80;
var Position = /** @class */ (function () {
    function Position(xPosition, yPosition) {
        this.xPostion = xPosition;
        this.yPosition = yPosition;
    }
    return Position;
}());
var SnakeGame = /** @class */ (function () {
    function SnakeGame(mCanvas) {
        this.isGamePaused = false;
        this.snakeArray = new Array();
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
        this.initGameObjects();
        setInterval(function () {
            if (!_this.isGamePaused) {
                snakeGame.loop();
            }
        }, GAME_SPEED);
    };
    SnakeGame.prototype.initGameObjects = function () {
        this.snakeArray.push(new Position(150, 150));
        this.food = new Position(70, 170);
    };
    SnakeGame.prototype.loop = function () {
        this.checkBorderCollision();
        this.SnakeTouchItself();
        this.clearCanvas();
        this.drawFood();
        this.moveSnake();
        this.drawSnake();
    };
    SnakeGame.prototype.moveSnake = function () {
        var headOfSnake = new Position(this.snakeArray[0].xPostion, this.snakeArray[0].yPosition);
        switch (this.direction) {
            case Direction.LEFT:
                headOfSnake.xPostion -= TILE_SIZE;
                break;
            case Direction.UP:
                headOfSnake.yPosition -= TILE_SIZE;
                break;
            case Direction.RIGHT:
                headOfSnake.xPostion += TILE_SIZE;
                break;
            case Direction.DOWN:
                headOfSnake.yPosition += TILE_SIZE;
                break;
        }
        this.snakeArray.unshift(headOfSnake);
        var isFoodEaten = (this.snakeArray[0].xPostion === this.food.xPostion
            && this.snakeArray[0].yPosition === this.food.yPosition);
        if (isFoodEaten) {
            console.log("EAT FOOD");
            this.createFood();
        }
        else {
            this.snakeArray.pop();
        }
    };
    /**
     * Function to draw the snake
     */
    SnakeGame.prototype.drawSnake = function () {
        var _this = this;
        this.context.fillStyle = "red";
        this.context.strokeStyle = "black";
        this.snakeArray.forEach(function (snakeElement) {
            _this.context.fillRect(snakeElement.xPostion, snakeElement.yPosition, TILE_SIZE, TILE_SIZE);
            _this.context.strokeRect(snakeElement.xPostion, snakeElement.yPosition, TILE_SIZE, TILE_SIZE);
        });
    };
    SnakeGame.prototype.createFood = function () {
        var _this = this;
        this.food.xPostion = 30;
        this.food.yPosition = 170;
        this.snakeArray.forEach(function (snakeElement) {
            var isFoodOnSnake = (snakeElement.xPostion == _this.food.xPostion && snakeElement.yPosition == _this.food.yPosition);
            if (isFoodOnSnake) {
                _this.createFood();
            }
        });
    };
    SnakeGame.prototype.drawFood = function () {
        this.context.fillStyle = 'blue';
        this.context.strokeStyle = 'darkred';
        this.context.fillRect(this.food.xPostion, this.food.yPosition, TILE_SIZE, TILE_SIZE);
        this.context.strokeRect(this.food.xPostion, this.food.yPosition, TILE_SIZE, TILE_SIZE);
    };
    //BE AWARE OF THE >==== THINFS
    SnakeGame.prototype.SnakeTouchItself = function () {
        for (var i = 4; i < this.snakeArray.length; i++) {
            var isSnakeTouchingItself = this.snakeArray[i].xPostion == this.snakeArray[0].xPostion && this.snakeArray[i].yPosition == this.snakeArray[0].yPosition;
            if (isSnakeTouchingItself) {
                console.log("Current" + this.snakeArray[i].xPostion);
                console.log(this.snakeArray[0].xPostion);
                console.log("EAT ITSELF");
            }
        }
    };
    SnakeGame.prototype.checkBorderCollision = function () {
        if (this.snakeArray[0].xPostion < TILE_SIZE * 2) {
            console.log("deadss");
            this.isGamePaused = true;
        }
        if (this.snakeArray[0].xPostion > this.canvasWidth) {
            console.log("dead");
            this.isGamePaused = true;
        }
        if (this.snakeArray[0].yPosition > this.canvasWidth - 10) {
            console.log("dead");
            this.isGamePaused = true;
        }
        if (this.snakeArray[0].yPosition < TILE_SIZE * 2) {
            console.log("desad");
            this.isGamePaused = true;
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
