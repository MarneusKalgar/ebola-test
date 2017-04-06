(function () {

	function testCtrl() {
		var vm = this;
		vm.text = "alert";
	}

	angular.module('testApp')
	  .controller('testCtrl', ['getDataService', testCtrl]);

})();