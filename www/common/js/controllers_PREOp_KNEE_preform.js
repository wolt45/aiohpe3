IOHPEApp.controller('PREOpKNEE_preformCtrl', function ($scope, $routeParams, $http){
	$scope.clinix_PREOp_KNEE_preform = [];

	$scope.ClinixRID = $routeParams.p_clinixrid;

	$scope.LoadKneePreForm = function(){
	    var promise = $ipadrbg.context.clinix_PREOp_KNEE_preform.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
	    promise.then(function(pxresult) {
	      $scope.$apply(function () {
	        $scope.clinix_PREOp_KNEE_preform = pxresult;

          $scope.kneePreform = {
              ClinixRID : $scope.clinix.ClinixRID
              ,PxRID    : $scope.clinix.PxRID

              ,Pre01  : pxresult[0]['Pre01']
              ,Pre02  : pxresult[0]['Pre02']
              ,Pre03  : pxresult[0]['Pre03']
              ,Pre04  : pxresult[0]['Pre04']
              ,Pre05  : pxresult[0]['Pre05']
              ,Pre06  : pxresult[0]['Pre06']
              ,Pre07  : pxresult[0]['Pre07']
              ,Pre08  : pxresult[0]['Pre08']
              ,Pre09  : pxresult[0]['Pre09']
              ,Pre10  : pxresult[0]['Pre10']
              ,Pre11a : pxresult[0]['Pre11a']
              ,Pre11b : pxresult[0]['Pre11b']
              ,Pre11c : pxresult[0]['Pre11c']
              ,Pre11d : pxresult[0]['Pre11d']

              ,Pre12  : pxresult[0]['Pre12']
              ,Pre13a : pxresult[0]['Pre13a']
              ,Pre13b : pxresult[0]['Pre13b']
              ,Pre14  : pxresult[0]['Pre14']
              ,Pre15  : pxresult[0]['Pre15']
          };
	      });
	    });
	  };

 	$scope.LoadKneePreForm();

	$scope.addNew = function (OpObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_PREOp_KNEE_preform' WHERE ClinixRID = " + $scope.ClinixRID);
    });

		newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Pre01 : OpObj.Pre01
      ,Pre02 : OpObj.Pre02
      ,Pre03 : OpObj.Pre03
      ,Pre04 : OpObj.Pre04 
      ,Pre05 : OpObj.Pre05 
      ,Pre06 : OpObj.Pre06 
      ,Pre07 : OpObj.Pre07
      ,Pre08 : OpObj.Pre08 
      ,Pre09 : OpObj.Pre09 
      ,Pre10 : OpObj.Pre10 

      ,Pre11a: OpObj.Pre11a
      ,Pre11b: OpObj.Pre11b
      ,Pre11c: OpObj.Pre11c
      ,Pre11d: OpObj.Pre11d

      ,Pre12 : OpObj.Pre12 
      ,Pre13a: OpObj.Pre13a
      ,Pre13b: OpObj.Pre13b
      ,Pre14 : OpObj.Pre14 
      ,Pre15 : OpObj.Pre15 
		}
    $ipadrbg.context.clinix_PREOp_KNEE_preform.add(newrecord);
		$ipadrbg.context.clinix_PREOp_KNEE_preform.saveChanges();

		alert("Entries Saved successfully!");

		$scope.LoadKneePreForm();
	};

	$scope.checkAll = function() {
    $scope.kneePreform = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Pre01  : "1"
      ,Pre02  : "1"
      ,Pre03  : "1"
      ,Pre04  : "1"
      ,Pre05  : "1"
      ,Pre06  : "1"
      ,Pre07  : "1"
      ,Pre08  : "1"
      ,Pre09  : "1"
      ,Pre10  : "1"

      ,Pre11a : "1"
      ,Pre11b : "1"
      ,Pre11c : "1"
      ,Pre11d : "1"
      
      ,Pre12  : "1"
      ,Pre13a : "1"
      ,Pre13b : "1"
      ,Pre14  : "1"
      ,Pre15  : "1"
    };
	};

	$scope.uncheckAll = function() {
  	$scope.kneePreform = [];
	};
});