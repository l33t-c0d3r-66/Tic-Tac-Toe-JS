let gameActive = true;
let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
const winingStates = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const statusDisplay = document.getElementById("status");
document.querySelectorAll(".cell").forEach(function(cell) {
    cell.addEventListener("click",cellClick);
});

function winingMessage() {
    return currentPlayer + " Wins";
}

function drawMessage() {
    return "Draw";
}

function currentPlayerTurn() {
    return currentPlayer + "'s Turn";
}

function cellClick(cellClickEvent) {
    const cellClicked = cellClickEvent.target;
    const indexOfCellClicked = parseInt(cellClicked.getAttribute("data-cell-index"));
    if(gameState[indexOfCellClicked]!== "" || !gameActive) {
        return;
    }
    playCell(cellClicked, indexOfCellClicked);
    checkResult();
}

function playCell(cellClicked, indexOfCellClicked) {
    gameState[indexOfCellClicked] = currentPlayer;
    cellClicked.innerHTML = currentPlayer;
}

function changePlayer() {
    if(currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkResult(){
    let roundWon = false;
    for(let i = 0; i < 8; i++) {
        const winState = winingStates[i];
        let a = gameState[winState[0]];
        let b = gameState[winState[1]];
        let c = gameState[winState[2]];
        if(a == '' || b == '' || c == ''){
            continue;
        }
        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        statusDisplay.innerHTML = winingMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    changePlayer();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(function(cell) {
        cell.innerHTML = '';
    });
}