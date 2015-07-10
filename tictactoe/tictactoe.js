
var i = 1,
		j = 0,
		k = 0,
		clear = document.getElementById("clear").addEventListener("click", clearBoard),
		display = document.getElementById("display"),
		reset = document.getElementById("reset").addEventListener("click", resetMatch),
		arnoldButton = document.getElementById("arnold"),
		audioPlayer = document.getElementById("audio"),
		body = document.getElementsByTagName("body")[0],
		arnoldOn = false,
		cpuOn = false,
		emptyValues,
		filledValue,
		computerQuotes = []
		playerX = "x",
		playerO = "O",
		winner = '',
		inputs = [],
		xWins = document.getElementById("X-wins"),
		oWins = document.getElementById("O-wins"),
		currentBoard = ["","","","","","","","",""],
		checkBoard = [[0, 1, 2],
									[3, 4, 5], 
									[6, 7, 8],
									[0, 3, 6], 
									[1, 4, 7], 
									[2, 5, 8], 
									[0, 4, 8],
									[2, 4, 6]],
		checkThree = [],
		currentThree = [],
		catsCounter = 0,
		playerXTurn = true;
		xWins.innerHTML = 0;
		oWins.innerHTML = 0;
		computerOn(); 
		for(i = 1; i < 10; i++) {
			inputs[i-1] = document.getElementById(i);
			inputs[i-1].addEventListener('click', turn);
		}

		function turn () {
			if (cpuOn) computerTurn(); 

			if (playerXTurn) {
				display.innerHTML = "O's turn";
				this.value = "X";
				playerXTurn = false;
				this.disabled = true;
				this.style.backgroundImage = "none";
				this.style.backgroundColor = "rgba(255,0,255,1)";
			}
			else {
				this.value = "O";
				display.innerHTML = "X's turn";
				playerXTurn = true;
				this.disabled = true;
				this.style.backgroundImage = "none";
				this.style.backgroundColor = "rgba(0,204,204,1)";	
			}

			currentBoard[this.id - 1] = this.value;	
			catsGame();
// 	// I want to loop through it but I can't - online I found some stuff closures but I'm not sure how to do it.
// 	for(j; j < 7;j++) {
// 	checkThree = checkBoard[j];
// 			for(var k = 0;k < 3;k++) {
// 			 currentThree[k] = currentBoard[checkThree[k]];
// 			};
// 	threeValueMatch();
//  }
// };

// instead I have to write each one individually
checkThree = checkBoard[0];
for(k = 0;k < 3;k++) {
	currentThree[k] = currentBoard[checkThree[k]];
}
threeValueMatch();
checkThree = checkBoard[1];
for(k = 0;k < 3;k++) {
	currentThree[k] = currentBoard[checkThree[k]];
}
threeValueMatch();
checkThree = checkBoard[2];
for(k = 0;k < 3;k++) {
	currentThree[k] = currentBoard[checkThree[k]];
}
threeValueMatch();
checkThree = checkBoard[3];
for(k = 0;k < 3;k++) {
	currentThree[k] = currentBoard[checkThree[k]];
}
threeValueMatch()
checkThree = checkBoard[4];
for(k = 0;k < 3;k++) {
	currentThree[k] = currentBoard[checkThree[k]];
};
threeValueMatch();
checkThree = checkBoard[5];
for(k = 0;k < 3;k++) {
	currentThree[k] = currentBoard[checkThree[k]];
};
threeValueMatch();
checkThree = checkBoard[6];
for(k = 0;k < 3;k++) {
	currentThree[k] = currentBoard[checkThree[k]];
};
threeValueMatch();
checkThree = checkBoard[7];
for(k = 0;k < 3;k++) {
	currentThree[k] = currentBoard[checkThree[k]];
};
threeValueMatch();
randBackUrl();
arnoldTurn();

}

function threeValueMatch() {
	if (currentThree.join() === "X,X,X") {
		winner = 'X';
		display.innerHTML = "X wins <span id='reminder'>(Clear the board)</span>";
		updateWins();
		return disableAll();

	}
	else if (currentThree.join() === "O,O,O") {
		winner = 'O';
		display.innerHTML = "O wins <span id='reminder'>(Clear the board)</span>";
		updateWins();
		return disableAll();
	}
	currentThree = [];
}
function catsGame() {
	catsCounter = 0;
	for( var i = 1; i < 10; i++) {
		inputs[i-1] = document.getElementById(i);
		if(inputs[i-1].disabled) {
			catsCounter++;
		}
	}
	if(catsCounter == 9) {
		display.innerHTML = "It's a tie. <span id='reminder'>(Clear the board to play again.)</span>";
	}
}

function disableAll() {
	for( var i = 1; i < 10; i++) {
		inputs[i-1] = document.getElementById(i);
		inputs[i-1].disabled = true;
	}
}

