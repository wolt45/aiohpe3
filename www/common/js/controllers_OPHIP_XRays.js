IOHPEApp.controller('OPHIP_XRays_Ctrl', function ($scope, $routeParams, $http){
  //$scope.jdata_OPHIP_XRays = [];
  $scope.PxRID = 0;
  $scope.AllPreOpHIPxrays = []; // hangers 4, 9
  $scope.AllPreOpMediaHIPVid = []; // hangers 22
  $scope.AllPostOpHIPxrays = []; // hangers 4, 9, 10
  $scope.AllPostOpMediaHIPxrays = []; // hangers 23

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPHIPxrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        //$scope.jdata_OPHIP_XRays = pxresult;

        $scope.PxRID = pxresult[0]['PxRID'];
        
        $scope.LoadPREOpHIPxraysImgs();
        $scope.LoadPREOpMediaHIPxraysVid();
        $scope.LoadPOSTOpHIPxraysImgs();
        $scope.LoadPOSTOpMediaHIPxraysVid();
      });
    });
  };

  $scope.LoadOPHIPxrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREOpHIPxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 4 || labs.HangRID == 9) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreOpHIPxrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREOpMediaHIPxraysVid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 22) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreOpMediaHIPVid = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPOSTOpHIPxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 10) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostOpHIPxrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  } 

  $scope.LoadPOSTOpMediaHIPxraysVid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 23) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostOpMediaHIPxrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

});