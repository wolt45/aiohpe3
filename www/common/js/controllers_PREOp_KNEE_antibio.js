IOHPEApp.controller('PREOpKNEE_antibioCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_PREOp_KNEE_antibio = [];

	$scope.ClinixRID = $routeParams.p_clinixrid;
	// $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

	$scope.LoadKNEEAntibio = function(){
	    var promise = $ipadrbg.context.clinix_PREOp_KNEE_antibio.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
	      $scope.$apply(function () {
	        $scope.clinix_PREOp_KNEE_antibio = pxresult;
	      });
	    });
	  };

 	$scope.LoadKNEEAntibio();

	$scope.addNew = function (OpObj) {
		if (OpObj.Antibiotic1) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,Antibiotic : OpObj.Antibiotic1
			}
			$ipadrbg.context.clinix_PREOp_KNEE_antibio.add(newrecord);
		}
		if (OpObj.Antibiotic2) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,Antibiotic : OpObj.Antibiotic2
			}
			$ipadrbg.context.clinix_PREOp_KNEE_antibio.add(newrecord);
		}

		$ipadrbg.context.clinix_PREOp_KNEE_antibio.saveChanges();

		OpObj.Antibiotic1="";
		OpObj.Antibiotic2="";

		$scope.LoadKNEEAntibio();
	};

  	$scope.removeItem = function (OpObj) {
    	OpObj.remove()
    		.then(function() {
      		$scope.$apply(function() {
       			var diagol = $scope.clinix_PREOp_KNEE_antibio;
         		diagol.splice(diagol.indexOf(OpObj), 1);
      		});
    	})
   		.fail(function(err) {
    		alert("Error deleting item!");
   		});
  	}
});