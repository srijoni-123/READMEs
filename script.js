<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Tic Tac Toe</h1>
        <div id="board" class="board">
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
        </div>
        <div id="status" class="status">X's Turn</div>
        <button id="restartButton" class="restart-button">Restart Game</button>
    </div>

    <div id="winner-screen">
        <div class="screen-content" id="winner-screen-content">
            <h2></h2>
            <button class="restart-button" onclick="restartGame()">New Game</button>
        </div>
    </div>

    <div id="draw-screen">
        <div class="screen-content" id="draw-screen-content">
            <h2></h2>
            <button class="restart-button" onclick="restartGame()">New Game</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background: linear-gradient(to bottom right, #4a89dc, #8e44ad);
    color: white;
}

.container {
    text-align: center;
}

.board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
    margin-top: 20px;
}

.cell {
    background-color: #fff;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    cursor: pointer;
}

.status {
    margin-top: 20px;
}

.restart-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    background-color: #27ae60;
    border: none;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.restart-button:hover {
    background-color: #219653;
}

#winner-screen, #draw-screen {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
    justify-content: center;
    align-items: center;
}

.screen-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

.screen-content h2 {
    margin-bottom: 20px;
}

.screen-content button {
    margin-top: 20px;
}
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const winnerScreen = document.getElementById('winner-screen');
const drawScreen = document.getElementById('draw-screen');
const winnerScreenContent = document.getElementById('winner-screen-content');
const drawScreenContent = document.getElementById('draw-screen-content');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-cell'));

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    if (checkWin()) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}'s Turn`;
    }
};

const checkWin = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
};

const checkDraw = () => {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
};

const endGame = (isDraw) => {
    gameActive = false;
    if (isDraw) {
        drawScreenContent.innerHTML = "It's a Draw!";
        drawScreen.style.display = 'flex';
    } else {
        winnerScreenContent.innerHTML = `${currentPlayer} Wins!`;
        winnerScreen.style.display = 'flex';
    }
};

const restartGame = () => {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `${currentPlayer}'s Turn`;
    winnerScreen.style.display = 'none';
    drawScreen.style.display = 'none';
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
