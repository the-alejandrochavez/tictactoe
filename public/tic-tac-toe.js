const board = document.querySelector(".board");
const newGame = document.getElementById("new-game");
const giveUp = document.getElementById("give-up");
const header = document.getElementById("winner");
const x = "url('images/player-x.svg')"
const o = "url('images/player-o.svg')"
let currentPlayer = x;
let lastPlayer = o;
let player;
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

newGame.disabled = true;
giveUp.disabled = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerChange() {
    player = currentPlayer;
    currentPlayer = lastPlayer;
    lastPlayer = player;
}

function handleClick(e) {
    const block = e.target;
    let index = block.getAttribute("id");

    if (gameActive == false) {
        return;
    }

    giveUp.disabled = false;


    if (block.style.backgroundImage == "") {
        block.style.backgroundImage = currentPlayer;
        gameState[index] = currentPlayer;
    }

    checkWin();
    checkTie();
    playerChange();
};

function checkWin() {
    winConditions.forEach(function (e) {
        let [a, b, c] = e;
        if (gameState[a] == gameState[b] && gameState[b] == gameState[c] && gameState[a] != "") {
            gameActive = false;
            if (currentPlayer == x) {
                header.innerText = "Winner:X";
            }
            if (currentPlayer == o) {
                header.innerText = "Winner:O";
            }
            newGame.disabled = false;
            giveUp.disabled = true;
        }
    })
}

function checkTie() {
    let c = 0;

    gameState.forEach(function (e) {
        if (e != "") {
            c++;
        }
    })
    if (c === 9) {
        gameActive = false;
        header.innerText = "Winner:None";
        newGame.disabled = false;
        giveUp.disabled = true;
    }
}

function restartGame() {
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    header.innerText = "";
    const blocks = document.querySelectorAll(".block");
    blocks.forEach(function (block) {
        block.style.backgroundImage = "";
    })
    currentPlayer = x;
    lastPlayer = o;
    newGame.disabled = true;
}

function givingUp() {
    if (currentPlayer == x) {
        header.innerText = "Winner:O";
    }
    else {
        header.innerText = "Winner:X";
    }

    gameActive = false;
    giveUp.disabled = true;
    newGame.disabled = false;
}

board.addEventListener("click", handleClick);
newGame.addEventListener("click", restartGame);
giveUp.addEventListener("click", givingUp);
