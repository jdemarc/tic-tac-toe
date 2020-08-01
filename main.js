/*----- constants -----*/
const WIN_TABLE = [
    [0, 1, 2], //3
    [3, 4, 5], //12
    [6, 7, 8], //21

    [0, 3, 6], //9
    [1, 4, 7], //12
    [2, 5, 8], //15

    [0, 4, 8], //12
    [2, 4, 6] //12
];

const colors = {
    'null': 'gray',
    '1': 'red',
    '-1': 'blue'
};


/*----- app's state (variables) -----*/
let board = [];
let turn;
let winner;

/*----- cached element references -----*/
const squareEls = document.querySelectorAll('#game-grid > div');
console.log(squareEls);

const msgEl = document.getElementById('score-msg');

/*----- event listeners -----*/
document.getElementById('game-grid')
    .addEventListener('click', handleSquareClick);

/*----- functions -----*/
init();

function handleSquareClick(event) {
    let squareId = event.target.id;
    //Extract index of square from div id using regex.
    squareIdx = squareId.replace(/\D/g, '');

    if (
        squareIdx !== null ||
        winner !== null
    ) return;

    board[squareIdx] = turn;
    turn *= 1;




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

    //renderMessage();
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