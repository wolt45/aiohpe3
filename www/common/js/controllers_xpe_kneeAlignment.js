IOHPEApp.controller('KneeAlignmentCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeAlignment = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeAlignment = function(){
    var promise = $ipadrbg.context.clinix_KneeAlignment.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeAlignment = pxresult;
      });
    });
  };

  $scope.LoadKneeAlignment();

  $scope.addNew = function (kneeAlignment) {

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
      ,Valgus     : kneeAlignment.Valgus
    }
    $ipadrbg.context.clinix_KneeAlignment.add(newrecord);
    $ipadrbg.context.clinix_KneeAlignment.saveChanges();

    kneeAlignment.Normal = "";
    kneeAlignment.Alignment = "";
    kneeAlignment.Varus = "";
    kneeAlignment.Valgus = "";

    $scope.LoadKneeAlignment();
  }

  $scope.removeKneeAlignment = function (kneeAlignment) {
    kneeAlignment.remove()
    .then(function() {
      $scope.$apply(function() {
         var kneeAlign = $scope.clinix_KneeAlignment;
         kneeAlign.splice(kneeAlign.indexOf(kneeAlignment), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});