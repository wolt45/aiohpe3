IOHPEApp.controller('StructuredDiagnosisCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_StructuredDiagnosis = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagnosis = function(){
    var promise = $ipadrbg.context.clinix_StructuredDiagnosis.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredDiagnosis = pxresult;
      });
    });
  };

  $scope.LoadDiagnosis();

  $scope.addNew = function (daignosisObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,StructuredDiagnosis : daignosisObj.DiagTnyMce
    }
    $ipadrbg.context.clinix_StructuredDiagnosis.add(newrecord);
    $ipadrbg.context.clinix_StructuredDiagnosis.saveChanges();

    daignosisObj.DiagTnyMce = "";
    $scope.LoadDiagnosis();
  }

  $scope.removeDiagnosis = function (daignosisObj) {
    daignosisObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_StructuredDiagnosis;
         diagol.splice(diagol.indexOf(daignosisObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});