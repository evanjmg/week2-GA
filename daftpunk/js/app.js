
var fileNames = { "Work It": 'work_it.wav',
"Make It": 'make_it.wav', 
"Do It":'do_it.wav',
"Makes Us": 'makes_us.wav', 
"Harder": 'harder.wav', 
"Better": 'better.wav',
"Faster": 'faster.wav',
"Stronger": 'stronger.wav',
"More Than": 'more_than.wav',
"Hour": 'hour.wav',
"Our": 'our.wav',
"Never": 'never.wav',
"Ever": 'ever.wav',
"After":'after.wav',
"Work Is": 'work_is.wav',
"Work It": 'work_it.wav',
"More than":'more_than.wav',
"Over": 'over.wav' } 
workoutGifs = ["http://media0.giphy.com/media/uVeRAiG1E30SA/giphy.gif", "http://media.giphy.com/media/EPuZKahyhYHxC/giphy.gif", 
'http://media.giphy.com/media/fUBb46g6lf4wo/giphy.gif', 'http://media.giphy.com/media/R2s69ZdZjx4I0/giphy.gif', "http://media.giphy.com/media/8fQQDSWKz7692/giphy.gif"
]

var daftPlayer = daftPlayer || {},
playButtons = [],
currentImage = document.getElementById("top-screen");



daftPlayer.setup = function () {
	this.self = this;
	var i = 1;
	playButtons[i] = "";
	for(i;i< 18;i++) { 
		playButtons[i] = document.getElementById('sound'+i);
		playButtons[i].addEventListener('click', daftPlayer.playClickHandler);
		playButtons[i].addEventListener('click', giphyApi);
		playButtons[i].addEventListener('click', randomBorderGen)
	}
}
daftPlayer.getSound = function(sound) {
	daftPlayer.url = 'sounds/'+ sound;
	daftPlayer._currentSound = soundManager.createSound({
		url: daftPlayer.url
	});
	return daftPlayer._currentSound;
}

daftPlayer.playClickHandler = function () {
	var sound = fileNames[this.innerHTML];
	daftPlayer.play(sound);
	giphyApi();
}
daftPlayer.play = function(sound) {
	daftPlayer.getSound(sound);
	daftPlayer._currentSound.play();
}

soundManager.setup({
	url: '/swf/',
	preferFlash: true,
	onready: daftPlayer.setup
});

function giphyApi () {
	q = this.innerHTML + " Daft Punk" // search query
	
	request = new XMLHttpRequest;
	request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+q, true);
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText).data.image_url;
			console.log(data);
			leftScreen = document.getElementById("left-screen")
			leftScreen.style.backgroundImage = "url('" + data + "')";

		} else {
			console.log('reached giphy, but API returned an error');
		 }
	};
 
	request.onerror = function() {
		console.log('connection error');
	};
 
	request.send();

};

function randomBorderGen () {
	var borders = ["dotted", "dashed","double", "groove", "outset"]
	var index = Math.floor(Math.random() * borders.length);
	var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	headerImg = this.style.border = "5px " + borders[index] + " " + hue;
	};

