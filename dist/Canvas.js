import { Game } from "./Game.js";
class Canvas {
    static _instance;
    /**
     * Gets the singleton instance of the Canvas class.
     * @returns {Canvas} The instance of the Canvas class.
     */
    static get instance() {
        if (Canvas._instance === undefined) {
            Canvas._instance = new Canvas();
        }
        return Canvas._instance;
    }
    screen = document.getElementById("chess-board");
    _context = this.screen.getContext("2d");
    static WIDTH = 90 * 8;
    static HEIGHT = 90 * 8;
    constructor() {
        this.screen.width = Canvas.WIDTH;
        this.screen.height = Canvas.HEIGHT;
    }
    static clearScreen() {
        Canvas.instance.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
    }
    /**
     * Gets the 2D rendering context of the canvas.
     * @returns {CanvasRenderingContext2D} The 2D rendering context.
     */
    get context() {
        return this._context;
    }
    /**
   * Starts the game.
   * @param {boolean} isPlayerBlack - Indicates if the player is black.
   * @param {string} roomId - The ID of the game room.
   */
    startGame(isPlayerBlack, roomId) {
        Game.instance.start(isPlayerBlack, roomId);
    }
}
export { Canvas };
//# sourceMappingURL=Canvas.js.map