var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var lights = new Gpio(21, 'out'); //use GPIO pin 4, and specify that it is output
var pump = new Gpio(20, 'out');

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
module.exports.pumpOn = function(){
	//turn lights on
	console.log("Pump On");
	pump.writeSync(0);
}
module.exports.pumpOff = function(){
	//turn lights on
	console.log("Pump off");
	pump.writeSync(1);
}
