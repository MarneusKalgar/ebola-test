(function () {
	"use strict";
	
	function getDataService($q, $http) {

		return {
			getInitUsers: getInitUsers,
			getUsers: getUsers,
			getAllUsers: gerAllUsers
		};
		var initUsers;
		var users;

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

		//return dataService;
	}

	angular.module('testApp')
	  .factory('getDataService', ['$q', '$http', getDataService]);

})();