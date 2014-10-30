IOHPEApp.controller('POSTOpKNEE_preformCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_POSTOp_KNEE_preform = [];

  	//http://vitalets.github.io/checklist-model/
	$scope.preForms = [
	      'To post-operative recovery room.'
		, 'Anterior-Posterior (AP) and Lateral X-rays of operated knee.  Be sure the patella and foot are facing up-right.'
		, 'Regular diet as tolerated.'
		, 'Keep IV per ordered by Anesthesiologist.'
		, 'Keep epidural anesthesia per order by Anesthesiologist.'
		, 'Demoral 50-75 mgs every 3-4 hrs PRN.'
		, 'Arcoxia 60, 90, 120 mgs once a day.'
		, 'Aspirin 80 mgs, daily indefinitely.'
		, 'Ferrous sulfate 300 mgs, three times a day for 3 months.'

		, 'Massive ICE packs around the knee area continuously for 48 hrs.'
		, 'Measure and record drainage from Hemovac suction.'
		, 'Repeat IV Cefuroxime 1.5 gms in 12 hrs. one doze only.'
		, 'Repeat IV Cefazoline 2 gms in 8 hrs one doze only.'

		, 'HgB and Hematocrit in 48 hrs.'
		, 'Wear knee immobilizer at night x3 weeks.'
		, 'PT 2x dly, Foot and Ankle pump 10 times every hour when awake.'
		, 'PT 2x dly, Quadriceps and hamstring sitting exercise 10 times every hour when awake.'
		, 'PT 2x dly, Isometric abduction with crutches or walker, weight bearing as tolerated.'

		, 'Do not cross legs for at least 3 months.'
		, 'May dangle on bed with assistance the first post-operative day.'
		, 'When sitting, keep feet turned out.  Do not internally rotate leg in flexion.'
		, 'Keep thigh high TEDS stockings when up or awake.  Use TEDS stockings for the next 6 weeks in both legs.'
		, 'Ambulate on the 2nd or 3rd with PT supervision or nurses assistance.'
  	];

	$scope.ClinixRID = $routeParams.p_clinixrid;

	$scope.LoadKneePOSTForm = function(){
	    var promise = $ipadrbg.context.clinix_POSTOp_KNEE_preform.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
	      $scope.$apply(function () {
	        $scope.clinix_POSTOp_KNEE_preform = pxresult;
	      });
	    });
	  };

 	$scope.LoadKneePOSTForm();

	$scope.addNew = function (OpObj) {
		for (i = 0; i < OpObj.length; i++) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,PostOp : OpObj[i]
			}
			$ipadrbg.context.clinix_POSTOp_KNEE_preform.add(newrecord);
	    }
		$ipadrbg.context.clinix_POSTOp_KNEE_preform.saveChanges();

		//alert("Entries Saved successfully!");

		$scope.LoadKneePOSTForm();
	};

  	$scope.removeItem = function (OpObj) {
    	OpObj.remove()
    		.then(function() {
      		$scope.$apply(function() {
       			var diagol = $scope.clinix_POSTOp_KNEE_preform;
         		diagol.splice(diagol.indexOf(OpObj), 1);
      		});
    	})
   		.fail(function(err) {
    		alert("Error deleting item!");
   		});
  	}

	$scope.kneePostform = {
	    //preForms: ['kneePostform']
	};
	$scope.checkAll = function() {
		// alert("Hit!");
    	$scope.kneePostform.preForms = angular.copy($scope.preForms);
  	};
  	$scope.uncheckAll = function() {
    	$scope.kneePostform.preForms = [];
  	};

});