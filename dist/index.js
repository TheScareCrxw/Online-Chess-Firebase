import { Canvas } from "./Canvas.js";
import { Game } from "./Game.js";
import { FirebaseClient } from "./firebaseclient.js";
//@ts-ignore Import module
import { ref, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
class Driver {
    roomId;
    playerId = Math.random().toString(36).substr(2, 9); // Generate a random player ID
    constructor() {
        this.setupEventListeners();
    }
    setupEventListeners() {
        const createRoomButton = document.getElementById("create-room");
        const joinRoomButton = document.getElementById("join-room");
        const leaveRoomButton = document.getElementById("leave-room");
        createRoomButton.addEventListener("click", () => this.createRoom());
        joinRoomButton.addEventListener("click", () => this.joinRoom());
        leaveRoomButton.addEventListener("click", () => this.leaveRoom()); // Event listener for Leave Room button
        // Set up window unload event to handle disconnection
        window.addEventListener("beforeunload", () => this.leaveRoom());
    }
    // Allows user to create a new room
    createRoom() {
        this.roomId = Math.random().toString(36).substr(2, 9); // Generate a random room ID
        this.joinRoomAndStart(this.roomId, this.playerId, true);
        alert(`Room created with password: ${this.roomId}`);
        this.showGameControls(); // Show game controls after creating/joining room
    }
    // Allows user to join an existing room
    joinRoom() {
        const roomPasswordInput = document.getElementById("room-password");
        const roomId = roomPasswordInput.value;
        if (roomId) {
            this.roomId = roomId;
            this.joinRoomAndStart(this.roomId, this.playerId, false);
            this.showGameControls(); // Show game controls after creating/joining room
        }
        else {
            alert("Please enter a room password.");
        }
    }
    // Allows the player to join a room
    async joinRoomAndStart(roomId, playerId, isCreating) {
        try {
            const color = await FirebaseClient.instance.joinRoom(roomId, playerId);
            Canvas.instance.startGame(color === 'black', roomId);
            this.listenForGameUpdates();
        }
        catch (error) {
            if (isCreating) {
                alert("Failed to create room. Please try again.");
            }
            else {
                if (error.message === "Room is full") {
                    alert("Room is full. Please join another room or create a new one.");
                }
                else {
                    alert("Failed to join room. Please check the password and try again.");
                }
            }
            console.error(error);
        }
    }
    // Allows the player to leave the room
    async leaveRoom() {
        const roomId = this.roomId;
        const playerId = this.playerId;
        if (roomId && playerId) {
            const playerRef = ref(FirebaseClient.instance.db, `rooms/${roomId}/players/${playerId}`);
            await remove(playerRef);
            console.log(`${playerId} removed from room ${roomId}`);
            this.hideGameControls(); // Hide game controls after leaving room
        }
    }
    // Helper function to show game controls and hide join/create room buttons
    showGameControls() {
        document.getElementById('chess-board').style.display = 'block';
        document.getElementById('create-room').style.display = 'none';
        document.getElementById('room-password').style.display = 'none';
        document.getElementById('join-room').style.display = 'none';
        document.getElementById('leave-room').style.display = 'inline-block'; // Show Leave Room button
    }
    // Helper function to hide game controls and show join/create room buttons
    hideGameControls() {
        document.getElementById('chess-board').style.display = 'none';
        document.getElementById('create-room').style.display = 'inline-block';
        document.getElementById('room-password').style.display = 'inline-block';
        document.getElementById('join-room').style.display = 'inline-block';
        document.getElementById('leave-room').style.display = 'none'; // Hide Leave Room button
    }
    listenForGameUpdates() {
        FirebaseClient.instance.listenForGameUpdates(this.roomId, (data) => {
            Game.instance.updateLocalGameState(data);
        });
    }
}
new Driver();
//@ts-ignore
window.Game = Game;
//# sourceMappingURL=index.js.map