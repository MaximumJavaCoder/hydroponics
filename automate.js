var outputs = require('./outputs');
const lightStart = 2;
const lightCycle = 12;
const firstCycle = 2;
const cycleNum = 6;

var lightEnd = lightStart+lightCycle;
var x = cycleNum - 1;
var cycleHours = Math.round(24/cycleNum);
var cycleLength = 24*60*60*1000/cycleNum;
var rest = cycleLength - 1860000; //cycle length minus time to cycle all pumps
var cycleTimes = [];
var dt = new Date();

while(x>=0){
cycleTimes.push(firstCycle + (x*cycleHours))
	x--
}

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
		let testCycle = setInterval( function(){
			if (cycleTimes.includes(dt.getHours())){
				console.log ('true');
				this.light();
				if(!this.started){
					//this.light();
					var water =()=> {
				   		//flood plants
				   		outputs.cycleAllPumps();
						this.started = true;
					}
					water();
					this.waterOn = setInterval(water, rest);
					clearInterval(testCycle);
				}
			}
		}, 30*1000);//time to test for cycle times
		
	}
	light(){
		this.lightInterval = setInterval(function () {
			var dt = new Date(); < moved up top
		
			dt = dt.getTime(); // is this line necessary?

			if(dt.getHours()>=lightStart&&dt.getHours()<lightEnd&&!this.lightson){
				clearInterval(this.lightInterval);
				outputs.lightsOn();
				this.lightson = true;
				this.lightInterval = setTimeout(function() {
		   			//turn off light
		   			outputs.lightOff();
		   			this.lightson = false;
		   		}, lightCycle*60*60*1000);	
			}
		}, 30 * 60 * 1000); // 45 minute
	}
	stop(){
		//flash red
		clearInterval(this.lightInterval);
		setInterval(this.waterInterval); //is this suppose to be a clear interval as well?
		outputs.pumpOff();
		outputs.lightsOff();
		this.started = false;
	}
	

}
