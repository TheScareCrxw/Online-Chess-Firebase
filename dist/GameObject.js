import { GameBoard } from "./Board.js";
import { Canvas } from "./Canvas.js";
import { Game } from "./Game.js";
class GameObject {
    _x;
    _y;
    color;
    constructor(_x, _y, color) {
        this._x = _x;
        this._y = _y;
        this.color = color;
    }
    /**
   * Gets the x-coordinate of the object.
   * @returns {number} The x-coordinate.
   */
    get x() {
        return this._x;
    }
    /**
   * Gets the y-coordinate of the object.
   * @returns {number} The y-coordinate.
   */
    get y() {
        return this._y;
    }
    /**
   * Sets the x-coordinate of the object.
   * @param {number} xCoord - The new x-coordinate to set.
   * @throws {Error} If the x-coordinate is out of bounds.
   */
    set x(xCoord) {
        console.log(xCoord);
        if (xCoord >= 0 &&
            xCoord <= GameBoard.gridSize * (Game.instance.map.ROWS + 1)) {
            this._x = xCoord;
        }
        else {
            throw new Error("Invalid x-coordinate");
        }
    }
    /**
   * Sets the y-coordinate of the object.
   * @param {number} yCoord - The new y-coordinate to set.
   * @throws {Error} If the y-coordinate is out of bounds.
   */
    set y(yCoord) {
        console.log(yCoord);
        if (yCoord >= 0 &&
            yCoord <= GameBoard.gridSize * (Game.instance.map.COLUMNS + 1)) {
            this._y = yCoord;
        }
        else {
            throw new Error("Invalid y-coordinate");
        }
    }
    /**
   * Prepares the canvas context for drawing.
   * Should be called before drawing begins.
   * @protected
   */
    startDraw() {
        Canvas.instance.context.beginPath();
    }
    /**
   * Finishes the drawing operation.
   * Should be called after drawing ends.
   * @protected
   */
    endDraw() {
        Canvas.instance.context.closePath();
    }
    draw() {
        this.startDraw();
        this.drawSelf();
        this.endDraw();
    }
}
class RectangularGameObject extends GameObject {
    _width;
    _height;
    firstMove;
    /**
   * Creates an instance of RectangularGameObject.
   * @param {number} _x - The initial x-coordinate.
   * @param {number} _y - The initial y-coordinate.
   * @param {string} color - The color of the object.
   * @param {number} _width - The width of the rectangular object.
   * @param {number} _height - The height of the rectangular object.
   * @param {boolean | null} [firstMove=null] - Optional flag indicating if it's the first move.
   */
    constructor(_x, _y, color, _width, _height, firstMove = null) {
        super(_x, _y, color);
        this._width = _width;
        this._height = _height;
        this.firstMove = firstMove;
        this.firstMove = firstMove;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    drawSelf() {
        Canvas.instance.context.fillStyle = this.color;
        Canvas.instance.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
export { GameObject, RectangularGameObject };
//# sourceMappingURL=GameObject.js.map