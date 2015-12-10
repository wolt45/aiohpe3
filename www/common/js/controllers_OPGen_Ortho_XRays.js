IOHPEApp.controller('GENORTHO_XRays_Ctrl', function ($scope, $routeParams, $http){

  $scope.PxRID = 0;
  $scope.AllPreGENORTHOxrays = []; // hangers 4, 9
  $scope.AllPreGENORTHOpicture = []; // hangers 4, 9
  $scope.AllPreGENORTHOvid = []; // hangers 4, 9
  $scope.AllPostGENORTHOxrays = []; // hangers 4, 9, 10
  $scope.AllPostGENORTHOpicture = []; // hangers 4, 9, 10
  $scope.AllPostGENORTHOvid = []; // hangers 4, 9, 10

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPGenOrthoxrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPREGENORTHOxraysImgs();
        $scope.LoadPREGENORTHOpicture();
        $scope.LoadPREGENORTHOvid();
        $scope.LoadPOSTOpGENORTHOxraysImgs();
        $scope.LoadPOSTOpGENORTHOpicture();
        $scope.LoadPOSTOpGENORTHOvid();
      });
    });
  };

  $scope.LoadOPGenOrthoxrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREGENORTHOxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1301
) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreGENORTHOxrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREGENORTHOpicture = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1310) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreGENORTHOpicture = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREGENORTHOvid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1320) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreGENORTHOvid = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPOSTOpGENORTHOxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1330) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostGENORTHOxrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  } 

  $scope.LoadPOSTOpGENORTHOpicture = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1340) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostGENORTHOpicture = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpGENORTHOvid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1350) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostGENORTHOvid = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

});