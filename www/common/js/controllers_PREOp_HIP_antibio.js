IOHPEApp.controller('PREOpHIP_antibioCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_PREOp_HIP_antibio = [];

	$scope.ClinixRID = $routeParams.p_clinixrid;
	// $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

	$scope.antiBiotics = [
	    'Cefuroxime 1.5grms in the OR before induction. Repeat 12 hrs. after surgery.'
	    , 'Cefazolin 2grms in OR before induction repeat 8 hrs. After surgery.'
  	];

	$scope.LoadHipAntibio = function(){
	    var promise = $ipadrbg.context.clinix_PREOp_HIP_antibio.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
	      $scope.$apply(function () {
	        $scope.clinix_PREOp_HIP_antibio = pxresult;
	      });
	    });
	};

 	$scope.LoadHipAntibio();

	$scope.addNew = function (OpObj) {
		for (i = 0; i < OpObj.length; i++) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,Antibiotic : OpObj[i]
			}
			$ipadrbg.context.clinix_PREOp_HIP_antibio.add(newrecord);
	    }

		if (OpObj.others) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,Antibiotic : OpObj.others
			}
			$ipadrbg.context.clinix_PREOp_HIP_antibio.add(newrecord);
		}

		$ipadrbg.context.clinix_PREOp_HIP_antibio.saveChanges();

		OpObj.others = "";

		$scope.LoadHipAntibio();
	};

  	$scope.removeItem = function (OpObj) {
    	OpObj.remove()
    		.then(function() {
      		$scope.$apply(function() {
       			var diagol = $scope.clinix_PREOp_HIP_antibio;
         		diagol.splice(diagol.indexOf(OpObj), 1);
      		});
    	})
   		.fail(function(err) {
    		alert("Error deleting item!");
   		});
  	}


	$scope.hipAntibio = {
	    //antiBiotics: ['hipAntibio']
	};
	$scope.checkAll = function() {
		// alert("Hit!");
    	$scope.hipAntibio.antiBiotics = angular.copy($scope.antiBiotics);
  	};
  	$scope.uncheckAll = function() {
    	$scope.hipAntibio.antiBiotics = [];
  	};
});