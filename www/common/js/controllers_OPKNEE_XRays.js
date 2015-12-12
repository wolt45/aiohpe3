IOHPEApp.controller('OPKNEE_XRays_Ctrl', function ($scope, $routeParams, $http, $sce){
  //$scope.jdata_OPKNEE_XRays = []; // jdata not actually placed, directly get from lab_results  
  
  $scope.PxRID = 0;
  $scope.AllPreOpKNEExrays = []; // hangers 5, 11 
  $scope.AllPreOpKNEEpictures = []; // hangers 5, 11 
  $scope.AllPreOpKNEEVid = []; // hangers 5, 11 
  $scope.PreOpKneeXray = []; 
  $scope.PreOpKneeVideos = []; 

  $scope.AllPostOpKNEExrays = []; // hangers 12
  $scope.AllPostOpKNEEpictures = []; // hangers 12
  $scope.AllPostOpKNEEVid = []; // hangers 12
  $scope.PostOpKneeXray = []; 
  $scope.PostOpKneeVideos = []; 

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEExrays = function(){
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
  
        //$scope.jdata_OPKNEE_XRays = pxresult;

        $scope.PxRID = pxresult[0]['PxRID'];
        
        $scope.LoadPREOpKNEExraysImgs();
        $scope.LoadPREOpKNEEpictures();
        $scope.LoadPREOpKNEEVid();
        $scope.LoadPOSTOpKNEExraysImgs();  
        $scope.LoadPOSTOpKNEEpictures();  
        $scope.LoadPOSTOpKNEEVid();  
      });
    });
  };

  $scope.LoadOPKNEExrays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREOpKNEExraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1101) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreOpKNEExrays = pxresult;

      });
    });
  };

  $scope.LoadPREOpKNEEpictures = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1110) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreOpKNEEpictures = pxresult;
        // alert("KNEE PRE LABS & XRAYS working");
      });
    });
  };

  $scope.LoadPREOpKNEEVid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1120) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        
        $scope.AllPreOpKNEEVid = pxresult;

        for(var i = 0; i <= $scope.AllPreOpKNEEVid.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+ serverIP +"/dump_labs/" + $scope.AllPreOpKNEEVid[i]['ImageFileName']);
          var viddate = $scope.AllPreOpKNEEVid[i]['RefDate'];
          var vidfile = $scope.AllPreOpKNEEVid[i]['ImageFileName'];

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

  $scope.LoadPOSTOpKNEExraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1130) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostOpKNEExrays = pxresult;
        // alert("KNEE POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpKNEEpictures = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1140) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostOpKNEEpictures = pxresult;
        // alert("KNEE POST PE LABS & XRAYS working");
      });
    });
  }

  $scope.LoadPOSTOpKNEEVid = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 1150) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPostOpKNEEVid = pxresult;
        
        for(var i = 0; i <= $scope.AllPostOpKNEEVid.length; i++) {
          var vidurl = $sce.trustAsResourceUrl("http://"+ serverIP +"/dump_labs/" + $scope.AllPostOpKNEEVid[i]['ImageFileName']);
          var viddate = $scope.AllPostOpKNEEVid[i]['RefDate'];
          var vidfile = $scope.AllPostOpKNEEVid[i]['ImageFileName'];

          newrecord = {
            VideoURL : vidurl
            ,VideoDate : viddate
            ,VideoFileName : vidfile
          }

          $scope.PostOpKneeVideos.push(newrecord);
        }
        
      });
    });
  }

});