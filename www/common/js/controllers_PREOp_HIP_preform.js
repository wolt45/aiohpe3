IOHPEApp.controller('PREOpHIP_preformCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_PREOp_HIP_preform = [];

  	//http://vitalets.github.io/checklist-model/
	$scope.preForms = [
	    'Regular Orthopedic bed with trapeeze.'
	    , 'Regular diet or unless otherwise specified.'
	    , 'Get patient consent for Surgery.'
    	, 'Nothing by mouth after midnight (NPO).'
    	, 'Shower the night before surgery and wash with soap and water from umbilicus to knee of the schedule extremity wrap with clean towel.'
    	, 'Have BM the night before and empty bladder before going to surgery.'
    	, 'Type and x-match of packed red blood cells-units - PRBC.'
    	, 'Type and x-match of packed red blood cells-units - Fresh whole blood.'
    	, 'CBC (Hgb, Hct.) Hematocrit, Sed. Rate.'
    	, 'EKG.'
    	, 'Hemostan 1gm in OR and repeat 1/2gm in about 6-12 hrs.'
    	, 'Preoperative sedation per Anesthesiologist.'
  	];

  	//$scope.ClinixRID = $routeParams.p_clinixrid;
	// if ( Number($routeParams.p_clinixrid) <= 0 ) {
	// 	// get the localstorage value
	// 	$scope.CurrentClinixRID = localStorage.getItem('CurrentClinixRID');
	// 	}
	// else
		$scope.ClinixRID = $routeParams.p_clinixrid;

	// $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);


	$scope.LoadHipPreForm = function(){
	    var promise = $ipadrbg.context.clinix_PREOp_HIP_preform.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
	      $scope.$apply(function () {
	        $scope.clinix_PREOp_HIP_preform = pxresult;
	      });
	    });
	  };

 	$scope.LoadHipPreForm();

	$scope.addNew = function (OpObj) {
		for (i = 0; i < OpObj.length; i++) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,PreOp : OpObj[i]
			}
			$ipadrbg.context.clinix_PREOp_HIP_preform.add(newrecord);
	    }
		$ipadrbg.context.clinix_PREOp_HIP_preform.saveChanges();

		//alert("Entries Saved successfully!");

		$scope.LoadHipPreForm();
	};

  	$scope.removeItem = function (OpObj) {
    	OpObj.remove()
    		.then(function() {
      		$scope.$apply(function() {
       			var diagol = $scope.clinix_PREOp_HIP_preform;
         		diagol.splice(diagol.indexOf(OpObj), 1);
      		});
    	})
   		.fail(function(err) {
    		alert("Error deleting item!");
   		});
  	}


	$scope.hipPreform = {
	    //preForms: ['hipPreform']
	};
	$scope.checkAll = function() {
		// alert("Hit!");
    	$scope.hipPreform.preForms = angular.copy($scope.preForms);
  	};
  	$scope.uncheckAll = function() {
    	$scope.hipPreform.preForms = [];
  	};

});