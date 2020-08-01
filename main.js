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
    '1': 'red',
    '-1': 'lime'
};


/*----- app's state (variables) -----*/
let board = [];
let turn;
let winner;

/*----- cached element references -----*/
// Select all direct children of the game-grid id.
const squareEls = document.querySelectorAll('#game-grid > div');

//Select the h2 id='score msg' element that displays messages to user.
const msgEl = document.getElementById('score-msg');

/*----- event listeners -----*/
document.getElementById('game-grid')
    .addEventListener('click', handleSquareClick);

document.getElementById('reset')
    .addEventListener('click', handleResetClick);

/*----- functions -----*/
init();

// Click handling
function handleSquareClick(event) {
    let squareId = event.target.id;

    //Extract index of square from div id using regex.
    squareIdx = squareId.replace(/\D/g, '');

    /**
     * If the user attempts to click on a value that is not null, that means the square was already
     * clicked and assigned a value.  The function is exited and awaits the next click.
     * If the winner variable is assigned a number or 'T', the game is over (win or tie).
     */ 

    if (
        board[squareIdx] !== null ||
        winner
    ) return;

    // Assign the player value to the square that was clicked.
    board[squareIdx] = turn;
    
    // Change current player.
    turn = turn === 1 ? -1 : 1;

    // Test board for a winner, a tie, or if game is in play.
    winner = testForWin();

    renderBoard();
}

function handleResetClick() {
    init();
    renderBoard();
}

// Initialize board
function init() {
    board = Array(9).fill(null);
    turn = 1;
    winner = null;

    renderBoard();
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

function testForWin() {
    /**
     * Iterate through the win table.
     * Each board value is set to 1 or -1.
     * If the absolute value of the board values that match with any of the win table arrays equal 3,
     * a winner has been found. Assign the winner the value of the first index of the matched array.
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