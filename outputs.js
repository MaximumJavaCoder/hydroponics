var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var lights = new Gpio(13, 'out'); //use GPIO pin 4, and specify that it is output
var pumpOne = new Gpio(6, 'out');
var pumpTwo = new Gpio(5, 'out');
var pumpThree = new Gpio(4, 'out');


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

var pumpOn = function(pump, onDuration, number){
	//turn pumps on
	console.log("pump " + number +" on");
	pump.writeSync(1);
	this.waterOn = setTimeout(function test2() {
		//turn off pump
		pump.writeSync(0);
		console.log("pump " + number +" off");
		},onDuration*1000);
}


module.exports.cycleAllPumps = function(){
	console.log("pump cycle");
	pumpOn(pumpOne, 180, 1);
	setTimeout(function() {
	pumpOn(pumpTwo, 120, 2);
	},20*60*1000);
	setTimeout(function() {
	pumpOn(pumpThree, 90, 3);
	},40*60*1000);
}
