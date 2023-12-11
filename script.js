const startBtn = document.querySelector("#start-button");

const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, idx) => {
            boardHTML += `<div class='square' id="square-${idx}">${square}</div>`;
    });
        
    document.querySelector('#gameboard').innerHTML = boardHTML
    const squares = document.querySelectorAll('.square')
    squares.forEach((square) => {
        square.addEventListener('click', Game.handleClick)
    })};

    const update = (idx, mark) => {
        gameboard[idx] = mark;
        render();
    }
    
    const getGameboard = () => gameboard;
    return {
        render,
        update,
        getGameboard,

    }
})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
};

const Game = (() => {
        let players = [];
        let currentPlayerIndex;
        let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, 'X'),
            createPlayer(document.querySelector('#player2').value, 'O')
        ]

        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render()
    }

    const handleClick = (e) => {
        let idx = e.target.id.split("-")[1];
        if (Gameboard.getGameboard()[idx] != "") return;

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        Gameboard.update(idx, players[currentPlayerIndex].mark);

        if(checkWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
            gameOver = true;
            alert(` ${players[currentPlayerIndex].name} won!`)
        } else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            alert("It's a tie")
        }
    }

    return {
        start,
        handleClick,

    }
})();

function checkWin(board) {
    const winningBoard = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningBoard.length; i++) {
        const [a,b,c] = winningBoard[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;            
        }
    } return false;
}

function checkForTie(board) {
    return board.every(cell => cell !== "")
}

startBtn.addEventListener('click', ()=>Game.start())