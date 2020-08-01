/*----- constants -----*/
const WIN_TABLE = [
    [0, 1, 2], // Horizontal win.
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6], // Vertical win.
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8], // Diagnol win.
    [2, 4, 6]
];

const colors = {
    'null': 'gray',
    '1': 'red',
    '-1': 'green'
};


/*----- app's state (variables) -----*/
let board = [];
let turn;
let winner;

/*----- cached element references -----*/
const squareEls = document.querySelectorAll('#game-grid > div');

const msgEl = document.getElementById('score-msg');

/*----- event listeners -----*/
document.getElementById('game-grid')
    .addEventListener('click', handleSquareClick);

document.getElementById('reset')
    .addEventListener('click', handleResetClick);

/*----- functions -----*/
init();

function handleSquareClick(event) {
    let squareId = event.target.id;
    //Extract index of square from div id using regex.
    squareIdx = squareId.replace(/\D/g, '');

    console.log('Square index', squareIdx);
    
    if (
        board[squareIdx] !== null ||
        winner !== null
    ) return;

    board[squareIdx] = turn;
    turn *= -1;
    
    for (let i = 0; i < WIN_TABLE.length; i++) {
        if (Math.abs(board[WIN_TABLE[i][0]]) + 
            (board[WIN_TABLE[i][1]]) +
            (board[WIN_TABLE[i][2]]) === 3) {
                winner = board[WIN_TABLE[i][0]];
        } else if (board.includes(!null)) {
            winner = 'T';
        }
    }

    renderBoard();
}

function init() {
    board = Array(9).fill(null);
    turn = 1;
    winner = null;

    renderBoard();
}

function renderBoard() {

    // Iterate over the board and give each square a gray background.
    // Since the board should be initialized to null, color['null'] should be gray.

    board.forEach(function(square, idx) {
        squareEls[idx].style.background = colors[square];
    });

    renderMessage();
}

function renderMessage() {

    if (winner) {
        msgEl.textContent = `${colors[winner].toUpperCase()} has won.`; 
    } else if (winner === 'T') {
        msgEl.textContent = 'Tie';
    } else {
        msgEl.textContent = `${colors[turn].toUpperCase()}'s turn.`;
    }
}

function handleResetClick() {
    init();
    renderBoard();
}