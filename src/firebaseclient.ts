import { firebaseConfig } from "./config.js";
//@ts-ignore Import module
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
//@ts-ignore Import
import { getDatabase, ref, update, onValue, set, get, onDisconnect, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

class FirebaseClient {
  private static _instance: FirebaseClient;
  private app = initializeApp(firebaseConfig);
  private _db = getDatabase(this.app);

  private constructor() {}

  public static get instance(): FirebaseClient {
    if (!FirebaseClient._instance) {
      FirebaseClient._instance = new FirebaseClient();
    }

    return FirebaseClient._instance;
  }

  public get db() {
    return this._db;
  }


  // Allows the player to join a room
  public async joinRoom(roomId: string, playerId: string) {
    const roomRef = ref(this._db, `rooms/${roomId}`);
    const snapshot = await get(roomRef);
    let playerColor;
  
    // Check if the room already has two players
    if (snapshot.exists()) {
      const players = snapshot.val().players;
      if (players && Object.keys(players).length >= 2) {
        throw new Error("Room is full");
      }
    }
  
    if (!snapshot.exists()) {
      playerColor = 'black';
      await set(roomRef, {
        blackPieces: [],
        whitePieces: [],
        map: [],
        isPlayerBlackTurn: true,
        players: {
          [playerId]: { color: playerColor }
        }
      });
    } else {
      const players = snapshot.val().players;
      if (!players) {
        playerColor = 'black';
      } else if (Object.keys(players).length === 1) {
        playerColor = players[Object.keys(players)[0]].color === 'black' ? 'white' : 'black';
      }
      // Ensure the player is added to the room only if it's not full
      await update(roomRef, {
        [`players/${playerId}`]: { color: playerColor }
      });
    }
  
    // Set up onDisconnect to remove the player and room if the player leaves
    const playerRef = ref(this._db, `rooms/${roomId}/players/${playerId}`);
    onDisconnect(playerRef).remove().then(() => {
      console.log(`${playerId} onDisconnect set up successfully.`);
    }).catch(error => {
      console.error("Error setting up onDisconnect:", error);
    });
  
    this.checkAndRemoveRoom(roomId);
  
    return playerColor;
  
  }
  private async checkRoomFull(roomId: string) {
    const roomRef = ref(this._db, `rooms/${roomId}`);
    return new Promise((resolve, reject) => {
      onValue(roomRef, (snapshot) => {
        const players = snapshot.val()?.players;
        if (Object.keys(players).length === 2) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, (error) => {
        reject(error);
      });
    });
  }
  


  private async checkAndRemoveRoom(roomId: string) {
    const roomRef = ref(this._db, `rooms/${roomId}`);
    onValue(roomRef, (snapshot) => {
      const players = snapshot.val()?.players;
      if (!players || Object.keys(players).length === 0) {
        remove(roomRef).then(() => {
          console.log(`Room ${roomId} removed successfully.`);
        }).catch((error) => {
          console.error(`Error removing room ${roomId}:`, error);
        });
      }
    });
  }

  public listenForGameUpdates(roomId: string, callback: (data: any) => void) {
    const roomRef = ref(this._db, `rooms/${roomId}`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  }

  public async updateGameState(roomId: string, gameState: any) {
    const roomRef = ref(this._db, `rooms/${roomId}`);
    await update(roomRef, gameState);
  }
}

export { FirebaseClient };
