let currentPlayer = "X"; 
let board = ["", "", "", "", "", "", "", "", ""]; 
let gameActive = true; 

//winning combinations .
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];


function handleClick(box) {
    let index = parseInt(box.id) - 1; 

    if (!gameActive || board[index] !== "") return; 

    board[index] = currentPlayer; 
    box.textContent = currentPlayer; 

    if (checkWinner()) {
        document.getElementById("status").textContent = `🎉 Player ${currentPlayer} Wins!`; // winning match
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById("status").textContent = "🤝 It's a Draw!"; // Draw the match
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    document.getElementById("status").textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for Winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""]; 
    gameActive = true; 
    currentPlayer = "X"; 

    document.querySelectorAll(".box").forEach(box => {
        box.textContent = ""; 
    });

    document.getElementById("status").textContent = `Player ${currentPlayer}'s Turn`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetButton").addEventListener("click", resetGame);
});


//add keybord inputs functionality.
document.addEventListener("keydown", (event) => {
    if (!gameActive && event.key.toLowerCase() !== "r") return; 

    let key = event.key;

    if (key >= "1" && key <= "9" && gameActive) {
        let index = parseInt(key) - 1; 
        let box = document.getElementById(key);

        if (board[index] === "") {
            handleClick(box);
        }
    }

    if (key.toLowerCase() === "r") {
        resetGame();
    }
});
