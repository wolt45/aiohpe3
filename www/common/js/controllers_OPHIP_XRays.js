IOHPEApp.controller('OPHIP_XRays_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPHIP_XRays = [];
  $scope.PxRID = 0;
  $scope.AllPreOpHIPxrays = []; // hangers 4, 9, 10

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPHIPxrays = function(){
    var promise = $ipadrbg.context.jdata_OPHIP_XRays.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_XRays = pxresult;

        $scope.PxRID = pxresult[0]['PxRID'];
        $scope.LoadPREOpHIPxraysImgs();
      });
    });
  };

  $scope.LoadOPHIPxrays();

 // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPREOpHIPxraysImgs = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && (labs.HangRID == 4 || labs.HangRID == 9 || labs.HangRID == 10) } , {id:$scope.PxRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.AllPreOpHIPxrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  }

  $scope.addNewpreOpHIPxray = function (frmObj) {

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,IsPostOp : 1
      ,xrDate : frmObj.xrDate
      ,xrSource : frmObj.xrSource
      ,xrResult : frmObj.xrResult
    }
    $ipadrbg.context.jdata_OPHIP_XRays.add(newrecord);
    $ipadrbg.context.jdata_OPHIP_XRays.saveChanges();

    frmObj.xrDate = "";
    frmObj.xrSource = "";
    frmObj.xrResult = "";

    $scope.LoadOPHIPxrays();
  }

  $scope.removePreHIPXRay = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
        var diagol = $scope.jdata_OPHIP_XRays;
        diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
    .fail(function(err) {
      alert("Error deleting item!");
    });
  }

});