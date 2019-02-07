(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position = /** @class */ (function () {
    function Position(xPosition, yPosition) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }
    Position.prototype.getX = function () {
        return this.xPosition;
    };
    Position.prototype.getY = function () {
        return this.yPosition;
    };
    Position.prototype.setX = function (xPosition) {
        this.xPosition = xPosition;
    };
    Position.prototype.setY = function (yPosition) {
        this.yPosition = yPosition;
    };
    return Position;
}());
exports.Position = Position;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position_1 = require("./Position");
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
        this.snakeArray.push(new Position_1.Position(150, 150));
        this.food = new Position_1.Position(this.generateFoodCoordinates(), this.generateFoodCoordinates());
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
        var headOfSnake = new Position_1.Position(this.snakeArray[0].getX(), this.snakeArray[0].getY());
        switch (this.direction) {
            case Direction.LEFT:
                headOfSnake.setX(headOfSnake.getX() - TILE_SIZE);
                break;
            case Direction.UP:
                headOfSnake.setY(headOfSnake.getY() - TILE_SIZE);
                break;
            case Direction.RIGHT:
                headOfSnake.setX(headOfSnake.getX() + TILE_SIZE);
                break;
            case Direction.DOWN:
                headOfSnake.setY(headOfSnake.getY() + TILE_SIZE);
                break;
        }
        this.snakeArray.unshift(headOfSnake);
        var isFoodEaten = (this.snakeArray[0].getX() === this.food.getX()
            && this.snakeArray[0].getY() === this.food.getY());
        if (isFoodEaten) {
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
            _this.context.fillRect(snakeElement.getX(), snakeElement.getY(), TILE_SIZE, TILE_SIZE);
            _this.context.strokeRect(snakeElement.getX(), snakeElement.getY(), TILE_SIZE, TILE_SIZE);
        });
    };
    /**
     * Function to create food
     */
    SnakeGame.prototype.createFood = function () {
        var _this = this;
        this.food.setX(this.generateFoodCoordinates());
        this.food.setY(this.generateFoodCoordinates());
        this.snakeArray.forEach(function (snakeElement) {
            var isFoodOnSnake = (snakeElement.getX() == _this.food.getX() && snakeElement.getY() == _this.food.getY());
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
        this.context.fillRect(this.food.getX(), this.food.getY(), TILE_SIZE, TILE_SIZE);
        this.context.strokeRect(this.food.getX(), this.food.getY(), TILE_SIZE, TILE_SIZE);
    };
    /**
     * Function to check if the snake touches itself
     */
    SnakeGame.prototype.snakeTouchItself = function () {
        for (var i = 3; i < this.snakeArray.length; i++) {
            var isSnakeTouchingItself = this.snakeArray[i].getX() == this.snakeArray[0].getX()
                &&
                    this.snakeArray[i].getY() == this.snakeArray[0].getY();
            if (isSnakeTouchingItself) {
                this.stopGame();
            }
        }
    };
    /**
     * Function th check if the snake touches the borders of the canvas
     */
    SnakeGame.prototype.checkBorderCollision = function () {
        if (this.snakeArray[0].getX() <= 0) {
            this.isGamePaused = true;
        }
        if (this.snakeArray[0].getX() >= this.canvasWidth - TILE_SIZE) {
            this.isGamePaused = true;
        }
        if (this.snakeArray[0].getY() >= this.canvasWidth - TILE_SIZE) {
            this.isGamePaused = true;
        }
        if (this.snakeArray[0].getY() <= 0) {
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
            snakeGame.pauseGame();
            break;
        }
    }
}
/**
 * Function which is called when the window gets loaded
 * Calls various functions to start the game
 */
window.onload = function () {
    document.addEventListener("keydown", keyPressed);
    var canvas = initGameWindow();
    snakeGame = new SnakeGame(canvas);
    snakeGame.start();
    activateSpeechRecognition();
};
/**
 * Function that initialize the game window
 */
function initGameWindow() {
    var canvas = document.getElementById('snakeCanvas');
    var parent = document.getElementById("game-wrapper");
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    return canvas;
}
/**
 * Function that implements the speech recognition function
 * If the function detects a word it's passed to next function
 */
function activateSpeechRecognition() {
    var speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new speechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = 'en-US';
    recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; i++) {
            var word = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                textToAction(word);
            }
        }
    };
    recognition.start();
}
/**
 * Function that checks if the recognized word said by the user matches any of the words that controls the snakes movement
 * @param word - The detected word
 */
function textToAction(word) {
    word = word.replace(/\s+/g, "");
    word = word.toLowerCase();
    wordlogger(word);
    switch (word) {
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
        case 'pause':
            snakeGame.pauseGame();
    }
}
/**
 * Function that loggs every recognized word onto to the logger window on the page
 */
function wordlogger(word) {
    var divToAppend = document.getElementById('word-container');
    divToAppend.innerHTML += '<li>' + word + '</li>';
}

},{"./Position":1}]},{},[2]);
