IOHPEApp.controller('POSTOpKNEE_preformCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_POSTOp_KNEE_preform = [];
  	//http://vitalets.github.io/checklist-model/
	$scope.preForms = [
	      '1. To post-operative recovery room.'
		, '2. Anterior-Posterior (AP) and Lateral X-rays of operated knee.  Be sure the patella and foot are facing up-right.'
		, '3. Regular diet as tolerated.'
		, '4. Keep IV per ordered by Anesthesiologist.'
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

	        $scope.kneePostForm = {
		        ClinixRID : $scope.clinix.ClinixRID
        		,PxRID    : $scope.clinix.PxRID

				, Post01  : pxresult[0]['Post01'] 
				, Post02  : pxresult[0]['Post02'] 
				, Post03  : pxresult[0]['Post03'] 
				, Post04  : pxresult[0]['Post04'] 
				, Post05  : pxresult[0]['Post05'] 
				, Post06  : pxresult[0]['Post06'] 
				, Post07  : pxresult[0]['Post07'] 
				, Post08  : pxresult[0]['Post08'] 
				, Post09  : pxresult[0]['Post09'] 

				, Post10  : pxresult[0]['Post10'] 
				, Post11  : pxresult[0]['Post11'] 
				, Post12  : pxresult[0]['Post12'] 
				, Post13  : pxresult[0]['Post13'] 
				, Post14  : pxresult[0]['Post14'] 
				, Post15  : pxresult[0]['Post15'] 

				, Post16a : pxresult[0]['Post16a'] 
				, Post16b : pxresult[0]['Post16b'] 
				, Post16c : pxresult[0]['Post16c'] 
	
				, Post17  : pxresult[0]['Post17'] 
				, Post18  : pxresult[0]['Post18'] 
				, Post19  : pxresult[0]['Post19'] 
				, Post20  : pxresult[0]['Post20'] 
			}
	      });
	    });
	  };

 	$scope.LoadKneePOSTForm();

	$scope.addNew = function (OpObj) {
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("delete from 'clinix_POSTOp_KNEE_preform' WHERE ClinixRID = " + $scope.ClinixRID);
        });

		newrecord = {
	        ClinixRID : $scope.clinix.ClinixRID
	        ,PxRID    : $scope.clinix.PxRID

			, Post01  : OpObj.Post01 
			, Post02  : OpObj.Post02
			, Post03  : OpObj.Post03
			, Post04  : OpObj.Post04
			, Post05  : OpObj.Post05
			, Post06  : OpObj.Post06
			, Post07  : OpObj.Post07
			, Post08  : OpObj.Post08
			, Post09  : OpObj.Post09

			, Post10  : OpObj.Post10
			, Post11  : OpObj.Post11
			, Post12  : OpObj.Post12 
			, Post13  : OpObj.Post13 
			, Post14  : OpObj.Post14 
			, Post15  : OpObj.Post15 

			, Post16a : OpObj.Post16a
			, Post16b : OpObj.Post16b
			, Post16c : OpObj.Post16c

			, Post17  : OpObj.Post17
			, Post18  : OpObj.Post18
			, Post19  : OpObj.Post19
			, Post20  : OpObj.Post20
		}
		$ipadrbg.context.clinix_POSTOp_KNEE_preform.add(newrecord);
		$ipadrbg.context.clinix_POSTOp_KNEE_preform.saveChanges();
		alert("Entries Saved successfully!");
		$scope.LoadKneePOSTForm();
	};

	$scope.checkAll = function() {
		//alert("Hit!");
  		$scope.kneePostForm = {
	        ClinixRID : $scope.clinix.ClinixRID
	        ,PxRID    : $scope.clinix.PxRID

			, Post01  : "1"
			, Post02  : "1"
			, Post03  : "1"
			, Post04  : "1"
			, Post05  : "1"
			, Post06  : "1"
			, Post07  : "1"
			, Post08  : "1"
			, Post09  : "1"

			, Post10  : "1"
			, Post11  : "1"
			, Post12  : "1" 
			, Post13  : "1" 
			, Post14  : "1" 
			, Post15  : "1" 

			, Post16a : "1"
			, Post16b : "1"
			, Post16c : "1"

			, Post17  : "1"
			, Post18  : "1"
			, Post19  : "1"
			, Post20  : "1"
		}
  	};
  	$scope.uncheckAll = function() {
    	$scope.kneePostForm = [];
  	};
});