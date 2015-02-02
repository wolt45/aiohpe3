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

		, '16. PT 2 times daily:'
		, '........ a. Foot and ankle pump 10 times every hour when awake.'
		, '........ b. Quadriceps and hamstring sitting exercise 10 times every hour when awake.'
		, '........ c. Active hip flexion not more than 90⁰.'
		, '........ d. Isometric abduction 1ox every hour when awake.'
		, '........ e. Ambulation with crutches or walker, weight bearing as tolerated.'

		, '17. Do not cross legs for at least 3 months.'
		, '18. May dangle on bed with assistance the post–operative day.'
		, '19. When sitting, keep feet turned out. Do not internally rotate leg in flexion.'
		, '20. Keep knee High TEDS stocking when up or awake. Use TEDS stockings for the next 6 weeks.'
		, '21. Ambulate on the second or third day with PT supervision or nurses assistance.'
  	];

  	$scope.ClinixRID = $routeParams.p_clinixrid;

	$scope.LoadPOSTHipPreForm = function(){
	    var promise = $ipadrbg.context.clinix_POSTOp_HIP_preform.filter(function (px) { 
	    	return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
	      $scope.$apply(function () {
	      	if (pxresult.length > 0) {
	      		// alert('HIT Listed');
	      		$scope.clinix_POSTOp_HIP_preform = pxresult;
	      	}
	      	else {
	      		// alert('NO HIT Listed');
	      		$scope.addNew();
	      	}
	      });
	    });
	  };

 	$scope.LoadPOSTHipPreForm();

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
			$ipadrbg.context.clinix_POSTOp_HIP_preform.add(newrecord);
	    }
		$ipadrbg.context.clinix_POSTOp_HIP_preform.saveChanges();
		//alert("Entries Saved successfully!");
		$scope.LoadPOSTHipPreForm();
	};

	$scope.Update = function () {
		//alert("UPDATE HIT!");
        var OpObj = $scope.clinix_POSTOp_HIP_preform;
        
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        // db.transaction(function (tx) {
        //     tx.executeSql("delete from 'clinix_POSTOp_HIP_preform' WHERE ClinixRID = " + $scope.ClinixRID);
        // });

		for (i = 0; i < OpObj.length; i++) {
			var PostOpHIPpreformRID = OpObj[i].PostOpHIPpreformRID;
			var PostOp   = OpObj[i].PostOp;
			var PostOpYN = OpObj[i].PostOpYN;
			// var PostOpYN = PostOpHIPpreformRID;

			db.transaction(function (tx) {
            	tx.executeSql("UPDATE 'clinix_POSTOp_HIP_preform' SET PostOpYN = " + PostOpYN + " WHERE PostOpHIPpreformRID = " + PostOpHIPpreformRID );
        	});

			// newrecord = {
		 	//  ClinixRID : $scope.clinix.ClinixRID
		 	//  ,PxRID    : $scope.clinix.PxRID
			// 	,PostOp : PostOp
			// 	,PostOpYN : PostOpYN
			// }

			// $ipadrbg.context.clinix_POSTOp_HIP_preform.add(newrecord);
	    }
		// $ipadrbg.context.clinix_POSTOp_HIP_preform.saveChanges();
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

////////////////
	$scope.hipPostform = {
	    // clinix_POSTOp_HIP_preform : [ $scope.clinix_POSTOp_HIP_preform ]
	};
	$scope.checkAll = function() {
		// alert("Hit!");
    	$scope.hipPostform.clinix_POSTOp_HIP_preform = angular.copy($scope.clinix_POSTOp_HIP_preform);
  	};
  	$scope.uncheckAll = function() {
    	$scope.hipPostform.clinix_POSTOp_HIP_preform = [];
  	};
/////////////////






	// $scope.hipPostform = {
	//     // clinix_POSTOp_HIP_preform : [ $scope.clinix_POSTOp_HIP_preform.PostOpYN ]
	// };

	// $scope.checkAll = function() {
	// 	// alert("Hit!");
 //    	$scope.hipPostform.clinix_POSTOp_HIP_preform = angular.copy($scope.clinix_POSTOp_HIP_preform);
 //  	};

 //  	$scope.uncheckAll = function() {
 //    	$scope.hipPostform.clinix_POSTOp_HIP_preform = [];
 //  	};

});