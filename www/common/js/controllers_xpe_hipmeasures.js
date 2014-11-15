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

    if (hipMeasures.SupineLeft || hipMeasures.SupineRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : hipMeasures.Supine
        ,Left     : hipMeasures.SupineLeft
        ,Right    : hipMeasures.SupineRight
      }
      $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    }

    if (hipMeasures.DorsalisLeft || hipMeasures.DorsalisRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : hipMeasures.Dorsalis
        ,Left     : hipMeasures.DorsalisLeft
        ,Right    : hipMeasures.DorsalisRight
      }
        $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    }

    if (hipMeasures.Others) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : hipMeasures.Others
        ,Left     : hipMeasures.OthersLeft
        ,Right    : hipMeasures.OthersRight
      }
        $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    }
    $ipadrbg.context.clinix_HipMeasures.saveChanges();

    hipMeasures.SupineLeft = "";
    hipMeasures.SupineRight = "";

    hipMeasures.DorsalisLeft = "";
    hipMeasures.DorsalisRight = "";

    hipMeasures.Others = "";
    hipMeasures.OthersLeft = "";
    hipMeasures.OthersRight = "";

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