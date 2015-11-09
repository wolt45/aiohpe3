IOHPEApp.controller('DiagnosisCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_Diagnosis = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  // populate ICD Object
  $scope.LkUpICDCodes= [];
  var promise = $ipadrbg.context.jdata_ICD10.filter(function (icdx) { 
    return icdx.lkup_ICDRID > 0}).order('icd_description').toLiveArray();
    promise.then(function(icdresult) {
      $scope.$apply( function () {
      $scope.LkUpICDCodes = icdresult;
    });
  });
  // populate ICD Object - end



  $scope.LoadDiagnosis = function(){
    var promise = $ipadrbg.context.clinix_Diagnosis.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
        $scope.clinix_Diagnosis = pxresult;

        $scope.Diagnosis = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,Diagnosis : pxresult[0]['Diagnosis']
        }
      });
    });
  };

  $scope.LoadDiagnosis();



  $scope.addNew_Diagnosis = function (daignosisObj) {

    // var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    // db.transaction(function (tx) {
    //     tx.executeSql("delete from 'clinix_Diagnosis' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    // });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID



      ,Diagnosis : daignosisObj.Diagnosis
    }
    $ipadrbg.context.clinix_Diagnosis.add(newrecord);
    $ipadrbg.context.clinix_Diagnosis.saveChanges();

    //alert("Diagnosis Data Saved!");

    $scope.LoadDiagnosis();
  }

  $scope.removeDiagnosis = function () {
    if (confirm('Are you sure to Delete ALL Diagnosis data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_Diagnosis' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
      });
      $scope.Diagnosis = [];

      $scope.LoadDiagnosis();
    }
  }

  $scope.removeDiagnosis_ROW = function (justTis) {
    if (confirm(justTis + ': Are you sure to Delete this Diagnosis data? ')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_Diagnosis' WHERE DiagnosisRID = " + justTis);
      });
      //$ipadrbg.context.clinix_Diagnosis.saveChanges();
      $scope.LoadDiagnosis();
    }
  }

  $scope.pickICD = function (ICDRID, ICDCode, ICDDescription) {
    var diagsData = ICDCode + " - " + ICDDescription;
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID
      ,Diagnosis        : diagsData
      ,SynchStatus      : 111
    }

    $ipadrbg.context.clinix_Diagnosis.add(newrecord);
    $ipadrbg.context.clinix_Diagnosis.saveChanges();
    // alert("Diagnosis Data Saved!");
    $scope.LoadDiagnosis();
  }
});