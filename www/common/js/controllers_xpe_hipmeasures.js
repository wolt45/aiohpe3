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

    if (hipMeasures.ASISLeft || hipMeasures.ASISRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : "Leg length: ASIS / mm"
        ,Left     : hipMeasures.ASISLeft
        ,Right    : hipMeasures.ASISRight
      }
      $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    }

    if (hipMeasures.ThighLeft || hipMeasures.ThighRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : "Thigh"
        ,Left     : hipMeasures.ThighLeft
        ,Right    : hipMeasures.ThighRight
      }
      $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    }

    if (hipMeasures.LEGLeft || hipMeasures.LEGRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : "LEG Circumference"
        ,Left     : hipMeasures.LEGLeft
        ,Right    : hipMeasures.LEGRight
      }
      $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    }

    if (hipMeasures.DorsalisLeft || hipMeasures.DorsalisRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : "Dorsalis Pedis Pulse"
        ,Left     : hipMeasures.DorsalisLeft
        ,Right    : hipMeasures.DorsalisRight
      }
        $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    }

    if (hipMeasures.OthersLeft || hipMeasures.OthersRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : "Others"
        ,Left     : hipMeasures.OthersLeft
        ,Right    : hipMeasures.OthersRight
      }
        $ipadrbg.context.clinix_HipMeasures.add(newrecord);
    }
    $ipadrbg.context.clinix_HipMeasures.saveChanges();

    hipMeasures.ASISLeft = "";
    hipMeasures.ASISRight = "";
    hipMeasures.ThighLeft = "";
    hipMeasures.ThighRight = "";
    hipMeasures.LEGLeft = "";
    hipMeasures.LEGRight = "";
    hipMeasures.LEGLeft = "";
    hipMeasures.LEGRight = "";

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