var stopwatchController = (function(){

	var data = {
		time: {
			estimatedDuration: 1800, /*30 minutes in seconds*/
			targetDate: 0,
			dateAtStart: 0,
			timeAtPause: 0,
			newTargetDate: 0
		}

	};

	return {
		getData: function() {
			return data;
		},


		getTargetDate: function(estimate) {
			// get current time
			const targetDate = new Date();
			const dateAtStart = new Date();			
			console.log(`estimate duration of task: ${data.time.estimatedDuration}`);
			data.time.dateAtStart = dateAtStart;


			// add to the current time a set time for completion (data.time.estimatedDuration)
			this.addToDate(targetDate,estimate);

			// add the resulting time to data storage
			data.time.targetDate = targetDate;
			console.log(`target date: ${targetDate}`)
		},

		getNewTargetDate: function() {

		},

		getDifference: function(target) {

			const current = new Date();

			// console.log(`current date: ${current}`);
			// console.log(`targetDate: ${target}`);

			// calculate the difference between current time and target time in milliseconds
			const diffTime = Math.abs(target - current);
			// console.log(`diffTime ${diffTime}`);
			const diffSecs = Math.ceil(diffTime / (1000));

			console.log(`${diffSecs}`);

			return diffSecs;

		},


		getPausedDate: function() {
			const pausedDate = new Date();
			data.time.timeAtPause = pausedDate;

			console.log(`paused date is: ${data.time.timeAtPause}`);


		},

		addToDate: function(date, durationToAdd) {
			const newTarget = date;

			newTarget.setSeconds(newTarget.getSeconds() + durationToAdd);

			return newTarget;
		}



	};




}) ();





var UIController = (function(){


	var UIData = stopwatchController.getData();

	var DOMStrings = {
		timerButtons: {
			start: "#start",
			pause: "#pause",
			resume: "#resume"
		}
	};

	return {
		getDOMStrings: function() {
			return DOMStrings;
		},

	}

}) ();


var globalController = (function(stpwchCtrl, UICtrl){

	var DOM, controllerData;


	DOM = UICtrl.getDOMStrings();
	controllerData = stpwchCtrl.getData();

	const timeCompletion = controllerData.time.estimatedDuration;

	var setUpEventListeners = function() {
		console.log("event listeners set up successfully");

		document.querySelector(DOM.timerButtons.start).addEventListener("click", startTimer);
		document.querySelector(DOM.timerButtons.resume).addEventListener("click", resumeTimer);		
	};

		//Pause function
		var pause = function(countDown) {
			console.log(`PAUSE`);
			clearInterval(countDown);
			pauseTimer();
		}	
	
		var pauseTimer = function() {
			stpwchCtrl.getPausedDate();
		};

	var startTimer = function() {
		// get the target date and save that specific date in storage of a data
		stpwchCtrl.getTargetDate(timeCompletion);

		console.log(`initial target date: ${controllerData.time.targetDate}`);

		// get the difference between the current date and the target date every second and display the result in the console
		const countDown = setInterval(function() {stpwchCtrl.getDifference(controllerData.time.targetDate);}, 1000); 

		document.querySelector(DOM.timerButtons.pause).addEventListener("click", pause(countDown));
	};




	var resumeTimer = function() {

		// get the time that happened during user pause
		const durationPause = stpwchCtrl.getDifference(controllerData.time.timeAtPause);

		// set new final date
		const newTargetDate = stpwchCtrl.addToDate(controllerData.time.targetDate, durationPause);

		console.log(`new target date after pause: ${newTargetDate}`);

		// start the timer again with the updated target date
		const countDown = setInterval(function() {stpwchCtrl.getDifference(newTargetDate);}, 1000);	

		document.querySelector(DOM.timerButtons.pause).addEventListener("click", pause(countDown));


	};


	return {
		init: function() {
			console.log("application has started successfully");

			setUpEventListeners();

			console.log(`placeholder for time of completion of task: ${controllerData.time.estimatedDuration} seconds`);

			// stpwchCtrl.startupApp();

		}
	} 


}) (stopwatchController, UIController);


globalController.init();
