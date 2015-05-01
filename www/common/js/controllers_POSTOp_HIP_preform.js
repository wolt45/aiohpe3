IOHPEApp.controller('POSTOpHIP_preformCtrl', function ($scope, $routeParams, $http){
  	$scope.clinix_POSTOp_HIP_preform = [];
  	$scope.ClinixRID = $routeParams.p_clinixrid;

	$scope.LoadPOSTHipPreForm = function() {
	    var promise = $ipadrbg.context.clinix_POSTOp_HIP_preform.filter(function (px) { 
	    	return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
		    $scope.$apply(function () {
		    	if (pxresult.length > 0) {
		    		// alert('HIT Listed');
		    		$scope.clinix_POSTOp_HIP_preform = pxresult;

			        $scope.hipPostform = {
	    		        ClinixRID : $scope.clinix.ClinixRID
	            		,PxRID    : $scope.clinix.PxRID

						,Post01  : pxresult[0]['Post01'] 
						,Post02  : pxresult[0]['Post02'] 
						,Post03  : pxresult[0]['Post03'] 
						,Post04  : pxresult[0]['Post04'] 
						,Post05  : pxresult[0]['Post05'] 
						,Post06  : pxresult[0]['Post06'] 
						,Post07  : pxresult[0]['Post07'] 
						,Post08  : pxresult[0]['Post08'] 
						,Post09  : pxresult[0]['Post09'] 
						,Post10  : pxresult[0]['Post10'] 
						,Post11  : pxresult[0]['Post11'] 
						,Post12  : pxresult[0]['Post12'] 
						,Post13  : pxresult[0]['Post13'] 
						,Post14  : pxresult[0]['Post14'] 
						,Post15  : pxresult[0]['Post15'] 
						,Post16a : pxresult[0]['Post16a'] 
						,Post16b : pxresult[0]['Post16b'] 
						,Post16c : pxresult[0]['Post16c'] 
						,Post16d : pxresult[0]['Post16d'] 
						,Post16e : pxresult[0]['Post16e'] 
						,Post17  : pxresult[0]['Post17'] 
						,Post18  : pxresult[0]['Post18'] 
						,Post19  : pxresult[0]['Post19'] 
						,Post20  : pxresult[0]['Post20'] 
						,Post21  : pxresult[0]['Post21'] 
	            	}
		    	}
		    });
	    });
	};

 	$scope.LoadPOSTHipPreForm();

	$scope.addNew = function (OpObj) {

		newrecord = {
	        ClinixRID : $scope.clinix.ClinixRID
	        ,PxRID    : $scope.clinix.PxRID

			,Post01  : OpObj.Post01 
			,Post02  : OpObj.Post02
			,Post03  : OpObj.Post03 
			,Post04  : OpObj.Post04 
			,Post05  : OpObj.Post05 
			,Post06  : OpObj.Post06 
			,Post07  : OpObj.Post07 
			,Post08  : OpObj.Post08 
			,Post09  : OpObj.Post09 
			,Post10  : OpObj.Post10 
			,Post11  : OpObj.Post11 
			,Post12  : OpObj.Post12 
			,Post13  : OpObj.Post13 
			,Post14  : OpObj.Post14 
			,Post15  : OpObj.Post15 
			,Post16a : OpObj.Post16a 
			,Post16b : OpObj.Post16b 
			,Post16c : OpObj.Post16c 
			,Post16d : OpObj.Post16d 
			,Post16e : OpObj.Post16e 
			,Post17  : OpObj.Post17 
			,Post18  : OpObj.Post18 
			,Post19  : OpObj.Post19 
			,Post20  : OpObj.Post20 
			,Post21  : OpObj.Post21
		}
		$ipadrbg.context.clinix_POSTOp_HIP_preform.add(newrecord);
		$ipadrbg.context.clinix_POSTOp_HIP_preform.saveChanges();

		alert("Entries Saved successfully!");

		$scope.LoadPOSTHipPreForm();
	};

	$scope.checkAll = function() {
    	$scope.hipPostform = {
	        ClinixRID : $scope.clinix.ClinixRID
	        ,PxRID    : $scope.clinix.PxRID

			,Post01  : "1" 
			,Post02  : "1" 
			,Post03  : "1" 
			,Post04  : "1" 
			,Post05  : "1" 
			,Post06  : "1" 
			,Post07  : "1" 
			,Post08  : "1" 
			,Post09  : "1" 
			,Post10  : "1" 
			,Post11  : "1" 
			,Post12  : "1" 
			,Post13  : "1" 
			,Post14  : "1" 
			,Post15  : "1" 
			,Post16a : "1" 
			,Post16b : "1" 
			,Post16c : "1" 
			,Post16d : "1" 
			,Post16e : "1" 
			,Post17  : "1" 
			,Post18  : "1" 
			,Post19  : "1" 
			,Post20  : "1" 
			,Post21  : "1" 
	    };
  	};

  	$scope.uncheckAll = function() {
    	$scope.hipPostform = [];
  	};
});