(function () {
	"use strict";
	
	function getDataService($http) {
		var initUsers;
		var users;
		
		return {
			getInitUsers: getInitUsers,
			getUsers: getUsers,
			getAllUsers: gerAllUsers
		};


		//get initial set of users
		function getInitUsers() {
			var promise = $http({
				method: "GET",
				url: "http://ebola.agency/frontend-task.php?page=1&per_page=20"
			});
			promise.then(function (response) {
				initUsers = response.data.data;
				  console.log("coming from http-server", initUsers);
				  return initUsers;
			  });
			return promise;
		}

		//get the set of users based on page number
		function getUsers(id) {
			var promise = $http({
				method: "GET",
				url: "http://ebola.agency/frontend-task.php?page=" + id + "&per_page=20"
			});
			promise.then(function (response) {
				users = response.data.data;
				console.log("coming from http-server", users);
				return users;
			});
			return promise;
		}

		//get the all users set
		function gerAllUsers() {
			var promise = $http({
				method: "GET",
				url: "http://ebola.agency/frontend-task.php?per_page=100"
			});
			promise.then(function (response) {
				users = response.data.data;
				console.log("coming from http-server", users);
				return users;
			});
			return promise;
		}
	}

	angular.module('testApp')
	  .factory('getDataService', ['$http', getDataService]);

})();