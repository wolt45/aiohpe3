IOHPEApp.controller('Knee_XRays_Ctrl', function ($scope, $routeParams, $http, $sce){

  $scope.PxRID = 0;
  $scope.AllPreKneexrays = []; // hangers 4, 9
  $scope.AllPreKneepic = []; // hangers 4, 9
  $scope.AllPreKneevid = []; // hangers 4, 9
  $scope.PreOpSportsKneeVideos = []; // hangers 4, 9


  $scope.AllPostKneexrays = []; // hangers 4, 9, 10
  $scope.AllPostKneepic = []; // hangers 4, 9, 10
  $scope.AllPostKneevid = []; // hangers 4, 9, 10
  $scope.PostOpSportsKneeVideos = []; // hangers 4, 9, 10

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKneexrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPREKneexraysImgs();
        $scope.LoadPREKneepic();
        $scope.LoadPREKneevid();

        $scope.LoadPOSTOpKneexraysImgs();
        $scope.LoadPOSTOpKneepic();
        $scope.LoadPOSTOpKneevid();
      });
    });
  };

  $scope.LoadOPKneexrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREKneexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1601) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreKneexrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREKneepic = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1610) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreKneepic = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREKneevid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1620) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreKneevid = pxresult;
        
          for(var i = 0; i <= $scope.AllPreKneevid.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+ serverIP +"/dump_labs/" + $scope.AllPreKneevid[i]['ImageFileName']);
          var viddate = $scope.AllPreKneevid[i]['RefDate'];
          var vidfile = $scope.AllPreKneevid[i]['ImageFileName'];
          var vidpriority = $scope.AllPreKneevid[i]['Priority'];
          
          newrecord = {
            VideoURL : vidurl
            ,VideoDate : viddate
            ,VideoFileName : vidfile
            ,VideoPriority : vidpriority
          }

          $scope.PreOpSportsKneeVideos.push(newrecord);
        }

      });
    });
  };

  $scope.LoadPOSTOpKneexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1630) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostKneexrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpKneepic = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1640) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostKneepic = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpKneevid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1650) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostKneevid = pxresult;
        
        for(var i = 0; i <= $scope.AllPostKneevid.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+ serverIP +"/dump_labs/" + $scope.AllPostKneevid[i]['ImageFileName']);
          var viddate = $scope.AllPostKneevid[i]['RefDate'];
          var vidfile = $scope.AllPostKneevid[i]['ImageFileName'];
          var vidpriority = $scope.AllPostKneevid[i]['Priority'];
          
          newrecord = {
            VideoURL : vidurl
            ,VideoDate : viddate
            ,VideoFileName : vidfile
            ,VideoPriority : vidpriority
          }

          $scope.PostOpSportsKneeVideos.push(newrecord);
        }

      });
    });
  }

});