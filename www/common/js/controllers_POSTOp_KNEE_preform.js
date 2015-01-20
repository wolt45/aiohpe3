IOHPEApp.controller('POSTOpKNEE_preformCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_POSTOp_KNEE_preform = [];

  	//http://vitalets.github.io/checklist-model/
	$scope.preForms = [
	      '1. To post-operative recovery room.'
		, '2. Anterior-Posterior (AP) and Lateral X-rays of operated knee.  Be sure the patella and foot are facing up-right.'
		, '3. Regular diet as tolerated.'
		, '.4 Keep IV per ordered by Anesthesiologist.'
		, '5. Keep epidural anesthesia per order by Anesthesiologist.'
		, '6. Demoral 50-75 mgs every 3-4 hrs PRN.'
		, '7. Arcoxia 60, 90, 120 mgs once a day.'
		, '8. Aspirin 80 mgs, daily indefinitely.'
		, '9. Ferrous sulfate 300 mgs, three times a day for 3 months.'

		, '10. Massive ICE packs around the knee area continuously for 48 hrs.'
		, '11. Measure and record drainage from Hemovac suction.'
		, '12. Repeat IV Cefuroxime 1.5 gms in 12 hrs. one doze only.'
		, '13. Repeat IV Cefazoline 2 gms in 8 hrs one doze only.'

		, '14. HgB and Hematocrit in 48 hrs.'
		, '15. Wear knee immobilizer at night x3 weeks.'
		, '16. PT 2x dly:'
		, '...... a. Foot and Ankle pump 10 times every hour when awake.'
		, '...... b. Quadriceps and hamstring sitting exercise 10 times every hour when awake.'
		, '.......c. Isometric abduction with crutches or walker, weight bearing as tolerated.'

		, '17. May dangle on bed with assistance the first post-operative day.'
		, '18. When sitting, keep feet turned out.  Do not internally rotate leg in flexion.'
		, '19. Keep thigh high TEDS stockings when up or awake.  Use TEDS stockings for the next 6 weeks in both legs.'
		, '20. Ambulate on the 2nd or 3rd with PT supervision or nurses assistance.'
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

	$scope.addNew = function () {
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("delete from 'clinix_POSTOp_HIP_preform' WHERE ClinixRID = " + $scope.ClinixRID);
        });

		for (i = 0; i < $scope.preForms.length; i++) {
			newrecord = {
		        ClinixRID : $scope.clinix.ClinixRID
		        ,PxRID    : $scope.clinix.PxRID

				,PostOp : $scope.preForms[i]
				,PostOpYN : "1"
			}
			$ipadrbg.context.clinix_POSTOp_KNEE_preform.add(newrecord);
	    }
		$ipadrbg.context.clinix_POSTOp_KNEE_preform.saveChanges();
		//alert("Entries Saved successfully!");
		$scope.LoadKneePOSTForm();
	};

	$scope.Update = function () {
		//alert("UPDATE HIT!");
        var OpObj = $scope.clinix_POSTOp_KNEE_preform;
        
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        // db.transaction(function (tx) {
        //     tx.executeSql("delete from 'clinix_POSTOp_KNEE_preform' WHERE ClinixRID = " + $scope.ClinixRID);
        // });

		for (i = 0; i < OpObj.length; i++) {
			var PostOpKNEEpreformRID = OpObj[i].PostOpKNEEpreformRID;
			var PostOp   = OpObj[i].PostOp;
			var PostOpYN = OpObj[i].PostOpYN;
			// var PostOpYN = PostOpKNEEpreformRID;

			db.transaction(function (tx) {
            	tx.executeSql("UPDATE 'clinix_POSTOp_KNEE_preform' SET PostOpYN = " + PostOpYN + " WHERE PostOpKNEEpreformRID = " + PostOpKNEEpreformRID );
        	});

			// newrecord = {
		 	//  ClinixRID : $scope.clinix.ClinixRID
		 	//  ,PxRID    : $scope.clinix.PxRID
			// 	,PostOp : PostOp
			// 	,PostOpYN : PostOpYN
			// }

			// $ipadrbg.context.clinix_POSTOp_KNEE_preform.add(newrecord);
	    }
		// $ipadrbg.context.clinix_POSTOp_KNEE_preform.saveChanges();
		//alert("Entries Saved successfully!");
		$scope.LoadPOSTHipPreForm();
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
    	$scope.kneePostform.clinix_POSTOp_KNEE_preform = angular.copy($scope.clinix_POSTOp_KNEE_preform);
  	};
  	$scope.uncheckAll = function() {
    	$scope.kneePostform.clinix_POSTOp_KNEE_preform = [];
  	};
});