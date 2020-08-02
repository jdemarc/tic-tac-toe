/*----- constants -----*/
const WIN_TABLE = [
    [0, 1, 2], // Horizontal win.
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6], // Vertical win.
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8], // Diagonal win.
    [2, 4, 6]
];

const colors = {
    'null': '#e0e0d1',
    '1': 'gold',
    '-1': 'indigo'
};

/*----- global variable -----*/
let score = [0, 0, 0];

/*----- app's state (variables) -----*/
let board = [];
let turn;
let winner;

/*----- cached element references -----*/
// Select all direct children of the game-grid id.
const squareEls = document.querySelectorAll('#game-grid > div');

// Select the h2 id='score msg' element that displays messages to user.
const msgEl = document.getElementById('game-state');

const scoreEl = document.getElementById('player-record');

const resetEl = document.getElementById('reset');

/*----- event listeners -----*/
document.getElementById('game-grid')
    .addEventListener('click', handleSquareClick);

document.getElementById('play-again')
    .addEventListener('click', handlePlayAgainClick);

document.getElementById('reset')
    .addEventListener('click', handleResetClick);

/*----- functions -----*/
init();

// Click handling
function handleSquareClick(event) {
    let squareId = event.target.id;

    //Extract index of square from div id using regex.
    squareIdx = squareId.replace(/\D/g, '');

    // Alternatively, set each cell id to an integer -- ex: <div id=0>, <div id=1> ...

    /**
     * If the user attempts to click on a value that is not null, that means the square was already
     * clicked and assigned a value.  The function is exited and awaits the next click.
     * If the winner variable is truthy, the game is over (win or tie) as it has been assigned
     * a number or 'T'.
     */ 

    if (
        board[squareIdx] !== null ||
        winner
    ) return;

    // Assign the player value to the square that was clicked.
    board[squareIdx] = turn;
    
    // Change current player.
    turn = turn === 1 ? -1 : 1;
    // Alternatively: turn *= -1;

    // Test board for a winner, a tie, or if game is in play.
    winner = testForWin();

    // Render board to reflect clicks/board assignments.
    renderBoard();

    renderScore();
}

function handlePlayAgainClick() {
    init();
    renderBoard();
}

function handleResetClick() {
    // Score must be initialized to zero only if the reset button is clicked.
    score = Array(3).fill(0);
    init();
    renderBoard();
}

// Initialize board
function init() {
    board = Array(9).fill(null);
    turn = 1;
    winner = null;

    renderBoard();
    renderScore();
}

// Render functions
function renderBoard() {

    /**
     * Iterate over the board and give each square an initial background.
     * Since the board is filled with null, 
     * the color assigned to the object null property will be displayed.
     */  
    
    board.forEach(function(square, idx) {
        squareEls[idx].style.background = colors[square];
    });

    renderMessage();
}

function renderMessage() {

    /**
     * If the winner === null, the game continues and prompts the next player to play.
     * If winner contains a number, it means a winner was found.
     * Otherwise, the winner === 'T', and the game has tied.
     */
    if (winner === null) {
        msgEl.textContent = `${colors[turn].toUpperCase()}'s turn.`;
    } else if (typeof winner === 'number') {
        msgEl.textContent = `${colors[winner].toUpperCase()} has won.`;
    } else {
        msgEl.textContent = 'Tie game!'
    }
}

function renderScore() {
    calcScore();
    scoreEl.innerHTML = `Player ${colors[1]}: ${score[0]} <br>
                         Player ${colors[-1]}: ${score[1]} <br>
                         Draws: ${score[2]}`;
}

function calcScore() {
    if (winner === 1) {
        score[0]++;
    } else if (winner === -1) {
        score[1]++;
    } else if (winner === 'T') {
        score[2]++;
    } return score;
}

function testForWin() {
    /**
     * Iterate through the win table.
     * Total the board values at the indices in the win table.
     * If the absolute sum of the values is 3, a winner has been found.
     * Assign the winner the value of the first index of the matched array and return it.
     */

    for (let i = 0; i < WIN_TABLE.length; i++) {
        if (Math.abs(board[WIN_TABLE[i][0]] + board[WIN_TABLE[i][1]] + board[WIN_TABLE[i][2]]) === 3) {
                return board[WIN_TABLE[i][0]];
            }   
        }

    /**
     * If the board contains null values, the winner is set to null so the game can continue to play.
     * Otherwise, if the board is filled with values but no winner was found (above), the game has tied.
     */

    return board.includes(null) ? null : 'T';
}