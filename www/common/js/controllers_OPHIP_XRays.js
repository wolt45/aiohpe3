IOHPEApp.controller('OPHIP_XRays_Ctrl', function ($scope, $routeParams, $http, $sce){
  //$scope.jdata_OPHIP_XRays = [];
  $scope.PxRID = 0;
  $scope.AllPreOpHIPxrays = []; // hangers 4, 9
  $scope.AllPreOpHipPictures = []; // hangers 22
  $scope.AllPreOpMediaHIPVid = []; // hangers 22
  $scope.PreOpVideos = []; 

  $scope.AllPostOpHIPxrays = []; // hangers 4, 9, 10
  $scope.AllPostOpHipPictures = []; // hangers 4, 9, 10
  $scope.AllPostOpMediaHIPVid = []; // hangers 23
  $scope.PostOpVideos = []; 

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPHIPxrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        //$scope.jdata_OPHIP_XRays = pxresult;

        $scope.PxRID = pxresult[0]['PxRID'];
        
        $scope.LoadPREOpHIPxrays();
        $scope.LoadPREOpHIPImgs();
        $scope.LoadPREOpMediaHIPVid();

        $scope.LoadPOSTOpHIPxrays();
        $scope.LoadPOSTOpHIPImgs();
        $scope.LoadPOSTOpMediaHIPVid();
      });
    });
  };

  $scope.LoadOPHIPxrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREOpHIPxrays = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1001) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreOpHIPxrays = pxresult;
      });
    });
  };


  $scope.LoadPREOpHIPImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1010) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreOpHipPictures = pxresult;
      });
    });
  };

  $scope.LoadPREOpMediaHIPVid = function(){
     var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1020) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function() {
        

        $scope.AllPreOpMediaHIPVid = pxresult;
        //$scope.sources = $sce.trustAsResourceUrl("http://"+serverIP+"/dump_labs/433_Burning In The Skies Karaoke (Linkin Park).mp4");
        
        for(var i = 0; i < $scope.AllPreOpMediaHIPVid.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+serverIP+"/dump_labs/" + $scope.AllPreOpMediaHIPVid[i]['ImageFileName']);
          var viddate = $scope.AllPreOpMediaHIPVid[i]['RefDate'];
          var vidfile = $scope.AllPreOpMediaHIPVid[i]['ImageFileName'];

          newrecord = {
            VideoURL : vidurl
            ,VideoDate : viddate
            ,VideoFileName : vidfile
          }
          $scope.PreOpVideos.push(newrecord);
        }
        

      });

    });
  };

  $scope.LoadPOSTOpHIPxrays = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1030) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostOpHIPxrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  } 

    $scope.LoadPOSTOpHIPImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1040) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostOpHipPictures = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPOSTOpMediaHIPVid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1050) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostOpMediaHIPVid = pxresult;
       
        //$scope.sources = $sce.trustAsResourceUrl("http://"+serverIP+"/dump_labs/433_Burning In The Skies Karaoke (Linkin Park).mp4");
        
        for(var i = 0; i < $scope.AllPostOpMediaHIPVid.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+serverIP+"/dump_labs/" + $scope.AllPostOpMediaHIPVid[i]['ImageFileName']);
          var viddate = $scope.AllPostOpMediaHIPVid[i]['RefDate'];
          var vidfile = $scope.AllPostOpMediaHIPVid[i]['ImageFileName'];

          newrecord = {
            VideoURL : vidurl
            ,VideoDate : viddate
            ,VideoFileName : vidfile
          }
          $scope.PostOpVideos.push(newrecord);
        }

      });
    });
  }

});
