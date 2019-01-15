var snakeGame: SnakeGame;


class SnakeGame {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private gameSpeed: number = 100;

    constructor(mCanvas: HTMLCanvasElement) {
        this.canvas = mCanvas;
        this.context = this.canvas.getContext("2d");

    }

    start() {
        this.restart();
        setInterval(() => snakeGame.loop(), this.gameSpeed);
    }

    restart() {

    }

    loop() {
        this.draw();
    }

    draw() {
        console.log("draw");

        this.context.fillStyle = "green";
        this.context.fillRect(100, 100, 32, 32);

    }
}



function direction(event: KeyboardEvent) {
    let key = event.keyCode;
    const KEY_LEFT: number = 37;
    const KEY_UP: number = 38;
    const KEY_RIGHT: number = 39;
    const KEY_DOWN: number = 40;

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

window.onload = () => {
    document.addEventListener("keydown", direction);

    var canvas = <HTMLCanvasElement>document.getElementById('snakeCanvas');
    snakeGame = new SnakeGame(canvas);
    //snakeGame.start();
};



