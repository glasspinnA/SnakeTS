
enum Direction {
    LEFT, RIGHT, UP, DOWN
}


var snakeGame: SnakeGame;
const TILE_SIZE = 10;
const GAME_SPEED = 500;

class Position {
    xPostion: number;
    yPosition: number;

    constructor(xPosition: number, yPosition: number) {
        this.xPostion = xPosition;
        this.yPosition = yPosition;
    }
}


class SnakeGame {
    private context: CanvasRenderingContext2D;
    private direction: Direction = NaN;
    private canvasHeight: number;
    private canvasWidth: number;
    private isGamePaused: boolean = false;

    private snakeArray: Array<Position> = new Array();
    private food: Position;
    private game: any;

    constructor(mCanvas: HTMLCanvasElement) {
        this.context = mCanvas.getContext("2d");
        this.canvasHeight = mCanvas.height;
        this.canvasWidth = mCanvas.width;
    }


    /**
     * Function to clear the canvas from objects 
     */
    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    /**
     * Function to stop the game 
     */
    private stopGame() {
        clearInterval(this.game);
        alert("Game Over!");
    }

    /**
     * Function to pause game
     */
    public pauseGame() {
        this.isGamePaused = !this.isGamePaused;
    }

    /**
     * Function to start the game 
     */
    public start() {
        this.initGameObjects();

        this.game = setInterval(() => {
            if (!this.isGamePaused) {
                snakeGame.loop();
            }
        }, GAME_SPEED);

    }

    /**
     * Function to init snake and first apple 
     */
    private initGameObjects() {
        this.snakeArray.push(new Position(150, 150));
        this.food = new Position(this.generateFoodCoordinates(), this.generateFoodCoordinates());
    }


    private loop() {
        this.checkBorderCollision();
        this.snakeTouchItself();
        this.clearCanvas();
        this.drawFood();
        this.drawSnake();
        this.moveSnake();
    }

    /**
     * Function to move snake 
     */
    private moveSnake() {
        let headOfSnake = new Position(this.snakeArray[0].xPostion, this.snakeArray[0].yPosition);

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


        const isFoodEaten = (this.snakeArray[0].xPostion === this.food.xPostion
            && this.snakeArray[0].yPosition === this.food.yPosition);

        if (isFoodEaten) {
            console.log("EAT FOOD");
            this.createFood();
        } else {
            this.snakeArray.pop();
        }
    }


    /**
     * Function to draw the snake
     */
    private drawSnake() {
        this.context.fillStyle = "#20bf6b";
        this.context.strokeStyle = "black";

        this.snakeArray.forEach((snakeElement) => {
            this.context.fillRect(snakeElement.xPostion, snakeElement.yPosition, TILE_SIZE, TILE_SIZE);
            this.context.strokeRect(snakeElement.xPostion, snakeElement.yPosition, TILE_SIZE, TILE_SIZE);
        });
    }



    /**
     * Function to create food 
     */
    createFood() {
        this.food.xPostion = this.generateFoodCoordinates();
        this.food.yPosition = this.generateFoodCoordinates();

        this.snakeArray.forEach((snakeElement) => {
            const isFoodOnSnake = (snakeElement.xPostion == this.food.xPostion && snakeElement.yPosition == this.food.yPosition);
            if (isFoodOnSnake) {
                this.createFood();
            }
        });
    }

    /**
     * Function to generate coordinates for food 
     */
    generateFoodCoordinates() {
        const thresholdValue = this.canvasWidth / 10;
        let position = (Math.floor(Math.random() * thresholdValue) + 1) * 10;
        return position;
    }

    /**
     * Function to draw out the food on the canvas 
     */
    drawFood() {
        this.context.fillStyle = '#fc5c65';
        this.context.strokeStyle = '#eb3b5a';
        this.context.fillRect(this.food.xPostion, this.food.yPosition, TILE_SIZE, TILE_SIZE);
        this.context.strokeRect(this.food.xPostion, this.food.yPosition, TILE_SIZE, TILE_SIZE);
    }

    /**
     * Function to check if the snake touches itself
     */
    private snakeTouchItself() {
        for (let i = 3; i < this.snakeArray.length; i++) {
            const isSnakeTouchingItself = this.snakeArray[i].xPostion == this.snakeArray[0].xPostion && this.snakeArray[i].yPosition == this.snakeArray[0].yPosition;
            if (isSnakeTouchingItself) {
                this.stopGame();
            }
        }
    }

    /**
     * Function th check if the snake touches the borders of the canvas
     */
    private checkBorderCollision() {
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
    }


    public moveLeft() {
        if (this.direction != Direction.RIGHT) {
            this.direction = Direction.LEFT;
        }
    }

    public moveUp() {
        if (this.direction != Direction.DOWN) {
            this.direction = Direction.UP;
        }
    }

    public moveRight() {
        if (this.direction != Direction.LEFT) {
            this.direction = Direction.RIGHT;
        }
    }

    public moveDown() {
        if (this.direction != Direction.UP) {
            this.direction = Direction.DOWN;
        }
    }
}



/**
 * Function to determind which key is pressed by the user 
 */
function keyPressed(event: KeyboardEvent) {
    const KEYBOARD_BUTTON = event.keyCode;
    const KEY_LEFT: number = 37;
    const KEY_UP: number = 38;
    const KEY_RIGHT: number = 39;
    const KEY_DOWN: number = 40;

    const KEY_STOP_GAME: number = 80;

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
window.onload = () => {
    document.addEventListener("keydown", keyPressed);

    let canvas = initGameWindow();

    snakeGame = new SnakeGame(canvas);
    snakeGame.start();

    activateSpeechRecognition();
};

/**
 * Function that initialize the game window
 */
function initGameWindow() {
    var canvas = <HTMLCanvasElement>document.getElementById('snakeCanvas');
    var parent = <HTMLDivElement>document.getElementById("game-wrapper");
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    return canvas;
}

/**
 * Function that implements the speech recognition function
 * If the function detects a word it's passed to next function
 */
function activateSpeechRecognition() {
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            let word = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                textToAction(word)
            }
        }
    }

    recognition.start();
}

/**
 * Function that checks if the recognized word said by the user matches any of the words that controls the snakes movement
 * @param word - The detected word 
 */
function textToAction(word: string) {
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
function wordlogger(word: string) {
    const divToAppend = document.getElementById('word-container');

    divToAppend.innerHTML += '<li>' + word + '</li>';
}