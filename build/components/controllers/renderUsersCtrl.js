(function () {
	"use strict";

	function renderUsersCtrl($timeout, getDataService) {

		var vm = this;
		
		vm.users = [];
		vm.allUsers = [];
		vm.success = false;
		vm.error = true;
		vm.reason = false;

		//for preloader
		vm.isReady = false;

		//default values for ordering items
		vm.sortDir = false;
		vm.sortType = 'last_name';
		
		//the array for pagination
		vm.pags = [1,2,3,4,5];

		//get initial set of users
		vm.getInitUsers = function() {
			var askForPromise = getDataService.getInitUsers();

			askForPromise.then(
			  function(response) {
				  vm.users = response.data.data;
				  vm.success = true;
				  console.log("coming from service", vm.users);
				  preload(600);
			  },
			  function(reason) {
				  vm.reason = reason;
				  vm.error = true;
			  }
			);
		};
		vm.getInitUsers();

		//get the set of users based on page number
		vm.getUsers = function(obj) {
			var index = obj.target.attributes["data-index"].value;
			console.log(index);
			var askForPromise = getDataService.getUsers(index);

			askForPromise.then(
			  function(response) {
				  vm.users = response.data.data;
				  vm.success = true;
				  console.log("coming from service", vm.users);
				  //preload();
			  },
			  function(reason) {
				  vm.reason = reason;
				  vm.error = true;
			  }
			);
		};

		//toggle isActive class on selected item
		vm.select = function(item) {
			vm.selected = item;
		};
		
		vm.isActive = function(item) {
			return vm.selected === item;
		};

		//do user filtration
		vm.doSearch = function() {
			preload(500);
			vm.getAllUsers();
		};

		//get the all users set
		vm.getAllUsers = function() {
			var askForPromise = getDataService.getAllUsers();
			askForPromise.then(
			  function(response) {
				  vm.allUsers = response.data.data;
				  vm.success = true;
				  console.log("coming from service", vm.users);
			  },
			  function(reason) {
				  vm.reason = reason;
				  vm.error = true;
			  }
			);
		};

		//do preload
		function preload(speed) {
			$timeout(function() {
				vm.isReady = true;
			}, speed);
			vm.isReady = false;
		}
	}
	
	angular.module('testApp')
	  .controller('renderUsersCtrl', ['$timeout', 'getDataService', renderUsersCtrl]);

})();