IOHPEApp.controller('DiagsSchedSurgCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_DiagSchedSurgery = [];
  $scope.ClinixRID = $routeParams.p_clinixrid



  $scope.LkUpRVSCodes= [];
  var promise = $ipadrbg.context.jdata_RVS.filter(function (rvsx) { 
    return rvsx.lkup_RVSRID > 0}).order('rvs_description').toLiveArray();
    promise.then(function(rvsresult) {
      $scope.$apply( function () {
      $scope.LkUpRVSCodes = rvsresult;
    });
  });


  $scope.LoadDiagsSchedSurg = function(){
    var promise = $ipadrbg.context.clinix_DiagSchedSurgery.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagSchedSurgery = pxresult;

        $scope.schedSurgeGrp = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,SurgeryType    : pxresult[0]['SurgeryType']
          ,SurgeryDate    : pxresult[0]['SurgeryDate']
          ,Surgeon        : pxresult[0]['Surgeon']
          ,Assistant      : pxresult[0]['Assistant']
          ,Cardio         : pxresult[0]['Cardio']

          ,Anesthesio     : pxresult[0]['Anesthesio']
          ,AnesthesiaType : pxresult[0]['AnesthesiaType']
          ,Hospital       : pxresult[0]['Hospital']
          ,Others         : pxresult[0]['Others']
        }
      });
    });
  };

  $scope.LoadDiagsSchedSurg();

  $scope.addNew = function (daignosisObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_DiagSchedSurgery' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SurgeryType    : daignosisObj.SurgeryType
      ,SurgeryDate    : daignosisObj.SurgeryDate
      ,Surgeon        : daignosisObj.Surgeon
      ,Assistant      : daignosisObj.Assistant
      ,Cardio         : daignosisObj.Cardio
      ,Anesthesio     : daignosisObj.Anesthesio
      ,AnesthesiaType : daignosisObj.AnesthesiaType 
      ,Hospital       : daignosisObj.Hospital
      ,Others         : daignosisObj.Others
    }
    $ipadrbg.context.clinix_DiagSchedSurgery.add(newrecord);
    $ipadrbg.context.clinix_DiagSchedSurgery.saveChanges();

    alert("Diagnosis Surgery Schedule Data Saved!");

    $scope.LoadDiagsSchedSurg();
  }

  $scope.removeSchedSurgery = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_DiagSchedSurgery' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
      });
      $scope.LoadDiagsSchedSurg = [];
    }
  }


    $scope.removeRVS_ROW = function (justTis) {
    if (confirm(justTis + ': Are you sure to Delete this Surgery Type data? ')) {
       var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
       db.transaction(function (tx) {
           tx.executeSql("delete from 'clinix_DiagSchedSurgery' WHERE DiagsSchedSurgRID = " + justTis);
       });
       //$ipadrbg.context.clinix_Diagnosis.saveChanges();
       $scope.LoadDiagsSchedSurg();
     }
  }

  $scope.editDiagnosis_ROW = function (justTis) {
    alert(justTis);
    
  }

  $scope.pickRVS = function (RVSRID, RVSCode, RVSDescription, RVSrvu) {
    var diagsData = RVSCode + " - " + RVSDescription + " - " + RVSrvu;
    $scope.schedSurgeGrp.SurgeryType = diagsData;
  }
});