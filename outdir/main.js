"use strict";
var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["UP"] = 2] = "UP";
    Direction[Direction["DOWN"] = 3] = "DOWN";
})(Direction || (Direction = {}));
var snakeGame;
var TILE_SIZE = 10;
var GAME_SPEED = 500;
var Position = /** @class */ (function () {
    function Position(xPosition, yPosition) {
        this.xPostion = xPosition;
        this.yPosition = yPosition;
    }
    return Position;
}());
var SnakeGame = /** @class */ (function () {
    function SnakeGame(mCanvas) {
        this.direction = NaN;
        this.isGamePaused = false;
        this.snakeArray = new Array();
        this.context = mCanvas.getContext("2d");
        this.canvasHeight = mCanvas.height;
        this.canvasWidth = mCanvas.width;
    }
    /**
     * Function to clear the canvas from objects
     */
    SnakeGame.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    };
    /**
     * Function to stop the game
     */
    SnakeGame.prototype.stopGame = function () {
        clearInterval(this.game);
        alert("Game Over!");
    };
    /**
     * Function to pause game
     */
    SnakeGame.prototype.pauseGame = function () {
        this.isGamePaused = !this.isGamePaused;
    };
    /**
     * Function to start the game
     */
    SnakeGame.prototype.start = function () {
        var _this = this;
        this.initGameObjects();
        this.game = setInterval(function () {
            if (!_this.isGamePaused) {
                snakeGame.loop();
            }
        }, GAME_SPEED);
    };
    /**
     * Function to init snake and first apple
     */
    SnakeGame.prototype.initGameObjects = function () {
        this.snakeArray.push(new Position(150, 150));
        this.food = new Position(this.generateFoodCoordinates(), this.generateFoodCoordinates());
    };
    SnakeGame.prototype.loop = function () {
        this.checkBorderCollision();
        this.snakeTouchItself();
        this.clearCanvas();
        this.drawFood();
        this.drawSnake();
        this.moveSnake();
    };
    /**
     * Function to move snake
     */
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
        this.context.fillStyle = "#20bf6b";
        this.context.strokeStyle = "black";
        this.snakeArray.forEach(function (snakeElement) {
            _this.context.fillRect(snakeElement.xPostion, snakeElement.yPosition, TILE_SIZE, TILE_SIZE);
            _this.context.strokeRect(snakeElement.xPostion, snakeElement.yPosition, TILE_SIZE, TILE_SIZE);
        });
    };
    /**
     * Function to create food
     */
    SnakeGame.prototype.createFood = function () {
        var _this = this;
        this.food.xPostion = this.generateFoodCoordinates();
        this.food.yPosition = this.generateFoodCoordinates();
        this.snakeArray.forEach(function (snakeElement) {
            var isFoodOnSnake = (snakeElement.xPostion == _this.food.xPostion && snakeElement.yPosition == _this.food.yPosition);
            if (isFoodOnSnake) {
                _this.createFood();
            }
        });
    };
    /**
     * Function to generate coordinates for food
     */
    SnakeGame.prototype.generateFoodCoordinates = function () {
        var thresholdValue = this.canvasWidth / 10;
        var position = (Math.floor(Math.random() * thresholdValue) + 1) * 10;
        return position;
    };
    /**
     * Function to draw out the food on the canvas
     */
    SnakeGame.prototype.drawFood = function () {
        this.context.fillStyle = '#fc5c65';
        this.context.strokeStyle = '#eb3b5a';
        this.context.fillRect(this.food.xPostion, this.food.yPosition, TILE_SIZE, TILE_SIZE);
        this.context.strokeRect(this.food.xPostion, this.food.yPosition, TILE_SIZE, TILE_SIZE);
    };
    /**
     * Function to check if the snake touches itself
     */
    SnakeGame.prototype.snakeTouchItself = function () {
        for (var i = 3; i < this.snakeArray.length; i++) {
            var isSnakeTouchingItself = this.snakeArray[i].xPostion == this.snakeArray[0].xPostion && this.snakeArray[i].yPosition == this.snakeArray[0].yPosition;
            if (isSnakeTouchingItself) {
                this.stopGame();
            }
        }
    };
    /**
     * Function th check if the snake touches the borders of the canvas
     */
    SnakeGame.prototype.checkBorderCollision = function () {
        if (this.snakeArray[0].xPostion <= 0) {
            this.isGamePaused = true;
        }
        if (this.snakeArray[0].xPostion >= this.canvasWidth - TILE_SIZE) {
            this.isGamePaused = true;
        }
        if (this.snakeArray[0].yPosition >= this.canvasWidth - TILE_SIZE) {
            this.isGamePaused = true;
        }
        if (this.snakeArray[0].yPosition <= 0) {
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
/**
 * Function to determind which key is pressed by the user
 */
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
            //snakeGame.pauseGame();
            break;
        }
    }
}
window.onload = function () {
    document.addEventListener("keydown", keyPressed);
    var canvas = initGameWindow();
    snakeGame = new SnakeGame(canvas);
    snakeGame.start();
    speech();
};
function initGameWindow() {
    var canvas = document.getElementById('snakeCanvas');
    var parent = document.getElementById("game-wrapper");
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    return canvas;
}
function speech() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var r = new SpeechRecognition();
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.lang = 'en-US';
    r.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; i++) {
            var direction = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                textToAction(direction);
            }
        }
    };
    r.start();
}
function textToAction(direction) {
    direction = direction.toLowerCase();
    console.log(direction);
    switch (direction) {
        case 'white':
            snakeGame.moveLeft();
            break;
        case 'black':
            snakeGame.moveUp();
            break;
        case 'red':
            snakeGame.moveRight();
            break;
        case 'blue':
            snakeGame.moveDown();
            break;
    }
}
