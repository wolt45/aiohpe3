IOHPEApp.controller('StructuredHospitalizationCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_StructuredHospitalization = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagnosis = function(){
    var promise = $ipadrbg.context.clinix_StructuredHospitalization.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredHospitalization = pxresult;


        $scope.hospitalize = {
            ClinixRID : $scope.clinix.ClinixRID
            ,PxRID    : $scope.clinix.PxRID
            ,DateAdmitted : pxresult[0]['DateAdmitted']
            ,DateDischarged : pxresult[0]['DateDischarged']
            ,HospitalCourse : pxresult[0]['HospitalCourse']
            ,WoundAppearance : pxresult[0]['WoundAppearance']
        };

      });
    });
  };

  $scope.LoadDiagnosis();

  $scope.addNew = function (formArrObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_StructuredHospitalization' WHERE ClinixRID = " + $scope.ClinixRID);
    });

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

    $scope.LoadDiagnosis();
  }

  $scope.removeItem = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_StructuredHospitalization' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.hospitalize = [];
    }
  }
});