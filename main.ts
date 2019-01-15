var snakeGame: SnakeGame;
enum Direction {
    LEFT, RIGHT, UP, DOWN
}


class Position {
    xPostion: number;
    yPosition: number;

    constructor(xPosition: number, yPosition: number) {
        this.xPostion = xPosition;
        this.yPosition = yPosition;
    }

}


class SnakeGame {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private gameSpeed: number = 100;
    private direction: Direction;

    private canvasHeight: number;
    private canvasWidth: number;

    private isGamePaused: boolean = false;

    private SnakePosition: Position;
    private food: Position;

    constructor(mCanvas: HTMLCanvasElement) {
        this.canvas = mCanvas;
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

        this.SnakePosition = new Position(100, 100);
        this.food = new Position(100, 164);

        setInterval(() => {
            if (!this.isGamePaused) {
                snakeGame.loop();
            }
        }, this.gameSpeed);
    }


    private loop() {
        this.move();



        if (this.SnakePosition.xPostion == this.food.xPostion && this.SnakePosition.yPosition == this.food.yPosition) {
            this.eat();
        }
        this.checkBorderCollision();
        this.draw();
    }


    private eat() {
        console.log("eat");
    }

    private drawApple() {

        this.context.fillStyle = "red";
        this.context.fillRect(this.food.xPostion, this.food.yPosition, 32, 32);
    }

    private draw() {
        this.clearCanvas();
        this.drawApple();


        this.context.fillStyle = "green";
        this.context.fillRect(this.SnakePosition.xPostion, this.SnakePosition.yPosition, 32, 32);
    }

    private checkBorderCollision() {
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
    }


    private move() {
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



