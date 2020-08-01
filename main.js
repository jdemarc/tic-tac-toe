/*----- constants -----*/
const WIN_TABLE = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

const colors = {
    'null': 'purple',
    '1': 'red',
    '-1': 'blue'
};


/*----- app's state (variables) -----*/
let board = [];
let turn;
let winner;

/*----- cached element references -----*/
const boardSquareEls = document.getElementById('game-grid > div');

const msgEl = document.getElementById('score-msg');

/*----- event listeners -----*/
document.getElementById('game-grid')
    .addEventListener('click', handleSquareClick);

/*----- functions -----*/
init();

function handleSquareClick(event) {
    console.log(event.target);
}

function init() {
    board = Array(9).fill(null);
    turn = 1;
    winner = null;

    console.log(board);
    //renderBoard();
}

function renderBoard() {
    board.forEach(function(boardSquare, idx) {
        
    });

    renderMessage();
}

function renderMessage() {
    if (winner !== null) {
        msgEl.textContent = `${color['1']}'s turn.`; // This is wrong.
    } else if (winner === 'T') {
        msgEl.textContent = 'Tie';
    } else {
        msgEl.textContent = `${color['-1']} has won.`; // This is wrong.
    }
}

function isGameOver() {

}