var outputs = require('./outputs');
const lightStart = 2;
const lightCycle = 12;
const firstCycle = 2;
const cycleNum = 6;

var lightEnd = lightStart+lightCycle;
var x = cycleNum - 1;
var cycleHours = Math.round(24/cycleNum);
var cycleLength = 24*60*60*1000/cycleNum;
var rest = cycleLength; //cycle length
var cycleTimes = [];

while(x>=0){
cycleTimes.push(firstCycle + (x*cycleHours))
	x--
}
console.log(cycleTimes);
module.exports = class Automate{
	constructor(){
		this.started = false;
		this.lightson = false;
		this.lightInterval;
		this.waterInterval;
		this.waterOn;
	}
	start(){
		//flash green
		let testCycle = setInterval(()=>{
			var dt = new Date();
			console.log(dt.getHours());
			if (cycleTimes.includes(dt.getHours())){
				console.log ('true');
				this.light();
				if(!this.started){
					//this.light();
					var water =()=> {
			   		//flood
			   		console.log("cycle all pumps");
			   		outputs.cycleAllPumps();
						this.started = true;
					}
					water();
					this.waterOn = setInterval(water, rest);
					clearInterval(testCycle);
					setInterval(()=>{}, 60*1000);
				}
			}
		}, 30*1000);//time to test for cycle times

	}
	light(){
		this.lightInterval = setInterval(()=> {
			var dt = new Date(); // moved up top

			if(dt.getHours()>=lightStart&&dt.getHours()<lightEnd&&!this.lightson){
				clearInterval(this.lightInterval);
				console.log("lights on");
				outputs.lightsOn();
				this.lightson = true;
				this.lightInterval = setTimeout(() =>{
	   			//turn off light
	   			console.log("lights off");
	   			outputs.lightOff();
	   			this.lightson = false;
	   			this.light();
		   	}, lightCycle*60*60*1000);
			}
		}, 30 * 60 * 1000); // 45 minute
	}
	stop(){
		//flash red
		clearInterval(this.lightInterval);
		clearInterval(this.waterInterval); //is this suppose to be a clear interval as well?
		outputs.pumpOff();
		outputs.lightsOff();
		this.started = false;
	}


}
