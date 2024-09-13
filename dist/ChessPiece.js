import { RectangularGameObject } from "./GameObject.js";
import { Pieces } from "./Board.js";
import { Canvas } from "./Canvas.js";
class ChessPiece extends RectangularGameObject {
    img = new Image();
    //@ts-ignore
    movementCommand;
    //@ts-ignore
    _pieceType;
    //@ts-ignore
    _isPieceBlack;
    get isPieceBlack() {
        return this._isPieceBlack;
    }
    // abstract getLegalMoves(): number[][];
    /** @type {boolean} Indicates if it is the first move for the piece. */
    firstMove = true;
    /** @type {boolean} Indicates if en passant is available for the piece. */
    enPassantAvailable = false;
    drawSelf() {
        if (this.img.complete) {
            this.drawImage();
        }
        else {
            this.img.onload = () => {
                this.drawImage();
            };
        }
    }
    drawImage() {
        Canvas.instance.context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    checkTileLocation(x, y) {
        return (this._x <= x &&
            this._x + this._width > x &&
            this._y <= y &&
            this._y + this._height > y);
    }
    get pieceType() {
        return this._pieceType;
    }
    /**
    * Sets the type of the chess piece.
    * @param {string} piece - The type of the piece.
    */
    set pieceType(piece) {
        if (Object.values(Pieces).includes(piece.toLowerCase())) {
            this._pieceType = piece;
        }
        else {
            this._pieceType = Pieces.EMPTY;
        }
    }
    /**
   * Converts the chess piece to a plain object representation.
   * @returns {Object} The object representation of the chess piece.
   */
    toObject() {
        console.log(this.firstMove);
        return {
            x: this.x,
            y: this.y,
            pieceType: this.pieceType,
            firstMove: this.firstMove,
        };
    }
}
export default ChessPiece;
//# sourceMappingURL=ChessPiece.js.map