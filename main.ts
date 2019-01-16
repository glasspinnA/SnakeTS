var snakeGame: SnakeGame;
enum Direction {
    LEFT, RIGHT, UP, DOWN
}

const TILE_SIZE = 10;
const GAME_SPEED = 80;

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
    private direction: Direction;

    private canvasHeight: number;
    private canvasWidth: number;

    private isGamePaused: boolean = false;

    private snakeArray: Array<Position> = new Array();
    private food: Position;


    constructor(mCanvas: HTMLCanvasElement) {
        this.context = mCanvas.getContext("2d");
        this.canvasHeight = mCanvas.height;
        this.canvasWidth = mCanvas.width;
    }


    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    public pauseGame() {
        //clearInterval(this.game);
        this.isGamePaused = !this.isGamePaused;
    }

    public start() {

        this.initGameObjects();

        setInterval(() => {
            if (!this.isGamePaused) {
                snakeGame.loop();
            }
        }, GAME_SPEED);

    }

    initGameObjects() {
        this.snakeArray.push(new Position(150, 150));
        this.food = new Position(70, 170);
    }


    private loop() {
        this.checkBorderCollision();
        this.SnakeTouchItself();
        this.clearCanvas();
        this.drawFood();
        this.moveSnake();
        this.drawSnake();
    }

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
        this.context.fillStyle = "red";
        this.context.strokeStyle = "black";

        this.snakeArray.forEach((snakeElement) => {
            this.context.fillRect(snakeElement.xPostion, snakeElement.yPosition, TILE_SIZE, TILE_SIZE);
            this.context.strokeRect(snakeElement.xPostion, snakeElement.yPosition, TILE_SIZE, TILE_SIZE);
        });
    }



    createFood() {
        this.food.xPostion = 30;
        this.food.yPosition = 170;


        this.snakeArray.forEach((snakeElement) => {
            const isFoodOnSnake = (snakeElement.xPostion == this.food.xPostion && snakeElement.yPosition == this.food.yPosition);
            if (isFoodOnSnake) {
                this.createFood();
            }
        });
    }

    drawFood() {
        this.context.fillStyle = 'blue';
        this.context.strokeStyle = 'darkred';
        this.context.fillRect(this.food.xPostion, this.food.yPosition, TILE_SIZE, TILE_SIZE);
        this.context.strokeRect(this.food.xPostion, this.food.yPosition, TILE_SIZE, TILE_SIZE);

    }

    //BE AWARE OF THE >==== THINFS
    private SnakeTouchItself() {
        for (let i = 4; i < this.snakeArray.length; i++) {
            const isSnakeTouchingItself = this.snakeArray[i].xPostion == this.snakeArray[0].xPostion && this.snakeArray[i].yPosition == this.snakeArray[0].yPosition;
            if (isSnakeTouchingItself) {
                console.log("Current" + this.snakeArray[i].xPostion);
                console.log(this.snakeArray[0].xPostion);

                console.log("EAT ITSELF");
            }
        }
    }

    private checkBorderCollision() {
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

window.onload = () => {
    document.addEventListener("keydown", keyPressed);

    var canvas = <HTMLCanvasElement>document.getElementById('snakeCanvas');
    snakeGame = new SnakeGame(canvas);
    snakeGame.start();
};



