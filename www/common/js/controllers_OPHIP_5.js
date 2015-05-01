IOHPEApp.controller('OPHIP_5Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPHIP_5 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPHIP_5 = function(){
    var promise = $ipadrbg.context.jdata_OPHIP_5.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_5 = pxresult;

        $scope.ophip5 = {
          ClinixRID : $scope.clinix.ClinixRID
          ,PxRID    : $scope.clinix.PxRID

          ,SurgicalApproach : pxresult[0]['SurgicalApproach']
          ,StabPosterior : pxresult[0]['StabPosterior']
          ,StabAnterior : pxresult[0]['StabAnterior']
          ,HemovacUsed : pxresult[0]['HemovacUsed']
        };

      });
    });
  };

  $scope.LoadOPHIP_5();

  $scope.addNew_SurTeq = function (frmObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_OPHIP_5' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SurgicalApproach : frmObj.SurgicalApproach
      ,StabPosterior  : frmObj.StabPosterior
      ,StabAnterior : frmObj.StabAnterior
      ,HemovacUsed : frmObj.HemovacUsed
    }
    $ipadrbg.context.jdata_OPHIP_5.add(newrecord);
    $ipadrbg.context.jdata_OPHIP_5.saveChanges();

    alert("HIP Surgical Technique Data Saved!");

    $scope.LoadOPHIP_5();
  }

  $scope.removeSurTeq = function (frmObj) {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_5' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
      });
      $scope.ophip5 = [];
    }
  }
});