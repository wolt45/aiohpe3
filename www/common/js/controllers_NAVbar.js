IOHPEApp.controller('NAVbarCtrl', function ($scope, $routeParams, $http){
  	$scope.oneAtATime = true;
	$scope.zclinix = [];

	$scope.status = {
		isFirstOpen: true,
	    isFirstDisabled: false
	};

	$scope.LoadZClinix = function () {
	    var promise = $ipadrbg.context.zclinix.filter(function (tx) { 
	      	return tx.ClinixRID == this.id}, { id : $scope.ClinixRID}).toLiveArray();
	    	promise.then(function(txresult) {
	      	$scope.zclinix = txresult[0];

	      	$scope.$apply();

	      	//alert("HEY!: " + $scope.zclinix.ClinixRID );
	    });
	}
	$scope.LoadZClinix();
});