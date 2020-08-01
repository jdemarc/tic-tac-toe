/*----- constants -----*/
const WIN_TABLE = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7]
];

const colors = {
    null: 'white',
    '1': 'red',
    '-1': 'blue'
};


/*----- app's state (variables) -----*/
let board = []; // state of board must be tracked throughout
let turn;
let winner; // user makes selection on board (1-9)

/*----- cached element references -----*/
boardSquareEls = document.getElementById('game-grid');

/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
    board = Array(9).fill(null);
    turn = colors['1'];
    winner = null;
}

function renderBoard() {
    
}

function renderMessage() {

}

function isGameOver() {

}