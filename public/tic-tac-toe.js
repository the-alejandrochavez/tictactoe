const board = document.querySelector(".board");
const x = "url('images/player-x.svg')"
const o = "url('images/player-o.svg')"
let currentPlayer = x;
let lastPlayer = o;
let player;
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

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
                document.getElementById("winner").innerText = "Winner:X";
            }
            if (currentPlayer == o) {
                document.getElementById("winner").innerText = "Winner:O";
            }
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
        document.getElementById("winner").innerText = "Winner:None";
    }
}

board.addEventListener("click", handleClick);
