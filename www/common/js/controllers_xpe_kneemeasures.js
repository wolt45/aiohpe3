IOHPEApp.controller('KneeMeasuresCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeMeasures = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeMeasures = function(){
    var promise = $ipadrbg.context.clinix_KneeMeasures.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeMeasures = pxresult;
      });
    });
  };

  $scope.LoadKneeMeasures();

  $scope.addNew = function (kneeMeasure) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Supine   : kneeMeasure.Supine
      ,Left     : kneeMeasure.Left
      ,Right    : kneeMeasure.Right
    }

    kneeMeasure.Supine = "Dorsalis Pedis Pulse";
    kneeMeasure.Left = "";
    kneeMeasure.Right = "";

    $ipadrbg.context.clinix_KneeMeasures.add(newrecord);
    $ipadrbg.context.clinix_KneeMeasures.saveChanges();

    $scope.LoadKneeMeasures();
  }

  $scope.removeKneeMeasure = function (kneeMeasure) {
    kneeMeasure.remove()
    .then(function() {
      $scope.$apply(function() {
         var hipMeas = $scope.clinix_KneeMeasures;
         hipMeas.splice(hipMeas.indexOf(kneeMeasure), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});