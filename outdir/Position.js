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
