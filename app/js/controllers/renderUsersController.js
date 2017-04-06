(function () {

	function renderUsersCtrl(getDataService) {

		var vm = this;
		
		/*vm.users = [];
		vm.success = false;
		vm.error = true;
		vm.reason = false;

		vm.user = {};

		vm.getUsers = function() {
			console.log("fire");
			var askForPromise = getDataService.getUsers();

			askForPromise.then(
			  function(response) {
				  vm.users = response.data.data;
				  vm.success = true;
				  console.log("coming from service", vm.users);
			  },
			  function(reason) {
				  vm.reason = reason;
				  vm.error = true;
			  }
			);

		};

		vm.getUsers();


		vm.users = [{
			"first_name": "Eli",
			"last_name": "Feil",
			"patronymic_name": "Lucinda",
			"discount": 15,
			"id": 81
		}, {
			"first_name": "Ashly",
			"last_name": "Baumbach",
			"patronymic_name": "Jarred",
			"discount": 40,
			"id": 82
		}, {
			"first_name": "Karolann",
			"last_name": "Zulauf",
			"patronymic_name": "Weston",
			"discount": 20,
			"id": 83
		}, {
			"first_name": "Minerva",
			"last_name": "Champlin",
			"patronymic_name": "Alvina",
			"discount": 77,
			"id": 84
		}, {
			"first_name": "Jalyn",
			"last_name": "Bins",
			"patronymic_name": "Bertrand",
			"discount": 59,
			"id": 85
		}, {
			"first_name": "Lon",
			"last_name": "Jenkins",
			"patronymic_name": "Dolores",
			"discount": 4,
			"id": 86
		}, {
			"first_name": "Jalyn",
			"last_name": "Armstrong",
			"patronymic_name": "Larry",
			"discount": 51,
			"id": 87
		}, {
			"first_name": "Vincenzo",
			"last_name": "Lemke",
			"patronymic_name": "Keon",
			"discount": 83,
			"id": 88
		}, {
			"first_name": "Hunter",
			"last_name": "Kohler",
			"patronymic_name": "Chris",
			"discount": 91,
			"id": 89
		}, {
			"first_name": "Angelina",
			"last_name": "Wiza",
			"patronymic_name": "Abigail",
			"discount": 88,
			"id": 90
		}, {
			"first_name": "Lexie",
			"last_name": "Murray",
			"patronymic_name": "Hoyt",
			"discount": 12,
			"id": 91
		}, {
			"first_name": "Chandler",
			"last_name": "O'Keefe",
			"patronymic_name": "Hudson",
			"discount": 46,
			"id": 92
		}, {
			"first_name": "Chester",
			"last_name": "Larson",
			"patronymic_name": "Helmer",
			"discount": 45,
			"id": 93
		}, {
			"first_name": "Casimer",
			"last_name": "Haag",
			"patronymic_name": "Lue",
			"discount": 55,
			"id": 94
		}, {
			"first_name": "Laisha",
			"last_name": "Lang",
			"patronymic_name": "Ivah",
			"discount": 31,
			"id": 95
		}, {
			"first_name": "Murphy",
			"last_name": "Bauch",
			"patronymic_name": "Zoila",
			"discount": 14,
			"id": 96
		}, {
			"first_name": "Brittany",
			"last_name": "Blanda",
			"patronymic_name": "Oscar",
			"discount": 79,
			"id": 97
		}, {
			"first_name": "Garry",
			"last_name": "Breitenberg",
			"patronymic_name": "Name",
			"discount": 76,
			"id": 98
		}, {
			"first_name": "Pearl",
			"last_name": "Walsh",
			"patronymic_name": "Jailyn",
			"discount": 54,
			"id": 99
		}, {
			"first_name": "Hilton",
			"last_name": "Kassulke",
			"patronymic_name": "Marshall",
			"discount": 34,
			"id": 100
		}];
		console.log(vm.users);*/
		
		vm.text = {
			f: "first",
			s: "second"
		};

		console.log(vm.text);

		/*vm.buildUserObj = function() {
			for (var i = 0; i < vm.users.length; i++ ) {
				//console.log(vm.users[i]);
				for (var j = i; j < 4; j++) {
					vm.user.first_name = vm.users[j].first_name;
					vm.user.last_name = vm.users[j].last_name;
					vm.user.patronymic_name = vm.users[j].patronymic_name;
					vm.user.discount = vm.users[j].discount;
				}
			}
		};
		vm.buildUserObj();

		console.log(vm.user);*/
	}
	
	angular.module('testApp')
	  .controller('renderUsersCtrl', ['getDataService', renderUsersCtrl]);

})();