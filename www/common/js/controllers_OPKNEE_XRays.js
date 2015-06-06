IOHPEApp.controller('OPKNEE_XRays_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPKNEE_XRays = []; // jdata not actually placed, directly get from lab_results  
  $scope.PxRID = 0;
  $scope.AllPreOpKNEExrays = []; // hangers 5, 11 
  $scope.AllPostOpKNEExrays = []; // hangers 12

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEExrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_XRays = pxresult;

        $scope.PxRID = pxresult[0]['PxRID'];
        
        $scope.LoadPREOpKNEExraysImgs();
        $scope.LoadPOSTOpKNEExraysImgs();  
      });
    });
  };

  $scope.LoadOPKNEExrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREOpKNEExraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 5 || labs.HangRID == 11) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreOpKNEExrays = pxresult;
        // 
        alert("KNEE PRE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPOSTOpKNEExraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 12) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostOpKNEExrays = pxresult;
        // 
        alert("KNEE POST PE LABS & XRAYS working");
      });
    });
  }

});