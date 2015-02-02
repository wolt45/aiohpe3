IOHPEApp.controller('PREOpHIP_preformCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_PREOp_HIP_preform = [];

  	//http://vitalets.github.io/checklist-model/
	$scope.preForms = [
	      '1. Regular hospital bed.'
	    , '2. Regular diet or unless otherwise specified.'
	    , '3. Get patient consent for Surgery.'
    	, '4. Nothing by mouth after midnight (NPO).'
    	, '5. Shower the night before surgery and wash with soap and water from umbilicus to knee of the schedule extremity wrap with clean towel.'
    	, '6. Have BM the night before and empty bladder before going to surgery.'
    	, '7. Type and x-match of packed red blood cells-units'

    	, '...... a. PRBC.'
    	, '...... b. Fresh whole blood'
    	, '8. CBC (Hgb, Hct.) Hematocrit, Sed. Rate.'
    	, '9. EKG.'
    	, '10. Hemostan 1gm in OR and repeat 1/2gm in about 6-12 hrs.'
    	, '11. Contact.'
    	, '...... a. Admitting Surgeon'
    	, '...... b. Anesthesiologist'
    	, '...... c. Internist or Cardiologist'
    	, '12. Preoperative sedation per Anesthesiologist.'
    	, '13. Antibiotics'
    	, '...... a. Cefuroxime 1.5grms in the OR before induction. Repeat 12 hrs. after surgery.'
	    , '...... b. Cefazolin 2grms in OR before induction repeat 8 hrs. after surgery.'
	    , '...... c. Others'
	    , '14. Trenacemic acid 1gm, 30 mins in OR before induction'
	    , '15. Please inform relatives to wait outside of the operating room to talk to surgeon after surgery is finished.'
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
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("delete from 'clinix_PREOp_HIP_preform' WHERE ClinixRID = " + $scope.ClinixRID);
        });

		for (i = 0; i < OpObj.length; i++) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,PreOp : OpObj[i]
				,PreOpYN : "1"
			}
			$ipadrbg.context.clinix_PREOp_HIP_preform.add(newrecord);
	    }
		$ipadrbg.context.clinix_PREOp_HIP_preform.saveChanges();
		//	alert("Entries Saved successfully!");
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