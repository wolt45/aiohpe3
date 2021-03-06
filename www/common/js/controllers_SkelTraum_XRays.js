IOHPEApp.controller('SkelTrauma_XRays_Ctrl', function ($scope, $routeParams, $http, $sce){

  $scope.PxRID = 0;
  $scope.AllPreSkelTraumaxrays = []; // hangers 4, 9
  $scope.AllPreSkelTraumapictures = []; // hangers 4, 9
  $scope.AllPreSkelTraumavideo = []; // hangers 4, 9
  $scope.PreOpSkelTraumaVideos = [];
  
  $scope.AllPostSkelTraumaxrays = []; // hangers 4, 9, 10
  $scope.AllPostSkelTraumapicture = []; // hangers 4, 9, 10
  $scope.AllPostSkelTraumavid = []; // hangers 4, 9, 10
  $scope.PostOpSkelTraumaVideos = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPSkelTraumaxrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPRESkelTraumaxraysImgs();
        $scope.LoadPRESkelTraumapicture();
        $scope.LoadPRESkelTraumavideo();
        $scope.LoadPOSTOpSkelTraumaxraysImgs();
        $scope.LoadPOSTOpSkelTraumapicture();
        $scope.LoadPOSTOpSkelTraumavid();
      });
    });
  };

  $scope.LoadOPSkelTraumaxrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPRESkelTraumaxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1401) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreSkelTraumaxrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPRESkelTraumapicture = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1410) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreSkelTraumapictures = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPRESkelTraumavideo = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1420) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreSkelTraumavideo = pxresult;
       
        for(var i = 0; i <= $scope.AllPreSkelTraumavideo.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+ serverIP +"/dump_labs/" + $scope.AllPreSkelTraumavideo[i]['ImageFileName']);
          var viddate = $scope.AllPreSkelTraumavideo[i]['RefDate'];
          var vidfile = $scope.AllPreSkelTraumavideo[i]['ImageFileName'];
          var vidpriority = $scope.AllPreSkelTraumavideo[i]['Priority'];
          
          newrecord = {
            VideoURL : vidurl
            ,VideoDate : viddate
            ,VideoFileName : vidfile
            ,VideoPriority : vidpriority
          }

          $scope.PreOpSkelTraumaVideos.push(newrecord);
        }

      });
    });
  };

  $scope.LoadPOSTOpSkelTraumaxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1430) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostSkelTraumaxrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpSkelTraumapicture = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1440) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostSkelTraumapicture = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpSkelTraumavid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1450) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostSkelTraumavid = pxresult;
        
        for(var i = 0; i <= $scope.AllPostSkelTraumavidx.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+ serverIP +"/dump_labs/" + $scope.AllPostSkelTraumavidx[i]['ImageFileName']);
          var viddate = $scope.AllPostSkelTraumavidx[i]['RefDate'];
          var vidfile = $scope.AllPostSkelTraumavidx[i]['ImageFileName'];
          var vidpriority = $scope.AllPostSkelTraumavidx[i]['Priority'];
          
          newrecord = {
            VideoURL : vidurl
            ,VideoDate : viddate
            ,VideoFileName : vidfile
            ,VideoPriority : vidpriority
          }

          $scope.PostOpSkelTraumaVideos.push(newrecord);
        }

      });
    });
  }

});