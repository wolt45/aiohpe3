IOHPEApp.controller('PREOpKNEE_repeatbiCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_PREOp_KNEE_repeatBilateral = [];

  	//http://vitalets.github.io/checklist-model/
	$scope.repeatBils = [
	    'Cefazolin 2 Grms in OR before induction repeat 8 hrs. After surgery.', 
	    'Please inform relatives to wait outside of the operating room to talk to surgeon after surgery is finished.', 
  	];

	$scope.ClinixRID = $routeParams.p_clinixrid;
	// $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

	$scope.LoadKneeRepBilateral = function(){
	    var promise = $ipadrbg.context.clinix_PREOp_KNEE_repeatBilateral.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
	      $scope.$apply(function () {
	        $scope.clinix_PREOp_KNEE_repeatBilateral = pxresult;
	      });
	    });
	  };

 	$scope.LoadKneeRepBilateral();

	$scope.addNew = function (OpObj) {
		for (i = 0; i < OpObj.length; i++) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,RepeatBilateral : OpObj[i]
			}
			$ipadrbg.context.clinix_PREOp_KNEE_repeatBilateral.add(newrecord);
	    }

		if (OpObj.repeatBilOthers) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,RepeatBilateral : OpObj.repeatBilOthers
			}
			$ipadrbg.context.clinix_PREOp_KNEE_repeatBilateral.add(newrecord);
		}

		$ipadrbg.context.clinix_PREOp_KNEE_repeatBilateral.saveChanges();

		OpObj.repeatBilOthers="";

		alert("Entries Saved successfully!");

		$scope.LoadKneeRepBilateral();
	};

  	$scope.removeItem = function (OpObj) {
    	OpObj.remove()
    		.then(function() {
      		$scope.$apply(function() {
       			var diagol = $scope.clinix_PREOp_KNEE_repeatBilateral;
         		diagol.splice(diagol.indexOf(OpObj), 1);
      		});
    	})
   		.fail(function(err) {
    		alert("Error deleting item!");
   		});
  	}

  	$scope.hipRepeat = {
	    //repeatBils: ['hipRepeat']
	};
	$scope.checkAll = function() {
		// alert("Hit!");
    	$scope.hipRepeat.repeatBils = angular.copy($scope.repeatBils);
  	};
  	$scope.uncheckAll = function() {
    	$scope.hipRepeat.repeatBils = [];
  	};
});