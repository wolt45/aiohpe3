IOHPEApp.controller('PREOpHIP_contactCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_PREOp_HIP_contact = [];

  	//http://vitalets.github.io/checklist-model/
	$scope.conTacts = [
	    'Admitting Surgeon', 
	    'Anesthesiologist', 
    	'Internist or Cardiologist', 
    	'Preoperative sedation per Anesthesiologist'
  	];

	$scope.CurrentClinixRID = $routeParams.p_clinixrid;
	// $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

	$scope.LoadHipContact = function(){
	    var promise = $ipadrbg.context.clinix_PREOp_HIP_contact.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
	      $scope.$apply(function () {
	        $scope.clinix_PREOp_HIP_contact = pxresult;
	      });
	    });
	  };

 	$scope.LoadHipContact();

	$scope.addNew = function (OpObj) {
		for (i = 0; i < OpObj.length; i++) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,Contact : OpObj[i]
			}
			$ipadrbg.context.clinix_PREOp_HIP_contact.add(newrecord);
	    }

		if (OpObj.otHers) {
      		newrecord = {
       			ClinixRID : $scope.clinix.ClinixRID
        		,PxRID    : $scope.clinix.PxRID

       			,Contact  : OpObj.otHers
     		}
      		$ipadrbg.context.clinix_PREOp_HIP_contact.add(newrecord);
    	}

		$ipadrbg.context.clinix_PREOp_HIP_contact.saveChanges();

		OpObj.otHers = "";

		alert("Entries Saved successfully!");

		$scope.LoadHipContact();
	};

  	$scope.removeItem = function (OpObj) {
    	OpObj.remove()
    		.then(function() {
      		$scope.$apply(function() {
       			var diagol = $scope.clinix_PREOp_HIP_contact;
         		diagol.splice(diagol.indexOf(OpObj), 1);
      		});
    	})
   		.fail(function(err) {
    		alert("Error deleting item!");
   		});
  	}


	$scope.hipContact = {
	    conTacts: ['hipContact']
	};
	$scope.checkAll = function() {
		// alert("Hit!");
    	$scope.hipContact.conTacts = angular.copy($scope.conTacts);
  	};
  	$scope.uncheckAll = function() {
    	$scope.hipContact.conTacts = [];
  	};
});