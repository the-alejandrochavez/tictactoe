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

gameState = loadState("saveState");
currentPlayer = loadState("savePlayer");
lastPlayer = loadState("saveLastPlayer");

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
    saveState("savePlayer", currentPlayer);
    saveState("saveLastPlayer", lastPlayer);
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
        saveState("saveState", gameState);
        playerChange();
    }

    checkWin();
    checkTie();
};

function checkWin() {
    winConditions.forEach(function (e) {
        let [a, b, c] = e;
        if (gameState[a] == gameState[b] && gameState[b] == gameState[c] && gameState[a] != "") {
            gameActive = false;
            if (currentPlayer == x) {
                header.innerText = "Winner:O";
            }
            if (currentPlayer == o) {
                header.innerText = "Winner:X";
            }
            newGame.disabled = false;
            giveUp.disabled = true;
        }
    })
}

function checkTie() {
    let c = 0;

    if (gameActive == false) {
        return;
    }

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
    saveState("saveState", gameState);
    saveState("savePlayer", currentPlayer);
    saveState("saveLastPlayer", lastPlayer);
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

function saveState(name, value) {
    if (typeof value === "string") {
        document.cookie = `${name}=${value};path=/`;
    }
    else {
        document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};path=/`;
    }
}

function loadState(name) {
    let value = document.cookie.split("; ")
        .find((row) => row.startsWith(name))
        ?.split("=")[1];

    if (typeof value === "string" && value[0] != "%") {
        return value;
    }
    else {
        value = JSON.parse(decodeURIComponent(value));
        const blocks = document.querySelectorAll(".block");
        blocks.forEach(function (block) {
            let index = block.getAttribute("id")
            block.style.backgroundImage = value[index];
            if (value[index] != "") {
                giveUp.disabled = false;
            }
        })
    }

    return value;
}

board.addEventListener("click", handleClick);
newGame.addEventListener("click", restartGame);
giveUp.addEventListener("click", givingUp);
