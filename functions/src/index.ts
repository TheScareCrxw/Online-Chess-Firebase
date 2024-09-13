import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import QueueManager from "../../src/QueueManager"; // Adjusted path to point to the root src folder
import GameManager from "../../src/GameManager"; // Adjusted path to point to the root src folder

admin.initializeApp();

export const joinQueue = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    console.error("Request not authenticated");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Request not authenticated"
    );
  }

  const userId = context.auth.uid;
  const queueManager = new QueueManager();
  const gameManager = new GameManager();

  try {
    console.log("Adding player to queue:", userId);
    // Add player to queue
    await queueManager.addToQueue(userId);

    // Check if there are enough players to start a game
    const queueSize = await queueManager.getQueueSize();
    console.log("Queue size:", queueSize);
    if (queueSize >= 2) {
      const players = await queueManager.getPlayers();
      const gameId = await gameManager.createGame(players[0], players[1]);
      await queueManager.removeFromQueue(players);
      console.log("Game created with ID:", gameId);
      return { gameId };
    } else {
      console.log("Waiting for more players to join the queue");
      return { message: "Waiting for more players to join the queue" };
    }
  } catch (error) {
    console.error("Error joining queue:", error);
    throw new functions.https.HttpsError("internal", "Error joining queue");
  }
});
