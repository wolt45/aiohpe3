IOHPEApp.controller('Knee_XRays_Ctrl', function ($scope, $routeParams, $http){

  $scope.PxRID = 0;
  $scope.AllPreKneexrays = []; // hangers 4, 9
  $scope.AllPostKneexrays = []; // hangers 4, 9, 10

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKneexrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPREKneexraysImgs();
        $scope.LoadPOSTOpKneexraysImgs();
      });
    });
  };

  $scope.LoadOPKneexrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREKneexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 7) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreKneexrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPOSTOpKneexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 21) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostKneexrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

});