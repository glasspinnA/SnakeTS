export class Position {
    private xPosition: number;
    private yPosition: number;

    constructor(xPosition: number, yPosition: number) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    getX() {
        return this.xPosition;
    }

    getY() {
        return this.yPosition;
    }

    setX(xPosition: number) {
        this.xPosition = xPosition;
    }

    setY(yPosition: number) {
        this.yPosition = yPosition;
    }
}