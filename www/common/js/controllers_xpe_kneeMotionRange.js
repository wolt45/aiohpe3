IOHPEApp.controller('KneeMotionRangeCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeMotionRange = []; 
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeMotionRange = function(){
    var promise = $ipadrbg.context.clinix_KneeMotionRange.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeMotionRange = pxresult;

        $scope.KneeROM = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,FlexionContracture : pxresult[0]['FlexionContracture']
          ,Extension : pxresult[0]['Extension']
          ,Flexion : pxresult[0]['Flexion']
        }

      });
    });
  };

  $scope.LoadKneeMotionRange();

  $scope.addNew_ROM = function (kneeMotionRange) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_KneeMotionRange' WHERE ClinixRID = " + $scope.clinix.ClinixRID );
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,FlexionContracture : kneeMotionRange.FlexionContracture
      ,Extension          : kneeMotionRange.Extension
      ,Flexion          : kneeMotionRange.Flexion
    }
    $ipadrbg.context.clinix_KneeMotionRange.add(newrecord);
    $ipadrbg.context.clinix_KneeMotionRange.saveChanges();

    alert("KNEE Range of Motion Data Saved!");

    $scope.LoadKneeMotionRange();
  }

  $scope.removeKneeMotionRange = function (kneeMotionRange) {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_KneeMotionRange' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.KneeROM = [];
    }
  }
});