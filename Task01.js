let board;
let players;
let currentPlayer;
let diceRoll;

function initializeGame() {
    board = createBoard();
    players = createPlayers();
    currentPlayer = 0;
    diceRoll = 0;
    document.getElementById("message").textContent = `Player ${currentPlayer + 1}'s turn.`;
}

function createBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = ""; // Clear previous board

    const tiles = [];
    for (let i = 0; i < 15 * 15; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        if (isHomeTile(i)) tile.classList.add("home");
        boardElement.appendChild(tile);
        tiles.push(tile);
    }
    return tiles;
}

function isHomeTile(index) {
    // Define home tiles based on game logic
    const homeIndices = [
        // Example home tile indices for a 15x15 grid
        0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40
    ];
    return homeIndices.includes(index);
}

function createPlayers() {
    const playerColors = ["red", "blue", "green", "yellow"];
    return playerColors.map(color => {
        return {
            color,
            pieces: new Array(4).fill(0) // Start positions for each player's pieces
        };
    });
}

function rollDice() {
    diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById("die").textContent = diceRoll;
    document.getElementById("message").textContent = `Player ${currentPlayer + 1} rolled a ${diceRoll}.`;

    // Example turn handling logic
    handleTurn();
}

function handleTurn() {
    // Example: Move the first piece of the current player by the dice roll
    const player = players[currentPlayer];
    const pieceIndex = player.pieces.findIndex(pos => pos + diceRoll < board.length);

    if (pieceIndex >= 0) {
        const oldPos = player.pieces[pieceIndex];
        const newPos = oldPos + diceRoll;

        // Clear old position and set new position
        if (board[oldPos]) board[oldPos].textContent = "";
        if (board[newPos]) board[newPos].textContent = "⚫"; // Example piece

        player.pieces[pieceIndex] = newPos;
        document.getElementById("message").textContent = `Player ${currentPlayer + 1} moved piece ${pieceIndex + 1} to position ${newPos}.`;
    } else {
        document.getElementById("message").textContent = `Player ${currentPlayer + 1} cannot move.`;
    }

    // Pass turn to next player
    currentPlayer = (currentPlayer + 1) % players.length;
    document.getElementById("message").textContent += ` Player ${currentPlayer + 1}'s turn.`;
}

function restartGame() {
    initializeGame();
}

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
});
