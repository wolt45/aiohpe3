IOHPEApp.controller('FootAnkle_XRays_Ctrl', function ($scope, $routeParams, $http){

  $scope.PxRID = 0;
  $scope.AllPreFootAnklexrays = []; // hangers 4, 9
  $scope.AllPostFootAnklexrays = []; // hangers 4, 9, 10

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPFootAnklexrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPREFootAnklexraysImgs();
        $scope.LoadPOSTOpFootAnklexraysImgs();
      });
    });
  };

  $scope.LoadOPFootAnklexrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREFootAnklexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 6) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreFootAnklexrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPOSTOpFootAnklexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 19) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostFootAnklexrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

});