IOHPEApp.controller('HipMeasuresCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipMeasures = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadHipMeasures = function(){
    var promise = $ipadrbg.context.clinix_HipMeasures.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipMeasures = pxresult;

        $scope.HIPMeasures = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,SupineLength : pxresult[0]['SupineLength']
          ,LR : pxresult[0]['LR']
          ,AbsentNormal : pxresult[0]['AbsentNormal']
          ,Others : pxresult[0]['Others']
        }

      });
    });
  };

  $scope.LoadHipMeasures();

  $scope.addNew_HipMeasures = function (hipMeasures) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'clinix_HipMeasures' WHERE ClinixRID = " + $scope.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SupineLength : hipMeasures.SupineLength
      ,LR           : hipMeasures.LR
      ,Others       : hipMeasures.Others
      ,AbsentNormal : hipMeasures.AbsentNormal
    }
    $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    $ipadrbg.context.clinix_HipMeasures.saveChanges();

    alert("Hip Measurement Supine Data Saved!");
    
    $scope.LoadHipMeasures();
  }

  $scope.removeHipMeasure = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_HipMeasures' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.HIPMeasures = [];
    }
  }
});