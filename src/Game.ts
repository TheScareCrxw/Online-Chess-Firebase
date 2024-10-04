import { BlackPiece, BlackPawn } from "./BlackPiece.js";
import { GameBoard } from "./Board.js";
import PlayerControl from "./PlayerController.js";
import { WhitePiece, WhitePawn } from "./WhitePiece.js";
import { WhitePieceFactory, BlackPieceFactory } from "./PieceFactory.js";
import { Pieces } from "./Board.js";
import { FirebaseClient } from "./firebaseclient.js";
import {
  ref,
  get
  //@ts-ignore Import module
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

class Game {
  private static _instance: Game | undefined;
  public map: GameBoard;
  public blackPiecesOnTheBoard: BlackPiece[] = [];
  public whitePiecesOnTheBoard: WhitePiece[] = [];
  public playerControl: PlayerControl;
  public isPlayerBlack: boolean;
  public roomId: string;

   // Initial configuration of the board for black pieces
  readonly BLACK_GRID: string[][] = [
    ["R", "N", "B", "K", "Q", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "k", "q", "b", "n", "r"],
  ];

   // Initial configuration of the board for white pieces
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

  public static get instance(): Game {
    if (Game._instance === undefined) {
      Game._instance = new Game();
    }
    return Game._instance;
  }

    /**
   * Starts the game with the specified configuration.
   * @param {boolean} isPlayerBlack - Indicates if the player controls black pieces.
   * @param {string} roomId - The room identifier for the game session.
   * @returns {Promise<void>}
   */
  public async start(isPlayerBlack: boolean, roomId: string): Promise<void> {
    this.isPlayerBlack = isPlayerBlack;
    this.roomId = roomId;
    const roomRef = ref(FirebaseClient.instance.db, `/rooms/${roomId}`);
    const snapshot = await get(roomRef);

    if (snapshot.exists()) {
      this.map = new GameBoard(isPlayerBlack);
      this.map.playGame();
      this.drawAll();
      this.playerControl = new PlayerControl();
      console.log("Game started.");
    } else {
      console.error("Room ID does not exist. Cannot join game.");
      alert("Room ID does not exist. Please check the room ID and try again.");
    }
  }

  public drawAll() {
    for (let i = 0; i < this.blackPiecesOnTheBoard.length; i++) {
      this.blackPiecesOnTheBoard[i].draw();
    }
    for (let i = 0; i < this.whitePiecesOnTheBoard.length; i++) {
      this.whitePiecesOnTheBoard[i].draw();
    }
  }

  public noMoreEnPassant() {
    for (let i = 0; i < this.whitePiecesOnTheBoard.length; i++) {
      if (this.whitePiecesOnTheBoard[i] instanceof WhitePawn) {
        this.whitePiecesOnTheBoard[i].enPassantAvailable = false;
      }
    }
    for (let i = 0; i < this.blackPiecesOnTheBoard.length; i++) {
      if (this.blackPiecesOnTheBoard[i] instanceof BlackPawn) {
        this.blackPiecesOnTheBoard[i].enPassantAvailable = false;
      }
    }
  }

    /**
   * Updates the local game state based on received data.
   * @param {any} data - The data containing updated game state information.
   */
  public updateLocalGameState(data: any) {
    try {
      console.log("Received data for updating local game state:", data);
  
      if (!data || !data.blackPieces || !data.whitePieces || !data.map) {
        throw new Error("Invalid data format");
      }
  
      // Remove captured pieces
      this.blackPiecesOnTheBoard = this.blackPiecesOnTheBoard.filter(piece =>
        data.blackPieces.some((p: any) => p.x === piece.x && p.y === piece.y)
      );
  
      this.whitePiecesOnTheBoard = this.whitePiecesOnTheBoard.filter(piece =>
        data.whitePieces.some((p: any) => p.x === piece.x && p.y === piece.y)
      );
  
      // Update pieces on the board
      this.blackPiecesOnTheBoard = data.blackPieces.map((pieceData: any) => {
        const newY = 630 - pieceData.y;
        console.log(pieceData)
        return BlackPieceFactory.make(pieceData.pieceType as Pieces, pieceData.x, newY, pieceData.firstMove);
      });
  
      this.whitePiecesOnTheBoard = data.whitePieces.map((pieceData: any) => {
        const newY = 630 - pieceData.y;
        console.log(pieceData)
        return WhitePieceFactory.make(pieceData.pieceType as Pieces, pieceData.x, newY, pieceData.firstMove);
      });
  
  
      // Toggle turn
      this.playerControl.isMyTurn = !data.isPlayerBlackTurn;
  
      // Redraw the board
      this.map.drawMap();
      this.drawAll();
    } catch (error) {
      console.error("Error updating local game state:", error);
    }
  }
}

export { Game };
