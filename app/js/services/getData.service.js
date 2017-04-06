//(function () {
	function getDataService($q, $http) {

		var getData = {
			getUsers: getUsers
		};

		getData.users = [];

		function getUsers() {
			$http.get('data/users.json')
			  .then(
				function (response) {
					getData.users = response.data;
				},
				function (response) {
					console.log("error!" + response.status);
				}
			 );
		}
		getData.getUsers();
		
		/*function getUsers() {
			return $http({
				method: 'GET',
				url: 'data/users.json'
			})
			  .then(sendResponseData)
			  .catch(sendGetBooksError)
		}*/
		//getUsers();

		function sendResponseData(response) {
			getData.users = response.data;
			console.log(response.data);
			return response.data;
		}

		function sendGetBooksError(response) {
			return $q.reject('Error retrieving users(s). (HTTP status: ' + response.status + ')');
		}

		return getData;
	}

	angular.module('testApp')
	  .factory('getDataService', ['$q', '$http', getDataService]);

//})();