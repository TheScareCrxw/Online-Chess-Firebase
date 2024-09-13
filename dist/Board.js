import { Game } from "./Game.js";
import { BlackPieceFactory, WhitePieceFactory } from "./PieceFactory.js";
import BaseTile from "./Tile.js";
class GameBoard {
    constructor(isPlayerBlack) {
        this.isPlayerBlack = isPlayerBlack;
        this.gameMap = isPlayerBlack ? Game.instance.BLACK_GRID : Game.instance.WHITE_GRID;
    }
    playGame() {
        this.setBoard();
        this.initializeBoard();
        this.drawMap();
    }
    /** @type {number} The size of each grid square. */
    static gridSize = 90;
    //@ts-ignore
    gameMap;
    _tileMap = [];
    /** @type {number} The number of rows on the board. */
    ROWS = 8;
    COLUMNS = 8;
    isPlayerBlack;
    colors = ["#769656", "#EEEED2"];
    /** @type {string[][]} The initial grid configuration for black pieces. */
    BLACK_GRID = [
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
    WHITE_GRID = [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        ["0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0"],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ];
    get tileMap() {
        return this._tileMap;
    }
    setBoard() {
        if (this.isPlayerBlack) {
            this.gameMap = this.BLACK_GRID;
        }
        else {
            this.gameMap = this.WHITE_GRID;
        }
    }
    initializeBoard() {
        for (let y = 0; y < this.ROWS; y++) {
            const TILE_ROW = Array(this.COLUMNS);
            for (let x = 0; x < this.COLUMNS; x++) {
                const TILE_TYPE = this.gameMap[y][x];
                const LOWERCASE_TILE_TYPE = TILE_TYPE.toLowerCase();
                const TILE = new BaseTile(x * GameBoard.gridSize, y * GameBoard.gridSize, this.colors[(x + y + 1) % 2]);
                TILE_ROW[x] = TILE;
                if (TILE_TYPE === Pieces.EMPTY) {
                    //empty
                }
                else if (TILE_TYPE === LOWERCASE_TILE_TYPE) {
                    const NEW_BLACK_PIECE = BlackPieceFactory.make(TILE_TYPE, TILE.x, TILE.y, true);
                    Game.instance.blackPiecesOnTheBoard.push(NEW_BLACK_PIECE);
                }
                else {
                    const NEW_WHITE_PIECE = WhitePieceFactory.make(LOWERCASE_TILE_TYPE, TILE.x, TILE.y, true);
                    Game.instance.whitePiecesOnTheBoard.push(NEW_WHITE_PIECE);
                }
            }
            this._tileMap.push(TILE_ROW);
        }
    }
    drawMap() {
        for (let i = 0; i < this.ROWS; i++) {
            for (let j = 0; j < this.COLUMNS; j++) {
                this.tileMap[i][j].draw();
            }
        }
    }
}
var Pieces;
(function (Pieces) {
    Pieces["PAWN"] = "p";
    Pieces["BISHOP"] = "b";
    Pieces["KNIGHT"] = "n";
    Pieces["ROOK"] = "r";
    Pieces["QUEEN"] = "q";
    Pieces["KING"] = "k";
    Pieces["EMPTY"] = "0";
})(Pieces || (Pieces = {}));
export { GameBoard, Pieces };
//# sourceMappingURL=Board.js.map