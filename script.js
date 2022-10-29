const grid = document.getElementById('gameBoard');
const gameLevel = document.getElementById("levelButtons");
const flags = document.getElementById("flags");
const gameBoard = document.getElementById("gameBoard");
const gameMessage = document.getElementById("infoText");
const resetGame = document.getElementById("resetGame");
let rows = 17, cols = 17, minesNumber, flagsNumber, bombSign = "💣", flagSign = "🚩", gridMatrix = [];

function generateGameBoard(id) {
	gameLevel.hidden = true;
	if (id === 'levelBeginner') {
		minesNumber = 10;
	} else if (id === 'levelIntermediate') {
		minesNumber = 20;
	} else if (id === 'levelExpert') {
		minesNumber = 30;
	}
	flagsNumber = minesNumber;
	flags.innerHTML = `Flags remains: ${flagsNumber}`;
	for (let r = 1; r <= rows; ++r){
		let tr = grid.appendChild(document.createElement('tr'));
		for (let c = 1; c <= cols; ++c){
			let cell = tr.appendChild(document.createElement('td'));
			cell.id = r + '-' + c;
			let currentCell = document.getElementById(cell.id);
			currentCell.style.backgroundColor = "#adb5bd";
			cell.addEventListener('click', (event) => {
				leftClickEvent(currentCell, cell.id);
			});
			cell.addEventListener('contextmenu', (event) => {
				event.preventDefault();
				rightClickEvent(currentCell);
			});
		}
	}
	generateMatrix();
	randomMines();
}

function generateMatrix() {
	for (let i = 0; i <= rows + 1; i++) {
  		gridMatrix[i] = [];
  		for (let j = 0; j <= cols + 1; j++) {
    			gridMatrix[i][j] = 0;
  		}
	}
}

function randomMines() {
	for (let i = 0, x, y; i < minesNumber; ++i) {
		x = Math.ceil(Math.random() * rows);
		y = Math.ceil(Math.random() * cols);
		if (gridMatrix[x][y] === bombSign) {
			--i;
		} else {
			gridMatrix[x][y] = bombSign;
		}
	}
	numbersAroundMines();
}

function updateGameBoard() {
	for (let i = 1; i <= rows; i++) {
  		for (let j = 1; j <= cols; j++) {
    			document.getElementById(`${i}-${j}`).innerHTML = gridMatrix[i][j];
    			document.getElementById(`${i}-${j}`).style.backgroundColor = "white";
  		}
	}
}

function leftClickEvent(clickedCell, id) {
	if (clickedCell.style.backgroundColor !== "white" && clickedCell.innerHTML === "") {
		clickedCell.style.backgroundColor = "white";
		let pos = id.split("-");
		clickedCell.innerHTML = gridMatrix[pos[0]][pos[1]];
		if (gridMatrix[pos[0]][pos[1]] === bombSign) {
			gameOver(id);
		}
	}
}

function rightClickEvent(clickedCell) {
	if (clickedCell.style.backgroundColor !== "white" && clickedCell.innerHTML !== flagSign) {
		clickedCell.innerHTML = flagSign;
		--flagsNumber;
		flags.innerHTML = `Flags remains: ${flagsNumber}`;
	} else if (clickedCell.innerHTML === flagSign) {
		clickedCell.innerHTML = "";
		++flagsNumber;
		flags.innerHTML = `Flags remains: ${flagsNumber}`;
	}
}

function numbersAroundMines() {
	for (let i = 1; i <= rows; ++i) {
		for (let j = 1; j <= cols; ++j) {
			if (gridMatrix[i][j] === bombSign) {
				for (let m = i - 1; m <= i + 1; ++m) {
					for (let  n = j - 1; n <= j + 1; ++n) {
						if (gridMatrix[m][n] !== bombSign) {
							gridMatrix[m][n] += 1;
						}
					}
				}
			}
		}
	}
}

function gameOver(id) {
	updateGameBoard();
	document.getElementById(id).style.backgroundColor = "crimson";
	gameMessage.innerHTML = "Game Over!";
	removeEventListener('keydown', (event), true);
	removeEventListener('keydown', (event), true);
}
