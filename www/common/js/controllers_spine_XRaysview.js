IOHPEApp.controller('Spine_XRays_Ctrl', function ($scope, $routeParams, $http){

  $scope.PxRID = 0;
  $scope.AllPreSpinexrays = []; // hangers 4, 9
  $scope.AllPostSpinexrays = []; // hangers 4, 9, 10

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPSpinexrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPRESpinexraysImgs();
        $scope.LoadPOSTOpSpinexraysImgs();
      });
    });
  };

  $scope.LoadOPSpinexrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPRESpinexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 8) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreSpinexrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPOSTOpSpinexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 20) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostSpinexrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

});