const turn = document.querySelectorAll(".block");
const x = "url('images/player-x.svg')"
const o = "url('images/player-o.svg')"
let currentPlayer = x;
let lastPlayer = o;
let c = 0;

const winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

turn.forEach(function (e) {
    e.addEventListener("click", function () {
        if (e.style.backgroundImage == '') {
            if (currentPlayer != lastPlayer) {
                e.style.backgroundImage = currentPlayer;
            }
            let changedPlayer = currentPlayer;
            currentPlayer = lastPlayer;
            lastPlayer = changedPlayer;
            c++;
        }
        console.log(c);
    });
});
