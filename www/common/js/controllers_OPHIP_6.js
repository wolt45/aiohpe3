IOHPEApp.controller('OPHIP_6Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPHIP_6 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPHHIP_6 = function(){
    var promise = $ipadrbg.context.jdata_OPHIP_6.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_6 = pxresult;
      });
    });
  };

  $scope.LoadOPHHIP_6();

  $scope.addNew = function (frmObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Operative : "Operative Blood Loass"
      ,OperValue  : frmObj.BloodLoss
    }
    $ipadrbg.context.jdata_OPHIP_6.add(newrecord);


    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Operative : "Closure/Routine"
      ,OperValue  : frmObj.Closure
    }
    $ipadrbg.context.jdata_OPHIP_6.add(newrecord);

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Operative : "Operative Course"
      ,OperValue  : frmObj.OperativeCourse
    }
    $ipadrbg.context.jdata_OPHIP_6.add(newrecord);

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Operative : "Operative Findings"
      ,OperValue  : frmObj.Findings
    }
    $ipadrbg.context.jdata_OPHIP_6.add(newrecord);

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Operative : "POST Operative Diagnosis"
      ,OperValue  : frmObj.Diagnosis
    }
    $ipadrbg.context.jdata_OPHIP_6.add(newrecord);

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Operative : "Duration of Operation"
      ,OperValue  : frmObj.OpDuratiion
    }
    $ipadrbg.context.jdata_OPHIP_6.add(newrecord);

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Operative : "X-Rays"
      ,OperValue  : frmObj.XRays
    }
    $ipadrbg.context.jdata_OPHIP_6.add(newrecord);


    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Operative : "Others"
      ,OperValue  : frmObj.Others
    }
    $ipadrbg.context.jdata_OPHIP_6.add(newrecord);


    $ipadrbg.context.jdata_OPHIP_6.saveChanges();

    frmObj.Operative = "";
    frmObj.OperValue = "";
    
alert("Error deleting item!");

    $scope.LoadOPHHIP_6();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPHIP_6;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});