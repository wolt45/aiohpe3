IOHPEApp.controller('POSTOpHIP_preformCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_POSTOp_HIP_preform = [];

  	//http://vitalets.github.io/checklist-model/
	$scope.preForms = [
		  '1. To post-operative recovery room'
		, '2. Portable X-rays in bed-AP (anterior-posterior) and cross table lateral of Operative Hip.'
		, '3. Regular diet as tolerated.'
		, '4. Keep IV per ordered by Anesthesiologist.'
		, '5. Keep epidural anesthesia per order by Anesthesiologist.'
		, '6. Demerol 50-75 mgs every 3-4 hrs PRN.'
		, '7. Arcoxia 60, 90, 120 mgs once a day.'
		, '8. Aspirin 80mgs once a day, indifinitely.'

		, '9. Ferrous Sulfate 300 gms, three times daily for 3 months'
		, '10. Massive Ice Packs around the hip area continuously for 48 hrs'
		, '11. Measure and record drainage from Hemovac Suction'
		, '12. Repeat IV Cefuroxime 1.5 gms. Repeat 12 hrs one doze only'
		, '13. Repeat IV Cefazoline 2 gms in 8 hrs one doze only'

		, '14. HgB and Hematocrit in 48 hrs'
		, '15. Keep legs apart with two pillows or abduction pillow'

		, '16. Do not cross legs for at least 3 months.'
		, '17. May dangle on bed with assistance the post–operative day.'
		, '18. When sitting, keep feet turned out. Do not internally rotate leg in flexion.'
		, '19. Keep knee High TEDS stocking when up or awake. Use TEDS stockings for the next 6 weeks.'
		, '20. Ambulate on the second or third day with PT supervision or nurses assistance.'

		, '21. PT 2 times daily:'
		, '________ a. Foot and ankle pump 10 times every hour when awake.'
		, '________ b. Quadriceps and hamstring sitting exercise 10 times every hour when awake.'
		, '________ c. Active hip flexion not more than 90⁰.'
		, '________ d. Isometric abduction 1ox every hour when awake.'
		, '________ e. Ambulation with crutches or walker, weight bearing as tolerated.'
  	];

  	$scope.ClinixRID = $routeParams.p_clinixrid;

	$scope.LoadPOSTHipPreForm = function(){
	    var promise = $ipadrbg.context.clinix_POSTOp_HIP_preform.filter(function (px) { 
	    	return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
	      $scope.$apply(function () {
	        $scope.clinix_POSTOp_HIP_preform = pxresult;
	      });
	    });
	  };

 	$scope.LoadPOSTHipPreForm();

	$scope.addNew = function (OpObj) {
		for (i = 0; i < OpObj.length; i++) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,PostOp : OpObj[i]
			}
			$ipadrbg.context.clinix_POSTOp_HIP_preform.add(newrecord);
	    }
		$ipadrbg.context.clinix_POSTOp_HIP_preform.saveChanges();

		//alert("Entries Saved successfully!");

		$scope.LoadPOSTHipPreForm();
	};

  	$scope.removeItem = function (OpObj) {
    	OpObj.remove()
    		.then(function() {
      		$scope.$apply(function() {
       			var diagol = $scope.clinix_POSTOp_HIP_preform;
         		diagol.splice(diagol.indexOf(OpObj), 1);
      		});
    	})
   		.fail(function(err) {
    		alert("Error deleting item!");
   		});
  	}


	$scope.hipPostform = {
	    //preForms: ['hipPostform']
	};
	$scope.checkAll = function() {
		// alert("Hit!");
    	$scope.hipPostform.preForms = angular.copy($scope.preForms);
  	};
  	$scope.uncheckAll = function() {
    	$scope.hipPostform.preForms = [];
  	};

});