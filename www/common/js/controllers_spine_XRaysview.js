IOHPEApp.controller('Spine_XRays_Ctrl', function ($scope, $routeParams, $http, $sce){

  $scope.PxRID = 0;
  $scope.AllPreSpinexrays = []; // hangers 4, 9
  $scope.AllPreSpinepictures = []; // hangers 4, 9
  $scope.AllPreSpineVideo = []; // hangers 4, 9
  $scope.PreOpVideos = [{'VideoURL': '', 'VideoDate': '', 'VideoFileName': ''}]; 

  $scope.AllPostSpinexrays = []; // hangers 4, 9, 10
  $scope.AllPostSpinepictures = []; // hangers 4, 9, 10
  $scope.AllPostSpineVid = []; // hangers 4, 9, 10
  $scope.PostOpVideos = [{'VideoURL': '', 'VideoDate': '', 'VideoFileName': ''}]; 

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPSpinexrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        

        $scope.PxRID = pxresult[0]['PxRID'];

        $scope.LoadPRESpinexraysImgs();
        $scope.LoadPRESpinePicture();
        $scope.LoadPRESpineVideo();
        $scope.LoadPOSTOpSpinexraysImgs();
        $scope.LoadPOSTOpSpinePictures();
        $scope.LoadPOSTOpSpineVid();
      });
    });
  };

  $scope.LoadOPSpinexrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPRESpinexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1201) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreSpinexrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPRESpinePicture = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1210) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreSpinepictures = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPRESpineVideo = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1220) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreSpineVideo = pxresult;
        
        for(var i = 0; i <= $scope.AllPreSpineVideo.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://127.0.0.1/dump_labs/" + $scope.AllPreSpineVideo[i]['ImageFileName']);
          var viddate = $scope.AllPreSpineVideo[i]['RefDate'];
          var vidfile = $scope.AllPreSpineVideo[i]['ImageFileName'];

          $scope.PreOpVideos[i]['VideoURL'] = vidurl;
          $scope.PreOpVideos[i]['VideoDate'] = viddate;
          $scope.PreOpVideos[i]['VideoFileName'] = vidfile;
        }


      });
    });
  };


  $scope.LoadPOSTOpSpinexraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1230) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostSpinexrays = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpSpinePictures = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1240) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostSpinepictures = pxresult;
        // alert("HIP POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpSpineVid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1250) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostSpineVid = pxresult;
       
        for(var i = 0; i <= $scope.AllPostSpineVid.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://127.0.0.1/dump_labs/" + $scope.AllPostSpineVid[i]['ImageFileName']);
          var viddate = $scope.AllPostSpineVid[i]['RefDate'];
          var vidfile = $scope.AllPostSpineVid[i]['ImageFileName'];

          $scope.PostOpVideos[i]['VideoURL'] = vidurl;
          $scope.PostOpVideos[i]['VideoDate'] = viddate;
          $scope.PostOpVideos[i]['VideoFileName'] = vidfile;
        }
       
      });
    });
  }

});