IOHPEApp.controller('OPKNEE_5Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPKNEE_5 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEE_5 = function(){
    var promise = $ipadrbg.context.jdata_OPKNEE_5.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_5 = pxresult;
      });
    });
  };

  $scope.LoadOPKNEE_5();

  $scope.addNew = function (frmObj) {
    if (frmObj.BloodLoss) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Operative Blood Loass"
        ,OperValue  : frmObj.BloodLoss
      }
      $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    }

    if (frmObj.Closure) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Closure"
        ,OperValue  : frmObj.Closure
      }
      $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    }

    if (frmObj.CompressionDressings) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Compression Dressings Applied"
        ,OperValue  : frmObj.CompressionDressings
      }
      $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    }

    if (frmObj.OperativeCourse) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Operative Course"
        ,OperValue  : frmObj.OperativeCourse
      }
      $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    }

    if (frmObj.Findings) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Operative Findings"
        ,OperValue  : frmObj.Findings
      }
      $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    }

    if (frmObj.Diagnosis) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "POST Operative Diagnosis"
        ,OperValue  : frmObj.Diagnosis
      }
      $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    }

    if (frmObj.OpDuratiion) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Duration of Operation"
        ,OperValue  : frmObj.OpDuratiion
      }
      $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    }

    if (frmObj.XRays) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "X-Rays"
        ,OperValue  : frmObj.XRays
      }
      $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    }

    if (frmObj.Others) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Operative : "Others"
        ,OperValue  : frmObj.Others
      }
      $ipadrbg.context.jdata_OPKNEE_5.add(newrecord);
    }

    $ipadrbg.context.jdata_OPKNEE_5.saveChanges();

    frmObj.BloodLoss = "";
    frmObj.Closure = "";
    frmObj.CompressionDressings = "";
    frmObj.OperativeCourse = "";
    frmObj.Findings = "";
    frmObj.Diagnosis = "";
    frmObj.OpDuratiion = "";
    frmObj.XRays = "";
    frmObj.Others = "";

    $scope.LoadOPKNEE_5();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPKNEE_5;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});