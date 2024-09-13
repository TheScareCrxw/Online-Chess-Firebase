import { GameBoard } from "./Board.js";
import { Canvas } from "./Canvas.js";
import { RectangularGameObject } from "./GameObject.js";


/**
 * Represents a base tile on the game board.
 * Extends RectangularGameObject for common properties.
 */
class BaseTile extends RectangularGameObject {
   /**
   * Constructs a base tile object.
   * @param {number} x - The x-coordinate of the tile.
   * @param {number} y - The y-coordinate of the tile.
   * @param {string} color - The color of the tile.
   * @param {number} size - The size of the tile (default is GameBoard.gridSize).
   */
  constructor(
    x: number,
    y: number,
    color: string,
    readonly size: number = GameBoard.gridSize
  ) {
    super(x, y, color, size, size);
  }

    /**
   * Gets the x-coordinate of the center of the tile.
   * @returns {number} The x-coordinate of the center.
   */
  public get centerX(): number {
    return this.x + this.size / 2;
  }

    /**
   * Gets the y-coordinate of the center of the tile.
   * @returns {number} The y-coordinate of the center.
   */
  public get centerY(): number {
    return this.y + this.size / 2;
  }

    /**
   * Converts pixel coordinates to tile indices.
   * @param {number} x - The x-coordinate in pixels.
   * @param {number} y - The y-coordinate in pixels.
   * @returns {number[]} The tile indices [I, J].
   */
  public tileCoordinates(x: number, y: number): number[] {
    const I: number = Math.floor(x / GameBoard.gridSize);
    const J: number = Math.floor(y / GameBoard.gridSize);

    return [I, J];
  }

  public drawSelf(): void {
    Canvas.instance.context.fillStyle = this.color;
    Canvas.instance.context.fillRect(this.x, this.y, this.width, this.height);
   
  }

    /**
   * Checks if a tile coordinate is within the valid board range.
   * @param {number} x - The x-coordinate of the tile.
   * @param {number} y - The y-coordinate of the tile.
   * @returns {boolean} True if the tile is valid, otherwise false.
   */
  public static isTileValid(x: number, y: number): boolean {
    return (
      x >= 0 &&
      x < 8 * GameBoard.gridSize &&
      y >= 0 &&
      y < 8 * GameBoard.gridSize
    );
  }



    /**
   * Retrieves the tile from the numerated map.
   * @param {BaseTile[][]} numeratedMap - The numerated map of tiles.
   * @param {number} x - The x-coordinate of the tile.
   * @param {number} y - The y-coordinate of the tile.
   * @returns {BaseTile} The tile object at the specified coordinates.
   */
  public static getTile(
    numeratedMap: BaseTile[][],
    x: number,
    y: number
  ): BaseTile {
    const col = x / GameBoard.gridSize;
    const row = y / GameBoard.gridSize;
    return numeratedMap[row][col];
  }
}


export default BaseTile;
