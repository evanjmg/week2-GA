// Global Variable
var allUserData = [];

function logStuff(userData) {
	if (typeof userData === "string") {
		console.log(userData)
	}
		else if (typeof userData === "object") {
			for (var item in userData)
 {
 		console.log(item + ": " +userData[item]);
 }		}
}

function getInput(options, callback) {
	allUserData.push(options);
	callback(options)
}
getInput({name: 'Evan', speciality: "Ruby"}, logStuff);

// we do a lot of these deep call backs (multiple running) at the same time in node. 
// for multiple parameters passed in use an annonymous function.