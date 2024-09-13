import { GameBoard } from "./Board.js";
import { Canvas } from "./Canvas.js";
import { RectangularGameObject } from "./GameObject.js";
/**
 * Represents a base tile on the game board.
 * Extends RectangularGameObject for common properties.
 */
class BaseTile extends RectangularGameObject {
    size;
    /**
    * Constructs a base tile object.
    * @param {number} x - The x-coordinate of the tile.
    * @param {number} y - The y-coordinate of the tile.
    * @param {string} color - The color of the tile.
    * @param {number} size - The size of the tile (default is GameBoard.gridSize).
    */
    constructor(x, y, color, size = GameBoard.gridSize) {
        super(x, y, color, size, size);
        this.size = size;
    }
    /**
   * Gets the x-coordinate of the center of the tile.
   * @returns {number} The x-coordinate of the center.
   */
    get centerX() {
        return this.x + this.size / 2;
    }
    /**
   * Gets the y-coordinate of the center of the tile.
   * @returns {number} The y-coordinate of the center.
   */
    get centerY() {
        return this.y + this.size / 2;
    }
    /**
   * Converts pixel coordinates to tile indices.
   * @param {number} x - The x-coordinate in pixels.
   * @param {number} y - The y-coordinate in pixels.
   * @returns {number[]} The tile indices [I, J].
   */
    tileCoordinates(x, y) {
        const I = Math.floor(x / GameBoard.gridSize);
        const J = Math.floor(y / GameBoard.gridSize);
        return [I, J];
    }
    drawSelf() {
        Canvas.instance.context.fillStyle = this.color;
        Canvas.instance.context.fillRect(this.x, this.y, this.width, this.height);
    }
    /**
   * Checks if a tile coordinate is within the valid board range.
   * @param {number} x - The x-coordinate of the tile.
   * @param {number} y - The y-coordinate of the tile.
   * @returns {boolean} True if the tile is valid, otherwise false.
   */
    static isTileValid(x, y) {
        return (x >= 0 &&
            x < 8 * GameBoard.gridSize &&
            y >= 0 &&
            y < 8 * GameBoard.gridSize);
    }
    /**
   * Retrieves the tile from the numerated map.
   * @param {BaseTile[][]} numeratedMap - The numerated map of tiles.
   * @param {number} x - The x-coordinate of the tile.
   * @param {number} y - The y-coordinate of the tile.
   * @returns {BaseTile} The tile object at the specified coordinates.
   */
    static getTile(numeratedMap, x, y) {
        const col = x / GameBoard.gridSize;
        const row = y / GameBoard.gridSize;
        return numeratedMap[row][col];
    }
}
export default BaseTile;
//# sourceMappingURL=Tile.js.map