var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var lights = new Gpio(21, 'out'); //use GPIO pin 4, and specify that it is output
var pumpOne = new Gpio(20, 'out');
var pumpTwo = new Gpio(19, 'out');
var pumpThree = new Gpio(18, 'out');


module.exports.lightsOn = function(){
	//turn lights on
	console.log("Lights On");
	lights.writeSync(0);
}
module.exports.lightsOff = function(){
	//turn lights on
	console.log("Lights Off");
	lights.writeSync(1);
}

module.exports.pumpOn = function(pump, onDuration){
	//turn pumps on
	pump.writeSync(0);
	this.waterOn = setTimeout(function test2() {
		   			//turn off pump
	pump.writeSync(1);
		},onDuration*60*1000);
}


module.exports.cycleAllPumps = function(){
	console.log("pump cycle");
	pumpOn(pumpOne, 3);
	this.waterOn = setTimeout(function test2() {
	pumpOn(pumpTwo, 3);
	},20*60*1000);
	this.waterOn = setTimeout(function test2() {
	pumpOn(pumpThree, 5);
	},20*60*1000);
}