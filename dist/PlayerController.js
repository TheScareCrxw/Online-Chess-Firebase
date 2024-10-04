import { GameBoard, Pieces } from "./Board.js";
import { Canvas } from "./Canvas.js";
import { Game } from "./Game.js";
import { BlackPieceFactory, WhitePieceFactory } from "./PieceFactory.js";
import { HandleMouseClickCommand, UpdatePositionToFirebaseCommand } from "./Command.js";
//Class representing player control logic for the chess game.
class PlayerControl {
    selectedPiece;
    mousePositionX = 0;
    mousePositionY = 0;
    mouseClickCommand;
    isMovingPiece = false;
    possibleTiles;
    blackToMove = false;
    enPassant = [];
    isMyTurn = !Game.instance.map.isPlayerBlack;
    constructor() {
        this.mouseClickCommand = new MainGameMouseClickedEventHandlerCommand(this);
        this.setupEventListeners();
    }
    setupEventListeners() {
        const canvas = Canvas.instance.screen;
        canvas.addEventListener("mouseup", (event) => this.handleMouseClickEvent(event));
    }
    /**
   * Assigns a new mouse click command.
   * @param {HandleMouseClickCommand} c - The command to assign.
   */
    assignMouseClickCommand(c) {
        console.log("assigning mouse click command");
        this.mouseClickCommand = c;
    }
    /**
   * Handles mouse click event on the canvas.
   * @param {MouseEvent} event - The mouse event object.
   */
    handleMouseClickEvent(event) {
        const MOUSE_X = event.clientX;
        const MOUSE_Y = event.clientY;
        const BoundingRect = Canvas.instance.screen.getBoundingClientRect();
        const CANVAS_X = BoundingRect.x;
        const CANVAS_Y = BoundingRect.y;
        const MOUSE_POSITION_X = MOUSE_X - CANVAS_X;
        const MOUSE_POSITION_Y = MOUSE_Y - CANVAS_Y;
        this.mousePositionX = MOUSE_POSITION_X;
        this.mousePositionY = MOUSE_POSITION_Y;
        if (this.mousePositionY < Canvas.HEIGHT &&
            this.mousePositionX < Canvas.WIDTH &&
            this.mousePositionX >= 0 &&
            this.mousePositionY >= 0) {
            if (this.mouseClickCommand === undefined) {
                throw new Error("no on click command assigned");
            }
            else {
                this.mouseClickCommand
                    .assignCoordinates(this.mousePositionX, this.mousePositionY)
                    .execute(this.mousePositionX, this.mousePositionY);
            }
        }
    }
    resetMoves() {
        this.selectedPiece = undefined;
        Canvas.clearScreen();
        Game.instance.map.drawMap();
        Game.instance.drawAll();
    }
    toggleMovingState() {
        this.isMovingPiece = !this.isMovingPiece;
    }
    toggleBlackToMove() {
        this.blackToMove = !this.blackToMove;
    }
    toggleTurn() {
        this.isMyTurn = !this.isMyTurn;
    }
    /**
   * Handles mouse click interaction in the game.
   * @param {number} x - The x-coordinate of the click.
   * @param {number} y - The y-coordinate of the click.
   */
    handleMouseClick(x, y) {
        if (this.isMyTurn) {
            if (!this.isMovingPiece) {
                this.resetMoves();
                this.selectedPiece = this.choosePiece(x, y);
                // console.log(this.selectedPiece)
                if (this.selectedPiece === undefined)
                    return;
                console.log(this.selectedPiece);
                this.toggleMovingState();
                // console.log(this.selectedPiece)
                this.showMoves();
            }
            else {
                this.movePiece(x, y);
                this.toggleMovingState();
                if (this.selectedPiece.movementCommand.isGameOver(this.blackToMove))
                    console.log("GAME OVER");
                // console.log(this.selectedPiece)
                this.resetMoves();
            }
        }
    }
    /**
    * Chooses the chess piece based on the mouse click coordinates.
    * @param {number} x - The x-coordinate of the click.
    * @param {number} y - The y-coordinate of the click.
    * @returns {ChessPiece} The selected chess piece.
    */
    choosePiece(x, y) {
        if (Game.instance.isPlayerBlack) {
            for (let i = 0; i < Game.instance.blackPiecesOnTheBoard.length; i++) {
                if (Game.instance.blackPiecesOnTheBoard[i].checkTileLocation(x, y)) {
                    console.log("black");
                    return Game.instance.blackPiecesOnTheBoard[i];
                }
            }
        }
        else {
            for (let i = 0; i < Game.instance.whitePiecesOnTheBoard.length; i++) {
                if (Game.instance.whitePiecesOnTheBoard[i].checkTileLocation(x, y)) {
                    console.log("white");
                    return Game.instance.whitePiecesOnTheBoard[i];
                }
            }
        }
    }
    /**
   * Moves the selected piece to the specified coordinates.
   * @param {number} x - The x-coordinate of the destination.
   * @param {number} y - The y-coordinate of the destination.
   */
    movePiece(x, y) {
        for (let i = 0; i < this.possibleTiles.length; i++) {
            const MOVEABLE_X = this.possibleTiles[i][0];
            const MOVEABLE_Y = this.possibleTiles[i][1];
            if (MOVEABLE_X * GameBoard.gridSize < x &&
                (MOVEABLE_X + 1) * GameBoard.gridSize > x &&
                MOVEABLE_Y * GameBoard.gridSize < y &&
                (MOVEABLE_Y + 1) * GameBoard.gridSize > y) {
                const MOVEABLE_X_COORD = MOVEABLE_X * GameBoard.gridSize;
                const MOVEABLE_Y_COORD = MOVEABLE_Y * GameBoard.gridSize;
                const PREVIOUS_X = Math.floor(this.selectedPiece.x / GameBoard.gridSize);
                const PREVIOUS_Y = Math.floor(this.selectedPiece.y / GameBoard.gridSize);
                console.log(Math.abs(MOVEABLE_Y - PREVIOUS_Y));
                Game.instance.noMoreEnPassant();
                if (this.selectedPiece.pieceType.toLowerCase() === Pieces.PAWN &&
                    Math.abs(MOVEABLE_Y - PREVIOUS_Y) === 2) {
                    this.selectedPiece.enPassantAvailable = true;
                }
                for (let i = 0; i < this.enPassant.length; i++) {
                    if (this.enPassant[i][0] === MOVEABLE_X &&
                        this.enPassant[i][1] === MOVEABLE_Y) {
                        console.log("ENPASSANT");
                        this.selectedPiece.movementCommand.enPassantUpdate(MOVEABLE_X, MOVEABLE_Y);
                        this.enPassant.length = 0;
                    }
                }
                if (Game.instance.map.gameMap[MOVEABLE_Y][MOVEABLE_X] !== Pieces.EMPTY) {
                    this.capturing(MOVEABLE_X_COORD, MOVEABLE_Y_COORD, Game.instance.isPlayerBlack);
                    console.log(this.blackToMove);
                }
                console.log(this.selectedPiece, this.selectedPiece.y);
                //if its a pawn
                if (this.selectedPiece.pieceType.toLowerCase() === Pieces.PAWN) {
                    if (this.selectedPiece.y === GameBoard.gridSize && // 2nd top row
                        this.selectedPiece.isPieceBlack === Game.instance.map.isPlayerBlack // same color as player
                    ) {
                        //change promotion by just changing last parameter variable
                        this.removeAndPromote(MOVEABLE_X_COORD, MOVEABLE_Y_COORD, this.selectedPiece.isPieceBlack, Pieces.QUEEN);
                    }
                    else if (this.selectedPiece.y ===
                        (Game.instance.map.ROWS - 2) * GameBoard.gridSize && // 2nd bottom row
                        this.selectedPiece.isPieceBlack !== Game.instance.map.isPlayerBlack // different color
                    ) {
                        this.removeAndPromote(MOVEABLE_X_COORD, MOVEABLE_Y_COORD, this.selectedPiece.isPieceBlack, Pieces.QUEEN);
                    }
                }
                Game.instance.map.gameMap[MOVEABLE_Y][MOVEABLE_X] = this.selectedPiece.pieceType;
                Game.instance.map.gameMap[PREVIOUS_Y][PREVIOUS_X] = Pieces.EMPTY;
                this.selectedPiece.x = MOVEABLE_X_COORD;
                this.selectedPiece.y = MOVEABLE_Y_COORD;
                this.selectedPiece.firstMove = false; // Set firstMove to false when the piece is moved
                // Update Firebase and toggle turn
                new UpdatePositionToFirebaseCommand(Game.instance.blackPiecesOnTheBoard, Game.instance.whitePiecesOnTheBoard, Game.instance.map.gameMap, Game.instance.roomId).execute();
                this.toggleTurn();
                break;
            }
        }
        this.possibleTiles.length = 0;
    }
    removeAndPromote(x, y, isPawnBlack, promoteTo) {
        if (!isPawnBlack) {
            for (let i = 0; i < Game.instance.whitePiecesOnTheBoard.length; i++) {
                if (Game.instance.whitePiecesOnTheBoard[i] === this.selectedPiece) {
                    console.log("pro");
                    const PROMOTED_PIECE = this.checkPromotionPiece(x, y, promoteTo, isPawnBlack);
                    Game.instance.whitePiecesOnTheBoard.splice(i, 1);
                    Game.instance.whitePiecesOnTheBoard.push(PROMOTED_PIECE);
                    this.selectedPiece = PROMOTED_PIECE;
                }
            }
        }
        else {
            for (let i = 0; i < Game.instance.blackPiecesOnTheBoard.length; i++) {
                if (Game.instance.blackPiecesOnTheBoard[i] === this.selectedPiece) {
                    console.log("pro");
                    const PROMOTED_PIECE = this.checkPromotionPiece(x, y, promoteTo, isPawnBlack);
                    Game.instance.blackPiecesOnTheBoard.splice(i, 1);
                    Game.instance.blackPiecesOnTheBoard.push(PROMOTED_PIECE);
                    this.selectedPiece = PROMOTED_PIECE;
                }
            }
        }
    }
    checkPromotionPiece(x, y, promoteTo, isBlack) {
        if (isBlack)
            return BlackPieceFactory.make(promoteTo, x, y, false);
        return WhitePieceFactory.make(promoteTo.toLowerCase(), x, y, false);
    }
    /**
   * Handles capturing of opponent's pieces.
   * @param {number} x - The x-coordinate of the captured piece.
   * @param {number} y - The y-coordinate of the captured piece.
   * @param {boolean} capturingWhitePiece - Indicates if the capturing piece is white.
   */
    capturing(x, y, capturingWhitePiece) {
        console.log("cap");
        if (capturingWhitePiece) {
            for (let i = 0; i < Game.instance.whitePiecesOnTheBoard.length; i++) {
                console.log(Game.instance.whitePiecesOnTheBoard[i].checkTileLocation(x, y));
                if (Game.instance.whitePiecesOnTheBoard[i].checkTileLocation(x, y)) {
                    console.log(Game.instance.whitePiecesOnTheBoard[i]);
                    Game.instance.whitePiecesOnTheBoard.splice(i, 1);
                    return;
                }
            }
        }
        else {
            for (let i = 0; i < Game.instance.blackPiecesOnTheBoard.length; i++) {
                console.log(Game.instance.blackPiecesOnTheBoard[i].checkTileLocation(x, y));
                if (Game.instance.blackPiecesOnTheBoard[i].checkTileLocation(x, y)) {
                    console.log(Game.instance.blackPiecesOnTheBoard[i]);
                    Game.instance.blackPiecesOnTheBoard.splice(i, 1);
                    return;
                }
            }
        }
    }
    showMoves() {
        console.log(this.possibleTiles);
        console.log(this.selectedPiece);
        this.selectedPiece.movementCommand.execute(this.selectedPiece.x, this.selectedPiece.y);
    }
}
class MainGameMouseClickedEventHandlerCommand extends HandleMouseClickCommand {
    playerControl;
    constructor(playerControl) {
        super();
        this.playerControl = playerControl;
    }
    execute() {
        this.playerControl.handleMouseClick(this.mousePositionX, this.mousePositionY);
    }
}
export default PlayerControl;
//# sourceMappingURL=PlayerController.js.map