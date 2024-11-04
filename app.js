const game = {
    hasGameBeenPlayed: false,
    isGameOver: true,
    roundsToWin: 0,
    winningScore: 0,
    currentRound: 0,

    gameLog: document.querySelector("#gameLog"),
    selectWinningScore: document.querySelector("#selectWinningScore"),
    selectRounds: document.querySelector("#selectRounds"),
    newGameButton: document.querySelector("#newGame"),
    startGameButton: document.querySelector("#startGame"),
};

const player1 = {
    name: "",
    score: 0,
    roundsWon: 0,

    button: document.querySelector("#player1scores"),
    nameDisplay: document.querySelector("#player1nameDisplay"),
    scoreDisplay: document.querySelector("#player1scoreDisplay"),
};

const player2 = {
    name: "",
    score: 0,
    roundsWon: 0,

    button: document.querySelector("#player2scores"),
    nameDisplay: document.querySelector("#player2nameDisplay"),
    scoreDisplay: document.querySelector("#player2scoreDisplay"),
};


// Game loads
resetGame();

function resetGame() {
    console.log("resetGame initiated");

    player1.name = "";
    player1.score = 0;
    player1.scoreDisplay.innerText = "0"
    player1.roundsWon = 0;
    player1.nameDisplay.innerText = ""
    player1.button.disabled = true;
    player1.nameDisplay.classList.remove("turnRed");
    player1.nameDisplay.classList.remove("turnGreen");

    player2.name = "";
    player2.score = 0;
    player2.scoreDisplay.innerText = "0"
    player2.roundsWon = 0;
    player2.nameDisplay.innerText = ""
    player2.nameDisplay.classList.remove("turnRed");
    player2.nameDisplay.classList.remove("turnGreen");
    player2.button.disabled = true;

    game.isGameOver = true;
    game.roundsToWin = 1;
    game.winningScore = 5;
    game.currentRound = 1;
    game.selectRounds.disabled = true;
    game.selectWinningScore.disabled = true;
    game.startGameButton.disabled = true;

    game.gameLog.textContent = "";
    game.selectRounds.value = "";
    game.selectWinningScore.value = "";
}


// Create new game
game.newGameButton.addEventListener("click", () => {
    game.newGameButton.disabled = true;
    if (game.hasGameBeenPlayed) {
        if (confirm("Set up new game?")) {
            resetGame();
        }
    }
    getPlayerNames()
})


// Name players
function getPlayerNames() {
    // console.log("getPlayerNames initiated");

    player1.name = prompt("Please enter name for Player 1", "Player 1")
    if (player1.name === null || player1.name === "") {
        player1.name = "Player 1"
    }

    player2.name = prompt("Please enter name for Player 2", "Player 2")
    if (player2.name === null || player2.name === "") {
        player2.name = "Player 2"

    }
    displayPlayerNames();
}

function displayPlayerNames() {
    // console.log("displayPlayerNames initiated");
    player1.nameDisplay.innerText = `${player1.name}: `;
    player2.nameDisplay.innerText = `${player2.name}: `;

    player1.button.innerText = `+1 ${player1.name}`;
    player2.button.innerText = `+1 ${player2.name}`;

    game.selectRounds.disabled = false;
}


// Select how many rounds to play
game.selectRounds.addEventListener("change", () => {
    game.roundsToWin = parseInt(game.selectRounds.value);
    game.selectWinningScore.disabled = false;
})


// Select winning score
game.selectWinningScore.addEventListener("change", () => {
    game.winningScore = parseInt(game.selectWinningScore.value);
    game.startGameButton.disabled = false;
})


// Start game
game.startGameButton.addEventListener("click", () => {
    // console.log("game started")
    game.hasGameBeenPlayed = true;
    game.isGameOver = false;

    game.selectRounds.disabled = true;
    game.selectWinningScore.disabled = true;

    player1.button.disabled = false;
    player2.button.disabled = false;
    game.newGameButton.disabled = false;
    game.startGameButton.disabled = true;
})


// Play game
player1.button.addEventListener("click", () => {
    updateScore(player1, player2);
})

player2.button.addEventListener("click", () => {
    updateScore(player2, player1);
})

function updateScore(player, opponent) {
    if (!game.isGameOver) {
        player.score += 1;
        player.scoreDisplay.innerText = player.score;

        if (player.score >= game.winningScore && player.score >= opponent.score + 2) {
            player.nameDisplay.classList.toggle("turnGreen");
            opponent.nameDisplay.classList.toggle("turnRed");
            player.roundsWon += 1;
            player.button.disabled = true;
            opponent.button.disabled = true;

            let msg = document.createElement("li");
            msg.innerText = `Round #${game.currentRound}: ${player.name} beats ${opponent.name} by a score of ${player.score} to ${opponent.score}`;
            game.gameLog.appendChild(msg);

            game.currentRound += 1;

            setTimeout(() => {
                updateRound(player, opponent);
            }, 1000);
        }
    }
}

function updateRound(player, opponent) {
    // console.log("updateRounds called");
    if (player.roundsWon === game.roundsToWin || opponent.roundsWon === game.roundsToWin) {
        game.isGameOver = true;

        // let msg = document.createElement("li");
        // msg.innerText = `${player.name} wins the game! Congratulations on your victory!`;
        // game.gameLog.appendChild(msg);

        alert(`Game over! ${player.name} defeats ${opponent.name}!`);

        setTimeout(() => {
            stopGame();
        }, 1000);
    } else {
        alert(`${player.name} wins. On to Round #${game.currentRound}!`);
        // console.log("on to the next round");
        playNextRound();
    }
}

function playNextRound() {
    player1.button.disabled = false;
    player2.button.disabled = false;

    player1.score = 0;
    player1.scoreDisplay.innerText = "0"
    player1.nameDisplay.classList.remove("turnRed");
    player1.nameDisplay.classList.remove("turnGreen");

    player2.score = 0;
    player2.scoreDisplay.innerText = "0"
    player2.nameDisplay.classList.remove("turnRed");
    player2.nameDisplay.classList.remove("turnGreen");
}

function stopGame() {
    player1.button.disabled = true;
    player2.button.disabled = true;
}