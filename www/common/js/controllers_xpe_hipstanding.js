IOHPEApp.controller('HipStandingCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipStanding = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadHipStanding = function(){
    var promise = $ipadrbg.context.clinix_HipStanding.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipStanding = pxresult;

        $scope.HIPStanding = {
          ClinixRID : $scope.clinix.ClinixRID
          ,PxRID    : $scope.clinix.PxRID

          ,PelvisLevel : pxresult[0]['PelvisLevel']
          ,Trendelenberg : pxresult[0]['Trendelenberg']
        }

      });
    });
  };

  $scope.LoadHipStanding();

  $scope.addNew_HipStanding = function (hipStanding) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'clinix_HipStanding' WHERE ClinixRID = " + $scope.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PelvisLevel    : hipStanding.PelvisLevel
      ,Trendelenberg  : hipStanding.Trendelenberg
    }
    $ipadrbg.context.clinix_HipStanding.add(newrecord);
    $ipadrbg.context.clinix_HipStanding.saveChanges();

    hipStanding.PelvisLevel = "";
    hipStanding.TrendRight = "";

    alert("Hip Measurement Standing Data Saved!");

    $scope.LoadHipStanding();
  }

  $scope.removeHipStanding = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_HipStanding' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.HIPStanding = [];
    }
  }
});