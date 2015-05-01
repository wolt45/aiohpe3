IOHPEApp.controller('AmbulatoryStatusCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_AmbuStatus = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadAmbulatoryStatus = function(){
    var promise = $ipadrbg.context.clinix_AmbuStatus.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_AmbuStatus = pxresult;

        $scope.ambulate = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,PhysicalCondition : pxresult[0]['PhysicalCondition']
          ,AmbulatoryAid : pxresult[0]['AmbulatoryAid']
        }
      });
    });
  };

  $scope.LoadAmbulatoryStatus();

  $scope.addNew_AmbuStatus = function (ambulate) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'clinix_AmbuStatus' WHERE ClinixRID = " + $scope.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID : $scope.clinix.PxRID
      ,PhysicalCondition : ambulate.PhysicalCondition 
      ,AmbulatoryAid : ambulate.AmbulatoryAid
    }

    $ipadrbg.context.clinix_AmbuStatus.add(newrecord);
    $ipadrbg.context.clinix_AmbuStatus.saveChanges();

    alert("Data Saved!");
    
    $scope.LoadAmbulatoryStatus();
  }

  $scope.removeAmbuStatus = function (ambulate) {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_AmbuStatus' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ambulate = [];
    }
  }
});