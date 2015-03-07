IOHPEApp.controller('KneeMotionRangeCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeMotionRange = []; 
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeMotionRange = function(){
    var promise = $ipadrbg.context.clinix_KneeMotionRange.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeMotionRange = pxresult;
      });
    });
  };

  $scope.LoadKneeMotionRange();

  $scope.addNew = function (kneeMotionRange) {
    if (kneeMotionRange.FlexionContractureLeft) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_KneeMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID 
            + " AND MotionArea = 'Flexion Contracture'"
            );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Flexion Contracture"
        ,Left     : kneeMotionRange.FlexionContractureLeft
      }
      $ipadrbg.context.clinix_KneeMotionRange.add(newrecord);
    }

    if (kneeMotionRange.ExtensionLeft) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_KneeMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID 
            + " AND MotionArea = 'Extension'"
            );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Extension"
        ,Left     : kneeMotionRange.ExtensionLeft
      }
      $ipadrbg.context.clinix_KneeMotionRange.add(newrecord);
    }

    if (kneeMotionRange.FlexionLeft) {

      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'clinix_KneeMotionRange' WHERE ClinixRID = " 
            + $scope.clinix.ClinixRID 
            + " AND MotionArea = 'Flexion'"
            );
      });

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Flexion"
        ,Left     : kneeMotionRange.FlexionLeft
      }
      $ipadrbg.context.clinix_KneeMotionRange.add(newrecord);
    }

    $ipadrbg.context.clinix_KneeMotionRange.saveChanges();

    kneeMotionRange.FlexionContractureLeft = "";
    kneeMotionRange.ExtensionLeft = "";
    kneeMotionRange.FlexionLeft = "";
    $scope.LoadKneeMotionRange();
  }

  $scope.removeKneeMotionRange = function (kneeMotionRange) {
    kneeMotionRange.remove()
    .then(function() {
      $scope.$apply(function() {
         var kneeMotio = $scope.clinix_KneeMotionRange;
         kneeMotio.splice(kneeMotio.indexOf(kneeMotionRange), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});