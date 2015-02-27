IOHPEApp.controller('OPHIP_1Ctrl', function ($scope, $routeParams, $http){
  // $scope.jdata_OPHIP_1 = [];

  // $scope.ClinixRID = $routeParams.p_clinixrid;

  // // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  // $scope.LoadOPHIP_1 = function(){
  //   var promise = $ipadrbg.context.jdata_OPHIP_1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
  //   promise.then(function(pxresult) {
  //     $scope.$apply(function () {
  //       $scope.jdata_OPHIP_1 = pxresult;
  //     });
  //   });
  // };

  // $scope.LoadOPHIP_1();

  // $scope.addNew = function (frmObj) {
  //   newrecord = {
  //     ClinixRID : $scope.clinix.ClinixRID
  //     ,PxRID    : $scope.clinix.PxRID

  //     ,PreOpDiagnosis : frmObj.PreOpDiagnosis
  //   }
  //   $ipadrbg.context.jdata_OPHIP_1.add(newrecord);
  //   $ipadrbg.context.jdata_OPHIP_1.saveChanges();

  //   frmObj.PreOpDiagnosis = "";
  //   $scope.LoadOPHIP_1();
  // }

  // $scope.removeItem = function (frmObj) {
  //   frmObj.remove()
  //   .then(function() {
  //     $scope.$apply(function() {
  //        var diagol = $scope.jdata_OPHIP_1;
  //        diagol.splice(diagol.indexOf(frmObj), 1);
  //     });
  //   })
  //  .fail(function(err) {
  //      alert("Error deleting item!");
  //  });
  // }

  $scope.clinix_Diagnosis = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagnosis = function(){
    var promise = $ipadrbg.context.clinix_Diagnosis.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_Diagnosis = pxresult;
      });
    });
  };

  $scope.LoadDiagnosis();

  $scope.addNew = function (daignosisObj) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_Diagnosis' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID
      ,Diagnosis     : daignosisObj.DiagTnyMce
    }
    $ipadrbg.context.clinix_Diagnosis.add(newrecord);
    $ipadrbg.context.clinix_Diagnosis.saveChanges();

    daignosisObj.DiagTnyMce = "";
    $scope.LoadDiagnosis();
  }

  $scope.removeDiagnosis = function (daignosisObj) {
    daignosisObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_Diagnosis;
         diagol.splice(diagol.indexOf(daignosisObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});