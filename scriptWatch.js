var stopwatchController = (function(){

	var data = {

	};

	return {
		getData: function() {
			return data;
		},


		startupApp: function() {
			var currentDate = new Date();
			var targetDate = new Date(2020, 4, 30, 16, 30, 10);
			console.log("currentDate: " + currentDate);
			console.log("targetDate: " + targetDate);

			const diffTime = Math.abs(targetDate - currentDate);
			console.log("diffTime: " + diffTime);

			const diffSecs = Math.ceil(diffTime / 1000);
			console.log(diffSecs);

			const addedTime = currentDate.setSeconds(currentDate.getSeconds() + 30);
			console.log("addedTime: " + currentDate);


	         var dt = new Date();
	         dt.setMinutes( dt.getMinutes() + 30 );
	         console.log("dt: " + dt);		

		},	

	};




}) ();





var UIController = (function(){


	var UIData = stopwatchController.getData();

	var DOMStrings = {

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

	var setUpEventListeners = function() {

	};



	return {
		init: function() {
			console.log("application has started successfully");
			
			setUpEventListeners();

			stpwchCtrl.startupApp();

		}
	} 


}) (stopwatchController, UIController);


globalController.init();