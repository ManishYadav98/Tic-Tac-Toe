document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    };

    const checkTie = () => {
        return !gameBoard.includes('') && !checkWinner();
    };

    const updateStatus = () => {
        const winner = checkWinner();
        if (winner) {
            showOutcome(`Player ${winner} wins!`);
        } else if (checkTie()) {
            showOutcome('It\'s a tie!');
        } else {
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const showOutcome = (outcome) => {
        status.textContent = outcome;
        gameActive = false;

        // Display a "New Game" button
        const newGameBtn = document.createElement('button');
        newGameBtn.textContent = 'New Game';
        newGameBtn.classList.add('reset-btn');
        newGameBtn.addEventListener('click', resetGame);
        status.appendChild(newGameBtn);
    };

    const handleCellClick = (index) => {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        const cell = document.createElement('div');
        cell.textContent = currentPlayer;
        board.children[index].appendChild(cell);

        const winner = checkWinner();
        if (winner) {
            showOutcome(`Player ${winner} wins!`);
        } else if (checkTie()) {
            showOutcome('It\'s a tie!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    };

    const resetGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;

        // Clear board
        Array.from(board.children).forEach((cell) => {
            cell.innerHTML = '';
        });

        // Remove "New Game" button
        const newGameBtn = document.querySelector('.reset-btn');
        if (newGameBtn) {
            status.removeChild(newGameBtn);
        }

        updateStatus();
    };

    // Initialize the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    resetBtn.addEventListener('click', resetGame);
    updateStatus();
});
