import { GameBoard } from "./Board.js";
import { MoveBishopCommand, MoveKingCommand, MoveKnightCommand, MovePawnCommand, MoveQueenCommand, MoveRookCommand, } from "./Command.js";
import { Game } from "./Game.js";
import ChessPiece from "./ChessPiece.js";
/**
 * Abstract class representing a black chess piece.
 * @abstract
 * @extends ChessPiece
 */
class BlackPiece extends ChessPiece {
    /**
   * Creates an instance of BlackPiece.
   * @param {number} x - The x-coordinate of the piece.
   * @param {number} y - The y-coordinate of the piece.
   * @param {boolean} firstMove - Indicates if it is the piece's first move.
   */
    constructor(x, y, firstMove) {
        super(x, y, "black", GameBoard.gridSize, GameBoard.gridSize, firstMove);
        this._isPieceBlack = true;
    }
}
/**
 * Class representing a black pawn.
 * @extends BlackPiece
 */
class BlackPawn extends BlackPiece {
    /**
   * Creates an instance of BlackPawn.
   * @param {number} x - The x-coordinate of the pawn.
   * @param {number} y - The y-coordinate of the pawn.
   * @param {boolean} firstMove - Indicates if it is the pawn's first move.
   */
    constructor(x, y, firstMove) {
        super(x, y, firstMove);
        this.img.src = `imgs/Black_Pawn.png`;
        this.movementCommand = new MovePawnCommand(!Game.instance.map.isPlayerBlack);
        this.pieceType = "p";
    }
    updateSelf() { }
    getLegalMoves() {
        this.movementCommand.execute(this.x, this.y);
        return this.movementCommand.getAllLegalMoves();
    }
}
class BlackKing extends BlackPiece {
    /**
   * Creates an instance of BlackKing.
   * @param {number} x - The x-coordinate of the king.
   * @param {number} y - The y-coordinate of the king.
   * @param {boolean} firstMove - Indicates if it is the king's first move.
   */
    constructor(x, y, firstMove) {
        super(x, y, firstMove);
        this.img.src = `imgs/Black_King.png`;
        this.movementCommand = new MoveKingCommand();
        this.pieceType = "k";
    }
    updateSelf() { }
    getLegalMoves() {
        this.movementCommand.execute(this.x, this.y);
        return this.movementCommand.getAllLegalMoves();
    }
}
class BlackQueen extends BlackPiece {
    /**
   * Creates an instance of BlackQueen.
   * @param {number} x - The x-coordinate of the queen.
   * @param {number} y - The y-coordinate of the queen.
   * @param {boolean} firstMove - Indicates if it is the queen's first move.
   */
    constructor(x, y, firstMove) {
        super(x, y, firstMove);
        this.img.src = `imgs/Black_Queen.png`;
        this.movementCommand = new MoveQueenCommand();
        this.pieceType = "q";
    }
    updateSelf() { }
    getLegalMoves() {
        this.movementCommand.execute(this.x, this.y);
        return this.movementCommand.getAllLegalMoves();
    }
}
class BlackKnight extends BlackPiece {
    /**
   * Creates an instance of BlackKnight.
   * @param {number} x - The x-coordinate of the knight.
   * @param {number} y - The y-coordinate of the knight.
   * @param {boolean} firstMove - Indicates if it is the knight's first move.
   */
    constructor(x, y, firstMove) {
        super(x, y, firstMove);
        this.img.src = `imgs/Black_Knight.png`;
        this.movementCommand = new MoveKnightCommand();
        this.pieceType = "n";
    }
    updateSelf() { }
    getLegalMoves() {
        this.movementCommand.execute(this.x, this.y);
        return this.movementCommand.getAllLegalMoves();
    }
}
class BlackRook extends BlackPiece {
    /**
   * Creates an instance of BlackRook.
   * @param {number} x - The x-coordinate of the rook.
   * @param {number} y - The y-coordinate of the rook.
   * @param {boolean} firstMove - Indicates if it is the rook's first move.
   */
    constructor(x, y, firstMove) {
        super(x, y, firstMove);
        this.img.src = `imgs/Black_Rook.png`;
        this.movementCommand = new MoveRookCommand();
        this.pieceType = "r";
    }
    updateSelf() { }
    getLegalMoves() {
        this.movementCommand.execute(this.x, this.y);
        return this.movementCommand.getAllLegalMoves();
    }
}
class BlackBishop extends BlackPiece {
    /**
   * Creates an instance of BlackBishop.
   * @param {number} x - The x-coordinate of the bishop.
   * @param {number} y - The y-coordinate of the bishop.
   * @param {boolean} firstMove - Indicates if it is the bishop's first move.
   */
    constructor(x, y, firstMove) {
        super(x, y, firstMove);
        this.img.src = `imgs/Black_Bishop.png`;
        this.movementCommand = new MoveBishopCommand();
        this.pieceType = "b";
    }
    updateSelf() { }
    getLegalMoves() {
        this.movementCommand.execute(this.x, this.y);
        return this.movementCommand.getAllLegalMoves();
    }
}
export { BlackPiece, BlackPawn, BlackBishop, BlackKing, BlackQueen, BlackKnight, BlackRook, };
//# sourceMappingURL=BlackPiece.js.map