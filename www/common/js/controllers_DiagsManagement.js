IOHPEApp.controller('DiagsManagementCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_DiagsManagement = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagsMgmt = function(){
    var promise = $ipadrbg.context.clinix_DiagsManagement.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsManagement = pxresult;

        $scope.DiagsMgmt = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,PhysicalTherapy : pxresult[0]['PhysicalTherapy']
          ,ExerProg_FootAnkle : pxresult[0]['ExerProg_FootAnkle']
          ,ExerProg_QuadsHamstrings : pxresult[0]['ExerProg_QuadsHamstrings']
          ,ExerProg_SLR : pxresult[0]['ExerProg_SLR']
          ,AmbuTraining : pxresult[0]['AmbuTraining']
        }
        
      });
    });
  };

  $scope.LoadDiagsMgmt();

  $scope.addNew = function (daignosisObj) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_DiagsManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID );
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PhysicalTherapy : daignosisObj.PhysicalTherapy
      ,ExerProg_FootAnkle : daignosisObj.ExerProg_FootAnkle
      ,ExerProg_QuadsHamstrings  : daignosisObj.ExerProg_QuadsHamstrings
      ,ExerProg_SLR : daignosisObj.ExerProg_SLR
      ,AmbuTraining : daignosisObj.AmbuTraining
    }
    $ipadrbg.context.clinix_DiagsManagement.add(newrecord);
    $ipadrbg.context.clinix_DiagsManagement.saveChanges();

    alert("Diagnosis Management Data Saved!");

    $scope.LoadDiagsMgmt();
  }

  $scope.removeDiagMgmt = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_DiagsManagement' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
      });
      $scope.DiagsMgmt = [];
    }
  }
});