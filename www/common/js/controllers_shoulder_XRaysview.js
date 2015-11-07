IOHPEApp.controller('Shoulder_XRays_Ctrl', function ($scope, $routeParams, $http){

  $scope.PxRID = 0;
  $scope.AllPreShoulderxrays = []; // hangers 4, 9
  $scope.AllPostShoulderxrays = []; // hangers 4, 9, 10

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPShoulderxrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPREShoulderxraysImgs();
        $scope.LoadPOSTOpShoulderxraysImgs();
      });
    });
  };

  $scope.LoadOPShoulderxrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREShoulderxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 8) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreShoulderxrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPOSTOpShoulderxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 20) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostShoulderxrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

});