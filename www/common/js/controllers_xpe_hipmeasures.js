IOHPEApp.controller('HipMeasuresCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipMeasures = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadHipMeasures = function(){
    var promise = $ipadrbg.context.clinix_HipMeasures.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipMeasures = pxresult;
      });
    });
  };

  $scope.LoadHipMeasures();

  $scope.addNew = function (hipMeasures) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Supine   : hipMeasures.Supine
      ,Left     : hipMeasures.Left
      ,Right    : hipMeasures.Right
    }

    hipMeasures.Supine = "Dorsalis Pedis Pulse";
    hipMeasures.Left = "";
    hipMeasures.Right = "";

    $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    $ipadrbg.context.clinix_HipMeasures.saveChanges();

    $scope.LoadHipMeasures();
  }

  $scope.removeHipMeasure = function (hipMeasures) {
    hipMeasures.remove()
    .then(function() {
      $scope.$apply(function() {
         var hipMeas = $scope.clinix_HipMeasures;
         hipMeas.splice(hipMeas.indexOf(hipMeasures), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});