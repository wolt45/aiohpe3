IOHPEApp.controller('ZZZDiagnosisCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_Diagnosis = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagnosis = function(){
    var promise = $ipadrbg.context.clinix_Diagnosis.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_Diagnosis = pxresult;

        // $scope.diagnosed = {
        //   ClinixRID  : $scope.clinix.ClinixRID
        //   ,PxRID     : $scope.clinix.PxRID
        //   ,Diagnosis : pxresult[0]['Diagnosis']
        // }
      });
    });
  };

  $scope.LoadDiagnosis();

  $scope.addNew_StructureDiags = function (daignosisObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_Diagnosis' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID
      ,Diagnosis: daignosisObj.Diagnosis
    }
    $ipadrbg.context.clinix_Diagnosis.add(newrecord);
    $ipadrbg.context.clinix_Diagnosis.saveChanges();



    $scope.LoadDiagnosis();
  }

  // $scope.removeDiagnosis = function (daignosisObj) {
  //   daignosisObj.remove()
  //   .then(function() {
  //     $scope.$apply(function() {
  //        var diagol = $scope.clinix_Diagnosis;
  //        diagol.splice(diagol.indexOf(daignosisObj), 1);
  //     });
  //   })
  //  .fail(function(err) {
  //      alert("Error deleting item!");
  //  });
  // }
});