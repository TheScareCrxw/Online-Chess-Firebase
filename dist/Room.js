// class Room {
//     static roomCounter = 0;
//     roomCode: string;
//     password: string;
//     maxParticipants = 2;
//     participants: { name: string, color: string }[];
//     assignedColors: string[] = ['white', 'black'];
//     boardState: any; // Store the state of the chess board
//     constructor() {
//         Room.roomCounter++;
//         this.roomCode = `ROOM${Room.roomCounter}`;
//         this.password = this.generatePassword();
//         this.participants = [];
//         this.boardState = this.initializeBoard(); // Initialize the board state
//         console.log(`Room created: ${this.roomCode} with password: ${this.password}`);
//     }
//     getRoomCode() {
//         return this.roomCode;
//     }
//     getPassword() {
//         return this.password;
//     }
//     addParticipant(participant: string, enteredPassword: string) {
//         console.log(`Attempt to add participant with password: ${enteredPassword}`);
//         if (this.participants.length < this.maxParticipants && enteredPassword === this.password) {
//             const color = this.participants.length === 0
//                 ? this.assignedColors[Math.floor(Math.random() * 2)]
//                 : this.assignedColors.find(c => c !== this.participants[0].color);
//             this.participants.push({ name: participant, color: color });
//             console.log(`Participant added: ${participant}, assigned color: ${color}`);
//             return true;
//         }
//         console.log(`Failed to add participant: ${participant}, incorrect password or room full`);
//         return false;
//     }
//     removeParticipant(participant: string) {
//         const index = this.participants.findIndex(p => p.name === participant);
//         if (index !== -1) {
//             this.participants.splice(index, 1);
//             console.log(`Participant removed: ${participant}`);
//             console.log(`Participants left in the room: ${this.participants.length}/${this.maxParticipants}`);
//         }
//     }
//     getParticipantCount() {
//         return this.participants.length;
//     }
//     getMaxParticipants() {
//         return this.maxParticipants;
//     }
//     generatePassword() {
//         return Math.floor(100000000 + Math.random() * 900000000).toString(); // 9-digit password
//     }
//     initializeBoard() {
//         // Initialize the chess board state, return the initial state
//         // Placeholder: Replace with actual board initialization logic
//         return {};
//     }
//     resetBoard() {
//         this.boardState = this.initializeBoard(); // Reset to the initial state
//     }
//     getBoardState() {
//         return this.boardState;
//     }
//     setBoardState(state: any) {
//         this.boardState = state;
//     }
// }
// class RoomManager {
//     rooms: { [key: string]: Room };
//     roomDisplay: HTMLElement | null;
//     roomManagement: HTMLElement | null;
//     passwordDisplay: HTMLElement | null;
//     createRoomButton: HTMLElement | null;
//     joinRoomButton: HTMLElement | null;
//     resignButton: HTMLElement | null;
//     currentParticipantId: number;
//     constructor() {
//         this.rooms = {};
//         this.roomDisplay = document.getElementById('roomDisplay');
//         this.roomManagement = document.getElementById('room-management');
//         this.passwordDisplay = document.getElementById('passwordDisplay');
//         this.createRoomButton = document.getElementById('createRoomButton');
//         this.joinRoomButton = document.getElementById('joinRoomButton');
//         this.resignButton = document.getElementById('resignButton');
//         this.currentParticipantId = 0;
//     }
//     createRoom() {
//         const newRoom = new Room();
//         this.rooms[newRoom.getPassword()] = newRoom; // Use password as key
//         const participant = `Participant${this.currentParticipantId + 1}`;
//         newRoom.addParticipant(participant, newRoom.getPassword());
//         this.currentParticipantId++;
//         this.showRoom(newRoom);
//         this.updatePasswordDisplay(newRoom.getPassword(), true); // Show password when room is created
//         this.hideCreateJoinButtons();
//         this.setupChessBoard(participant, newRoom, true); // Reset board on new room creation
//     }
//     joinRoom(enteredPassword: string, participant: string) {
//         console.log(`Attempting to join room with password: ${enteredPassword}`);
//         const room = this.rooms[enteredPassword]; // Look up room by password
//         if (room) {
//             if (room.addParticipant(participant, enteredPassword)) {
//                 this.currentParticipantId++;
//                 participant = `Participant${this.currentParticipantId}`;
//                 this.showJoinedRoom(room);
//                 this.updatePasswordDisplay(room.getPassword(), true); // Show password when room is joined
//                 this.hideCreateJoinButtons();
//                 this.setupChessBoard(participant, room, false); // Retain board state on joining room
//                 return true;
//             } else {
//                 console.log(`Failed to join room with password: ${enteredPassword}, incorrect password or room full`);
//                 this.roomDisplay.hidden = false;
//                 this.roomDisplay.innerHTML = `Failed to join room with password: ${enteredPassword} (incorrect password or room full)`;
//             }
//         } else {
//             console.log(`Room not found with password: ${enteredPassword}`);
//             this.roomDisplay.hidden = false;
//             this.roomDisplay.innerHTML = `Room not found with password: ${enteredPassword}`;
//         }
//         return false;
//     }
//     getRoom(roomPassword: string) {
//         return this.rooms[roomPassword];
//     }
//     showRoom(room: Room) {
//         this.roomManagement.hidden = true;
//         const participantsHTML = room.participants.map(p => `<p>${p.name} (${p.color})</p>`).join('');
//         this.roomDisplay.hidden = false;
//         this.roomDisplay.innerHTML = `
//             <h2>Room Created</h2>
//             <p>Room Code: ${room.getRoomCode()}</p>
//             <p>Participants: ${room.getParticipantCount()} / ${room.getMaxParticipants()}</p>
//             ${participantsHTML}
//         `;
//         this.resignButton.hidden = false;
//     }
//     showJoinedRoom(room: Room) {
//         this.roomManagement.hidden = true;
//         const participantsHTML = room.participants.map(p => `<p>${p.name} (${p.color})</p>`).join('');
//         this.roomDisplay.hidden = false;
//         this.roomDisplay.innerHTML = `
//             <h2>Joined Room</h2>
//             <p>Room Code: ${room.getRoomCode()}</p>
//             <p>Participants: ${room.getParticipantCount()} / ${room.getMaxParticipants()}</p>
//             ${participantsHTML}
//         `;
//         this.resignButton.hidden = false;
//     }
//     showChessBoard() {
//         const chessBoard = document.getElementById('chess-board');
//         chessBoard.hidden = false;
//     }
//     updatePasswordDisplay(password: string, show: boolean) {
//         const passwordText = document.getElementById('passwordText');
//         if (show) {
//             this.passwordDisplay.hidden = false;
//             if (passwordText) {
//                 passwordText.textContent = password;
//             }
//         } else {
//             this.passwordDisplay.hidden = true;
//             if (passwordText) {
//                 passwordText.textContent = '';
//             }
//         }
//     }
//     resetUI() {
//         if (this.currentParticipantId > 0) {
//             // Find the room the participant was in and remove them
//             for (const roomPassword in this.rooms) {
//                 const room = this.rooms[roomPassword];
//                 room.removeParticipant(`Participant${this.currentParticipantId}`);
//             }
//             this.currentParticipantId = 0;
//         }
//         this.roomManagement.hidden = false;
//         this.roomDisplay.hidden = true;
//         this.updatePasswordDisplay('', false); // Hide password display on homepage
//         const chessBoard = document.getElementById('chess-board');
//         chessBoard.hidden = true;
//         this.resignButton.hidden = true;
//         this.showCreateJoinButtons();
//     }
//     hideCreateJoinButtons() {
//         this.createRoomButton.hidden = true;
//         this.joinRoomButton.hidden = true;
//     }
//     showCreateJoinButtons() {
//         this.createRoomButton.hidden = false;
//         this.joinRoomButton.hidden = false;
//     }
//     setupChessBoard(participant: string, room: Room, reset: boolean) {
//         this.showChessBoard();
//         const chessBoard = document.getElementById('chess-board');
//         // Initialize or update the chess board with proper settings for participants and their colors
//         const participantInfo = room.participants.find(p => p.name === participant);
//         if (participantInfo) {
//             console.log(`Setting up chess board for ${participant} with color ${participantInfo.color}`);
//             if (reset) {
//                 // Reset the board for new room creation
//                 room.resetBoard();
//             }
//             // Setup the board based on room's current state
//             // Placeholder: Replace with actual board setup logic using room.boardState
//             // For example: chessBoard.initialize(room.getBoardState());
//         }
//     }
// }
// class App {
//     roomManager: RoomManager;
//     constructor() {
//         this.roomManager = new RoomManager();
//         this.setupEventListeners();
//     }
//     setupEventListeners() {
//         const createRoomButton = document.getElementById('createRoomButton');
//         const joinRoomButton = document.getElementById('joinRoomButton');
//         const resignButton = document.getElementById('resignButton');
//         const chessBoard = document.getElementById('chess-board');
//         chessBoard.hidden = true;
//         createRoomButton.addEventListener('click', () => {
//             this.roomManager.createRoom();
//         });
//         joinRoomButton.addEventListener('click', () => {
//             const enteredPassword = prompt('Enter the room password:');
//             const participant = `Participant${this.roomManager.currentParticipantId + 1}`; // Incremental participant ID
//             if (enteredPassword === null) {
//                 return; // If user cancels prompt, do nothing
//             }
//             if (this.roomManager.joinRoom(enteredPassword, participant)) {
//                 // Room joined successfully, hide other elements and show room details
//                 this.roomManager.showJoinedRoom(this.roomManager.getRoom(enteredPassword));
//             }
//         });
//         resignButton.addEventListener('click', () => {
//             this.roomManager.resetUI();
//         });
//     }
// }
// new App();
//# sourceMappingURL=Room.js.map