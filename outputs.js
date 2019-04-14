var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var lights = new Gpio(13, 'out'); //use GPIO pin 4, and specify that it is output
var pumpOne = new Gpio(4, 'out');
var pumpTwo = new Gpio(5, 'out');
var pumpThree = new Gpio(6, 'out');


module.exports.lightsOn = function(){
	//turn lights on
	console.log("Lights On");
	lights.writeSync(1);
}
module.exports.lightsOff = function(){
	//turn lights on
	console.log("Lights Off");
	lights.writeSync(0);
}

var pumpOn = function(pump, onDuration){
	//turn pumps on
	console.log("pump " + pump +" on");
	pump.writeSync(1);
	this.waterOn = setTimeout(function test2() {
		//turn off pump
		pump.writeSync(0);
		console.log("pump " + pump +" off");
		},onDuration*60*1000);
}


module.exports.cycleAllPumps = function(){
	console.log("pump cycle");
	pumpOn(pumpOne, 3);
	setTimeout(function() {
	pumpOn(pumpTwo, 3);
	},20*60*1000);
	setTimeout(function() {
	pumpOn(pumpThree, 5);
	},40*60*1000);
}
