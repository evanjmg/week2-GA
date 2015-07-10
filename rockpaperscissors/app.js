var Game = Game || {};
Game.setup = function () {
	this.self = this;
	this.maindisplay = document.getElementById('maindisplay'); 
	this.player1CurrentChoice = document.getElementById('player1');
	this.player2CurrentChoice = document.getElementById('player2');
	this.selector = document.getElementById('selector');
	this.player1wins = document.getElementById('player1wins');
	this.player2wins = document.getElementById('player2wins');
	this.player1wins.value = 0;
	this.player2wins.value = 0;
	this.submit = document.getElementById('submit').addEventListener('click', Game.getPlayerMove.bind(Game));
	console.log("hi");
	maindisplay.innerHTML = "Please choose either 'rock', 'paper', or 'scissors'.";
}
Game.getPlayerMove = function () {
	var playerMove = "";
	playerMove = this.selector.value;
	// this.player1CurrentChoice.innerHTML = playerMove;
	this.displayImageMove(playerMove, this.player1CurrentChoice.id);
	this.getWinner(playerMove);
}
Game.getComputerMove = function () {
	var randomNumber = Math.random();
	var computerMove;
	if (randomNumber < 0.33) {
		computerMove =  "rock";
	} else if (randomNumber < 0.66) {
		computerMove = "paper";
	} else {
		computerMove = "scissors";
	}
	this.displayImageMove(computerMove, this.player2CurrentChoice.id);
	return computerMove;
}
Game.getWinner = function (playerMove) {
	 	var winner,
	 	computerMove = Game.getComputerMove();
	Game.winningMap = { rock: "paper", paper: "scissors", scissors: "rock"};
	if (playerMove === Game.winningMap[computerMove]) {
		winner = "player"
		 } 
	else if (playerMove === computerMove) 
			{ winner = "tie"; }
		else {
			winner = "computer";
		}
		Game.displayWinner(winner, computerMove, playerMove);
		}
Game.displayImageMove = function (move, id) {
	var url;
	switch (move) {
		case "rock":
		url = 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Logan_Rock_Treen_closeup.jpg';
		var rockDisplay = document.getElementById(id);
		rockDisplay.style.backgroundImage = "url('" + url + "')";
		break;
		case "scissors":
		giphyApi(move, id);
		break;
		case "paper": 
		url = 'http://www.officexpress.co.uk/wp-content/uploads/2014/03/paper.jpg'
		var rockDisplay = document.getElementById(id);
		rockDisplay.style.backgroundImage = "url('" + url + "')";
	}
}
Game.displayWinner = function (winner, computerMove, playerMove) {
if (winner == 'player') {
	 maindisplay.innerHTML = capitalizeFirstLetter(playerMove) + " beats " + capitalizeFirstLetter(computerMove);
	player1wins.value++;
}
else if (winner == 'tie') {
maindisplay.innerHTML = "It's a tie! Let's try again.";
}
else { 
	maindisplay.innerHTML = "You Lost! " + capitalizeFirstLetter(computerMove) + " beats " + capitalizeFirstLetter(playerMove);
	player2wins.value++ ;}
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function giphyApi (move, id) {
  // move = search query
	request = new XMLHttpRequest;
	request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+ move + " hands", true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText).data.image_url;
			console.log(data);
			var moveDisplay = document.getElementById(id);
			moveDisplay.style.backgroundImage = "url('" + data + "')";

		} else {
			console.log('reached giphy, but API returned an error');
		 }
	};
	request.onerror = function() {
		console.log('connection error');
	};
	request.send();
};
window.onload = Game.setup();

