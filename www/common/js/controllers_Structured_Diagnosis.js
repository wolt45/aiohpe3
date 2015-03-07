IOHPEApp.controller('DiagnosisCtrl', function ($scope, $routeParams, $http){
  // $scope.clinix_StructuredDiagnosis = [];
  // $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.LoadDiagnosis = function(){
  //   var promise = $ipadrbg.context.clinix_StructuredDiagnosis.filter(function (px) { 
  //     return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
  //   promise.then(function(pxresult) {
  //     $scope.$apply(function () {
  //       $scope.clinix_StructuredDiagnosis = pxresult;
  //     });
  //   });
  // };

  // $scope.LoadDiagnosis();

  // $scope.addNew = function (daignosisObj) {
  //   newrecord = {
  //     ClinixRID : $scope.clinix.ClinixRID
  //     ,PxRID    : $scope.clinix.PxRID

  //     ,StructuredDiagnosis : daignosisObj.DiagTnyMce
  //   }
  //   $ipadrbg.context.clinix_StructuredDiagnosis.add(newrecord);
  //   $ipadrbg.context.clinix_StructuredDiagnosis.saveChanges();

  //   daignosisObj.DiagTnyMce = "";
  //   $scope.LoadDiagnosis();
  // }

  // $scope.removeDiagnosis = function (daignosisObj) {
  //   daignosisObj.remove()
  //   .then(function() {
  //     $scope.$apply(function() {
  //        var diagol = $scope.clinix_StructuredDiagnosis;
  //        diagol.splice(diagol.indexOf(daignosisObj), 1);
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