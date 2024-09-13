import { BlackPiece } from "./BlackPiece.js";
import {Game} from "./Game.js";
import { BlackPieceFactory, WhitePieceFactory } from "./PieceFactory.js";
import BaseTile from "./Tile.js";
import { WhitePiece } from "./WhitePiece.js";

class GameBoard {

  constructor(isPlayerBlack: boolean) {
    this.isPlayerBlack = isPlayerBlack;
    this.gameMap = isPlayerBlack ? Game.instance.BLACK_GRID : Game.instance.WHITE_GRID;
  }
  
  public playGame() {
    this.setBoard();
    this.initializeBoard();
    this.drawMap();
  }

    /** @type {number} The size of each grid square. */
  static readonly gridSize: number = 90;
  //@ts-ignore
  public gameMap: string[][];
  private _tileMap: BaseTile[][] = [];
/** @type {number} The number of rows on the board. */
  public ROWS: number = 8;
  public COLUMNS: number = 8;

  public isPlayerBlack: boolean;

  readonly colors: string[] = ["#769656", "#EEEED2"];

    /** @type {string[][]} The initial grid configuration for black pieces. */

  readonly BLACK_GRID: string[][] = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"],
  ];

    /** @type {string[][]} The initial grid configuration for white pieces. */
  readonly WHITE_GRID: string[][] = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ];

  public get tileMap(): BaseTile[][] {
    return this._tileMap;
  }

  private setBoard() {
    if (this.isPlayerBlack) {
      this.gameMap = this.BLACK_GRID;
    } else {
      this.gameMap = this.WHITE_GRID;
    }
  }

  private initializeBoard() {
    for (let y = 0; y < this.ROWS; y++) {
      const TILE_ROW: BaseTile[] = Array(this.COLUMNS);
      for (let x = 0; x < this.COLUMNS; x++) {
        const TILE_TYPE: string = this.gameMap[y][x];
        const LOWERCASE_TILE_TYPE: string = TILE_TYPE.toLowerCase();
        const TILE: BaseTile = new BaseTile(
          x * GameBoard.gridSize,
          y * GameBoard.gridSize,
          this.colors[(x + y + 1) % 2]
        );
        TILE_ROW[x] = TILE;
        if (TILE_TYPE === Pieces.EMPTY) {
          //empty
        } else if (TILE_TYPE === LOWERCASE_TILE_TYPE) {
          const NEW_BLACK_PIECE: BlackPiece = BlackPieceFactory.make(
            TILE_TYPE as Pieces,
            TILE.x,
            TILE.y,
            true
          );
          Game.instance.blackPiecesOnTheBoard.push(NEW_BLACK_PIECE);
        } else {
          const NEW_WHITE_PIECE: WhitePiece = WhitePieceFactory.make(
            LOWERCASE_TILE_TYPE as Pieces,
            TILE.x,
            TILE.y,
            true
          );
          Game.instance.whitePiecesOnTheBoard.push(NEW_WHITE_PIECE);
        }
      }
      this._tileMap.push(TILE_ROW);
    }
  }

  public drawMap() {
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLUMNS; j++) {
        this.tileMap[i][j].draw();
      }
    }
  }
}

enum Pieces {
  PAWN = "p",
  BISHOP = "b",
  KNIGHT = "n",
  ROOK = "r",
  QUEEN = "q",
  KING = "k",
  EMPTY = "0",
}

export { GameBoard, Pieces };