function resetMatch () { 
	location.reload()
}
function clearBoard() {
	currentBoard = ["","","","","","","","",""];
	for(var i = 1; i < 10; i++) {
		inputs[i-1] = document.getElementById(i);
		inputs[i-1].disabled = false;
		inputs[i-1].value = "";
		inputs[i-1].style.background = 'transparent';
	}
	playerXTurn = true;
	checkThree = [];
	currentThree = [];
	display.innerHTML = "X goes first"
	winner = '';
	body.style.backgroundImage = "none";
	body.style.backgroundColor = "black";
	if (arnoldOn) {
		audioPlayer = new Audio('audio/erased.wav');
		audioPlayer.play()
	}
}
function updateWins() {
	if (winner === 'X') {
		xWins.innerHTML++;
	}
	else if (winner === 'O') {
		oWins.innerHTML++;
	}
}
function computerOn() {

	var cpu = document.getElementById("cpu");
	cpu.addEventListener("click", function () {
		
		if (cpuOn === false) {
			arnoldButton.style.display = 'inline';
			cpu.style.backgroundColor = "#228B22";
			cpu.style.border = "none";
			cpu.value = "CPU ON"
			cpuOn = true;
			display.innerHTML = "Think You Can Win? Your turn."
		}
		else { 
			cpu.style.backgroundColor = "transparent";
			cpu.value = "Play CPU"
			cpu.style.border = "solid 1px white";
			cpuOn = false;
			arnoldOn = true;
			arnoldOnSwitch();
			arnoldButton.style.display = 'none';

		};
	})
	
}
function computerTurn() {
	emptyValues = []
	for( var i = 1; i < 10; i++) {
		inputs[i-1] = document.getElementById(i);
		if(!inputs[i-1].disabled) {
			emptyValues.push(i-1);
		}
	}
	filledValue = emptyValues[Math.floor(Math.random()*emptyValues.length)];
	currentBoard[filledValue] = "O";
	inputs[filledValue].value = "O";
	display.innerHTML = "X's turn";
	inputs[filledValue].style.backgroundImage = "none";
	inputs[filledValue].style.backgroundColor = "rgba(0,204,204,1)";	
	inputs[filledValue].disabled = true;
	playerXTurn = true;

}
arnoldButton.addEventListener("click", arnoldOnSwitch);

function arnoldOnSwitch () {
	if (!arnoldOn) {
		this.value = "IT'S ON BABY.";
		this.style.border = "none";
		this.style.backgroundColor = "DarkRed"
		arnoldOn = true;
		display.innerHTML = "What's the matter?";
		audioPlayer = new Audio('audio/whats_the_matter.wav');
		audioPlayer.play()
	}
	else {
		arnoldButton.style.backgroundColor = "transparent";
		arnoldButton.value = "Play Arnold";
		arnoldButton.style.border = "solid 1px white";
		arnoldOn = false;
	}
}
function arnoldTurn() {
	if (arnoldOn) {
		if (winner == 'X') {
			display.innerHTML = "I'll be Back. (X wins)"
			audioPlayer = new Audio('audio/illbeback-future.wav');
			audioPlayer.play()
			body.style.backgroundImage = "url('http://media2.giphy.com/media/wtFWh5L11nJo4/giphy.gif')"
			body.style.backgroundSize = "cover";
		setTimeout( function () {
			
		 body.style.backgroundImage = "url('http://media.giphy.com/media/MtqPeA8PQ3Liw/giphy.gif')";
}
			, 3000 );
			
		}
		else if (winner == 'O' && arnoldOn) {
			display.innerHTML = "You Lose. (0 wins)"
			audioPlayer = new Audio('baby.wav');
			audioPlayer.play()
		}
		if (catsCounter == 2) {
			audioPlayer = new Audio('audio/deep_trouble.wav');
			audioPlayer.play()
		}
		if (catsCounter == 4) {
			audioPlayer = new Audio('audio/why_not.wav');
			audioPlayer.play()
		}
	}
} 

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};

function randPicUrl() {
	if (arnoldOn) {
			randPic = getRandomInt(1, 5);
			if(!this.disabled) { 
				this.style.backgroundImage = "url('images/" + randPic +".jpg')";
			}
	}
	else {
		randPic = getRandomInt(120,130);
		var source = "url('http://lorempixel.com/abstract/125/" + String(randPic) + "')";
		if (!this.disabled) {
			this.style.backgroundImage = source;
		}
	}
};
function randBackUrl() {
	if (catsCounter === 3) {
		randPic = getRandomInt(700,800);
		var source = "url('http://lorempixel.com/abstract/800/" + String(randPic) + "')";
			body.style.backgroundImage = source;
			body.style.backgroundSize = "cover";
		}
}

for(i = 1; i < 10; i++) {
	inputs[i-1] = document.getElementById(i);
	inputs[i-1].addEventListener('mouseover', randPicUrl);
}

