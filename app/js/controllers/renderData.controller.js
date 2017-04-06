//(function () {

	function renderUsersController(getDataService) {

		var vm = this;
		
		vm.users = [];
		
		vm.getUsers = function() {
			//getData.getUsers();
			vm.users = getDataService.users;
			console.log(getData.users);
		};
		vm.getUsers();
		
	}
	
	angular.module('testApp')
	  .controller('renderUsersController', ['getData', renderUsersController]);

//})();	