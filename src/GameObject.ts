import { GameBoard } from "./Board.js";
import { Canvas } from "./Canvas.js";
import { Game } from "./Game.js";

abstract class GameObject {
  constructor(
    protected _x: number,
    protected _y: number,
    protected color: string
  ) {}

    /**
   * Gets the x-coordinate of the object.
   * @returns {number} The x-coordinate.
   */
  public get x(): number {
    return this._x;
  }

    /**
   * Gets the y-coordinate of the object.
   * @returns {number} The y-coordinate.
   */
  public get y(): number {
    return this._y;
  }

    /**
   * Sets the x-coordinate of the object.
   * @param {number} xCoord - The new x-coordinate to set.
   * @throws {Error} If the x-coordinate is out of bounds.
   */
  public set x(xCoord: number) {
    console.log(xCoord);
    if (
      xCoord >= 0 &&
      xCoord <= GameBoard.gridSize * (Game.instance.map.ROWS + 1)
    ) {
      this._x = xCoord;
    } else {
      throw new Error("Invalid x-coordinate");
    }
  }

    /**
   * Sets the y-coordinate of the object.
   * @param {number} yCoord - The new y-coordinate to set.
   * @throws {Error} If the y-coordinate is out of bounds.
   */

  public set y(yCoord: number) {
    console.log(yCoord);

    if (
      yCoord >= 0 &&
      yCoord <= GameBoard.gridSize * (Game.instance.map.COLUMNS + 1)
    ) {
      this._y = yCoord;
    } else {
      throw new Error("Invalid y-coordinate");
    }
  }

    /**
   * Prepares the canvas context for drawing.
   * Should be called before drawing begins.
   * @protected
   */
  protected startDraw(): void {
    Canvas.instance.context.beginPath();
  }

    /**
   * Finishes the drawing operation.
   * Should be called after drawing ends.
   * @protected
   */
  protected endDraw(): void {
    Canvas.instance.context.closePath();
  }

  abstract drawSelf(): void;

  public draw() {
    this.startDraw();
    this.drawSelf();
    this.endDraw();
  }
}

abstract class RectangularGameObject extends GameObject {
    /**
   * Creates an instance of RectangularGameObject.
   * @param {number} _x - The initial x-coordinate.
   * @param {number} _y - The initial y-coordinate.
   * @param {string} color - The color of the object.
   * @param {number} _width - The width of the rectangular object.
   * @param {number} _height - The height of the rectangular object.
   * @param {boolean | null} [firstMove=null] - Optional flag indicating if it's the first move.
   */
  constructor(
    _x: number,
    _y: number,
    color: string,
    protected _width: number,
    protected _height: number,
    protected firstMove: boolean | null = null
  ) {
    super(_x, _y, color);
    this.firstMove = firstMove;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  public drawSelf() {
    Canvas.instance.context.fillStyle = this.color;
    Canvas.instance.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { GameObject, RectangularGameObject };
