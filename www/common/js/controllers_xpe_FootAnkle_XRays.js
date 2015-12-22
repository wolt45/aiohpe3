IOHPEApp.controller('FootAnkle_XRays_Ctrl', function ($scope, $routeParams, $http, $sce){

  $scope.PxRID = 0;
  $scope.AllPreFootAnklexrays = []; // hangers 4, 9
  $scope.AllPreFootAnklepicture = []; // hangers 4, 9
  $scope.AllPreFootAnkleVid = []; // hangers 4, 9
  $scope.PreOpFootAnkleVideos = []; // hangers 4, 9

  $scope.AllPostFootAnklexrays = []; // hangers 4, 9, 10
  $scope.AllPostFootAnklepicture = []; // hangers 4, 9, 10
  $scope.AllPostFootAnklevid = []; // hangers 4, 9, 10
  $scope.PostOpFootAnkleVideos = []; // hangers 4, 9, 10

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPFootAnklexrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPREFootAnklexraysImgs();
        $scope.LoadPREFootAnklePicture();
        $scope.LoadPREFootAnkleVid();
        $scope.LoadPOSTOpFootAnklexraysImgs();
        $scope.LoadPOSTOpFootAnklePicture();
        $scope.LoadPOSTOpFootAnkleVid();
      });
    });
  };

  $scope.LoadOPFootAnklexrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREFootAnklexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1501) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreFootAnklexrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREFootAnklePicture = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1510) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreFootAnklepicture = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREFootAnkleVid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1520) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreFootAnkleVid = pxresult;
        
         for(var i = 0; i <= $scope.AllPreFootAnkleVid.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+ serverIP +"/dump_labs/" + $scope.AllPreFootAnkleVid[i]['ImageFileName']);
          var viddate = $scope.AllPreFootAnkleVid[i]['RefDate'];
          var vidfile = $scope.AllPreFootAnkleVid[i]['ImageFileName'];
          var vidpriority = $scope.AllPreFootAnkleVid[i]['Priority'];
          
          newrecord = {
            VideoURL : vidurl
            ,VideoDate : viddate
            ,VideoFileName : vidfile
            ,VideoPriority : vidpriority
          }

          $scope.PreOpFootAnkleVideos.push(newrecord);
        }

      });
    });
  };

  $scope.LoadPOSTOpFootAnklexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1530) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostFootAnklexrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpFootAnklePicture = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1540) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostFootAnklepicture = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpFootAnkleVid= function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1545) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostFootAnklevid = pxresult;
       

        for(var i = 0; i <= $scope.AllPostFootAnklevid.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+ serverIP +"/dump_labs/" + $scope.AllPostFootAnklevid[i]['ImageFileName']);
          var viddate = $scope.AllPostFootAnklevid[i]['RefDate'];
          var vidfile = $scope.AllPostFootAnklevid[i]['ImageFileName'];
          var vidpriority = $scope.AllPostFootAnklevid[i]['Priority'];
          
          newrecord = {
            VideoURL : vidurl
            ,VideoDate : viddate
            ,VideoFileName : vidfile
            ,VideoPriority : vidpriority
          }

          $scope.PostOpFootAnkleVideos.push(newrecord);
        }

      });
    });
  }

});