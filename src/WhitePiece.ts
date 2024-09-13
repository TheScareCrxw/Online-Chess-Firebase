import ChessPiece from "./ChessPiece.js";
import { GameBoard } from "./Board.js";
import {
  MoveBishopCommand,
  MoveKingCommand,
  MoveKnightCommand,
  MovePawnCommand,
  MoveQueenCommand,
  MoveRookCommand,
} from "./Command.js";
import {Game} from "./Game.js";

/**
 * Abstract class representing a white chess piece.
 * Extends ChessPiece and defines common behavior for white pieces.
 * @abstract
 */
abstract class WhitePiece extends ChessPiece {
    /**
   * Constructs a white chess piece.
   * @param {number} x - The initial x-coordinate of the piece.
   * @param {number} y - The initial y-coordinate of the piece.
   * @param {boolean} firstMove - Indicates if it's the first move of the piece.
   */
  constructor(x: number, y: number, firstMove: boolean) {
    super(x, y, "black", GameBoard.gridSize, GameBoard.gridSize, firstMove);
    this._isPieceBlack = false;
  }
}

/**
 * Class representing a white pawn.
 * Extends WhitePiece and defines behavior specific to white pawns.
 */
class WhitePawn extends WhitePiece {
    /**
   * Constructs a white pawn.
   * @param {number} x - The initial x-coordinate of the pawn.
   * @param {number} y - The initial y-coordinate of the pawn.
   * @param {boolean} firstMove - Indicates if it's the first move of the pawn.
   */
  constructor(x: number, y: number, firstMove: boolean) {
    super(x, y, firstMove);
    this.img.src = `imgs/White_Pawn.png`;
    this.movementCommand = new MovePawnCommand(
      Game.instance.map.isPlayerBlack,
    );
    this.pieceType = "P";
  }

  public updateSelf(): void {}

  public getLegalMoves(): number[][] {
    this.movementCommand.execute(this.x, this.y);
    return this.movementCommand.getAllLegalMoves();
  }
}

/**
 * Class representing a white king.
 * Extends WhitePiece and defines behavior specific to the white king.
 */
class WhiteKing extends WhitePiece {
    /**
   * Constructs a white king.
   * @param {number} x - The initial x-coordinate of the king.
   * @param {number} y - The initial y-coordinate of the king.
   * @param {boolean} firstMove - Indicates if it's the first move of the king.
   */
  constructor(x: number, y: number, firstMove: boolean) {
    super(x, y, firstMove);
    this.img.src = `imgs/White_King.png`;
    this.movementCommand = new MoveKingCommand();
    this.pieceType = "K";
  }

  public updateSelf(): void {}

  public getLegalMoves(): number[][] {
    this.movementCommand.execute(this.x, this.y);
    return this.movementCommand.getAllLegalMoves();
  }
}

/**
 * Class representing a white queen.
 * Extends WhitePiece and defines behavior specific to the white queen.
 */
class WhiteQueen extends WhitePiece {
    /**
   * Constructs a white queen.
   * @param {number} x - The initial x-coordinate of the queen.
   * @param {number} y - The initial y-coordinate of the queen.
   * @param {boolean} firstMove - Indicates if it's the first move of the queen.
   */
  constructor(x: number, y: number, firstMove: boolean) {
    super(x, y, firstMove);
    this.img.src = `imgs/White_Queen.png`;
    this.movementCommand = new MoveQueenCommand();
    this.pieceType = "Q";
  }

  public updateSelf(): void {}

  public getLegalMoves(): number[][] {
    this.movementCommand.execute(this.x, this.y);
    return this.movementCommand.getAllLegalMoves();
  }
}

/**
 * Class representing a white knight.
 * Extends WhitePiece and defines behavior specific to the white knight.
 */
class WhiteKnight extends WhitePiece {
    /**
   * Constructs a white knight.
   * @param {number} x - The initial x-coordinate of the knight.
   * @param {number} y - The initial y-coordinate of the knight.
   * @param {boolean} firstMove - Indicates if it's the first move of the knight.
   */
  constructor(x: number, y: number, firstMove: boolean) {
    super(x, y, firstMove);
    this.img.src = `imgs/White_Knight.png`;
    this.movementCommand = new MoveKnightCommand();
    this.pieceType = "N";
  }

  public updateSelf(): void {}

  public getLegalMoves(): number[][] {
    this.movementCommand.execute(this.x, this.y);
    return this.movementCommand.getAllLegalMoves();
  }
}

/**
 * Class representing a white rook.
 * Extends WhitePiece and defines behavior specific to the white rook.
 */
class WhiteRook extends WhitePiece {
    /**
   * Constructs a white rook.
   * @param {number} x - The initial x-coordinate of the rook.
   * @param {number} y - The initial y-coordinate of the rook.
   * @param {boolean} firstMove - Indicates if it's the first move of the rook.
   */
  constructor(x: number, y: number, firstMove: boolean) {
    super(x, y, firstMove);
    this.img.src = `imgs/White_Rook.png`;
    this.movementCommand = new MoveRookCommand();
    this.pieceType = "R";
  }

  public updateSelf(): void {}

  public getLegalMoves(): number[][] {
    this.movementCommand.execute(this.x, this.y);
    return this.movementCommand.getAllLegalMoves();
  }
}

/**
 * Class representing a white bishop.
 * Extends WhitePiece and defines behavior specific to the white bishop.
 */
class WhiteBishop extends WhitePiece {
    /**
   * Constructs a white bishop.
   * @param {number} x - The initial x-coordinate of the bishop.
   * @param {number} y - The initial y-coordinate of the bishop.
   * @param {boolean} firstMove - Indicates if it's the first move of the bishop.
   */
  constructor(x: number, y: number, firstMove: boolean) {
    super(x, y, firstMove);
    this.img.src = `imgs/White_Bishop.png`;
    this.movementCommand = new MoveBishopCommand();
    this.pieceType = "B";
  }

  public updateSelf(): void {}

  public getLegalMoves(): number[][] {
    this.movementCommand.execute(this.x, this.y);
    return this.movementCommand.getAllLegalMoves();
  }
}

export {
  WhitePiece,
  WhitePawn,
  WhiteKing,
  WhiteKnight,
  WhiteRook,
  WhiteBishop,
  WhiteQueen,
};
