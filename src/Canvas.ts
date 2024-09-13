import { Game } from "./Game.js";

class Canvas {
  private static _instance: Canvas | undefined;

  /**
   * Gets the singleton instance of the Canvas class.
   * @returns {Canvas} The instance of the Canvas class.
   */
  public static get instance(): Canvas {
    if (Canvas._instance === undefined) {
      Canvas._instance = new Canvas();
    }
    return Canvas._instance;
  }

  readonly screen: HTMLCanvasElement = document.getElementById("chess-board") as HTMLCanvasElement;
  private _context: CanvasRenderingContext2D = this.screen.getContext("2d") as CanvasRenderingContext2D;
  public static WIDTH: number = 90 * 8;
  public static HEIGHT: number = 90 * 8;

  private constructor() {
    this.screen.width = Canvas.WIDTH;
    this.screen.height = Canvas.HEIGHT;
  }

  public static clearScreen() {
    Canvas.instance.context.clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
  }

  /**
   * Gets the 2D rendering context of the canvas.
   * @returns {CanvasRenderingContext2D} The 2D rendering context.
   */
  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

    /**
   * Starts the game.
   * @param {boolean} isPlayerBlack - Indicates if the player is black.
   * @param {string} roomId - The ID of the game room.
   */
  public startGame(isPlayerBlack: boolean, roomId: string) {
    Game.instance.start(isPlayerBlack, roomId);
  }
}

export { Canvas };
