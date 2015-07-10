var clientData = {
	fullname: "Not set",
	setUsername: function(firstName, lastName) {
		this.fullname = firstName + '' + lastName;
		// this refers to the window - callbacks reset to window for get user input
	}
};

function getUserInput(firstName, lastName, callback) {
	callback(firstName, lastName);
}

getUserInput("Barack", "Jones", clientData.setUsername);

console.log(window.fullName);


// make it clientData not window

var clientData = {
	fullname: "Not set",
	setUsername: function(firstName, lastName) {
		this.fullname = firstName + '' + lastName;
		// this refers to the window - callbacks reset to window for get user input
	}
};

function getUserInput(firstName, lastName, callback, callbackobj) {
	callback.apply(callbackObj, [firstName, lastName]);
// apply is the same as call but uses an array.
}

getUserInput("Barack", "Jones", clientData.setUsername);

console.log(window.fullName);

// call, apply, and bind. - bind doesn't take arguments, call takes just arguments, apply takes [array for next pass]
// try to only have two and maybe annoymous if you're lazy, for annoymous function using a library just doing use that library function - if they are similar then just make annon