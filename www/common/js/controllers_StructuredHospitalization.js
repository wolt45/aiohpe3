IOHPEApp.controller('StructuredHospitalizationCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_StructuredHospitalization = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagnosis = function(){
    var promise = $ipadrbg.context.clinix_StructuredHospitalization.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredHospitalization = pxresult;
      });
    });
  };

  $scope.LoadDiagnosis();

  $scope.addNew = function (formArrObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      , DateAdmitted    : formArrObj.DateAdmitted
      , DateDischarged  : formArrObj.DateDischarged
      , HospitalCourse  : formArrObj.HospitalCourse
      , WoundAppearance : formArrObj.WoundAppearance
      , SynchStatus     : 0

    }
    $ipadrbg.context.clinix_StructuredHospitalization.add(newrecord);
    $ipadrbg.context.clinix_StructuredHospitalization.saveChanges();

    formArrObj.DateAdmitted = null;
    formArrObj.DateDischarged = null;
    formArrObj.HospitalCourse = "";
    formArrObj.WoundAppearance = "";

    $scope.LoadDiagnosis();
  }

  $scope.removeItem = function (formArrObj) {
    formArrObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_StructuredHospitalization;
         diagol.splice(diagol.indexOf(formArrObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});