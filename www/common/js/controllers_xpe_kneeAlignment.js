IOHPEApp.controller('KneeAlignmentCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeAlignment = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeAlignment = function(){
    var promise = $ipadrbg.context.clinix_KneeAlignment.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeAlignment = pxresult;

        $scope.KneeAlignment = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,Normal : pxresult[0]['Normal']
          ,Alignment : pxresult[0]['Alignment']
          ,Varus : pxresult[0]['Varus']
          ,Valgus : pxresult[0]['Valgus']
        }

      });
    });
  };

  $scope.LoadKneeAlignment();

  $scope.addNew_KneeAlignment = function (kneeAlignment) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_KneeAlignment' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Normal    : kneeAlignment.Normal
      ,Alignment : kneeAlignment.Alignment
      ,Varus     : kneeAlignment.Varus
      ,Valgus    : kneeAlignment.Valgus
    }
    $ipadrbg.context.clinix_KneeAlignment.add(newrecord);
    $ipadrbg.context.clinix_KneeAlignment.saveChanges();

    alert("KNEE Alignment Data Saved!");

    $scope.LoadKneeAlignment();
  }

  $scope.removeKneeAlignment = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_KneeAlignment' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.KneeAlignment = [];
    }
  }
});