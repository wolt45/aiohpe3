IOHPEApp.controller('Shoulder_XRays_Ctrl', function ($scope, $routeParams, $http){

  $scope.PxRID = 0;
  $scope.AllPreShoulderxrays = []; // hangers 4, 9
  $scope.AllPreShoulderpic = []; // hangers 4, 9
  $scope.AllPreShouldervid = []; // hangers 4, 9
  $scope.AllPostShoulderxrays = []; // hangers 4, 9, 10
  $scope.AllPostShoulderpic = []; // hangers 4, 9, 10
  $scope.AllPostShouldervid = []; // hangers 4, 9, 10

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPShoulderxrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPREShoulderxraysImgs();
        $scope.LoadPREShoulderPic();
        $scope.LoadPREShoulderVid();
        $scope.LoadPOSTOpShoulderxraysImgs();
        $scope.LoadPOSTOpShoulderPic();
        $scope.LoadPOSTOpShoulderVid();
      });
    });
  };

  $scope.LoadOPShoulderxrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREShoulderxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1701) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreShoulderxrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREShoulderPic = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1710) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreShoulderPic = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREShoulderVid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1720) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreShoulderVid = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPOSTOpShoulderxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1730) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostShoulderxrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpShoulderPic = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1740) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostShoulderPic = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpShoulderVid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1750) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostShoulderVid = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

});