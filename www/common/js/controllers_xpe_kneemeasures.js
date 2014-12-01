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
    if (kneeMeasure.LegAsisLeft || kneeMeasure.LegAsisRight) {    
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : "Leg length: ASIS"
        ,Left     : kneeMeasure.LegAsisLeft
        ,Right    : kneeMeasure.LegAsisRight
      }
      $ipadrbg.context.clinix_KneeMeasures.add(newrecord);
    }

    if (kneeMeasure.ThighLeft || kneeMeasure.ThighRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : "Thigh"
        ,Left     : kneeMeasure.ThighLeft
        ,Right    : kneeMeasure.ThighRight
      }
      $ipadrbg.context.clinix_KneeMeasures.add(newrecord);
    }

    if (kneeMeasure.LegCircLeft || kneeMeasure.LegCircRight) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Supine   : "LEG Circumference"
        ,Left     : kneeMeasure.LegCircLeft
        ,Right    : kneeMeasure.LegCircRight
      }
      $ipadrbg.context.clinix_KneeMeasures.add(newrecord);
    }

    $ipadrbg.context.clinix_KneeMeasures.saveChanges();

    kneeMeasure.Supine = "Dorsalis Pedis Pulse";
    kneeMeasure.Left = "";
    kneeMeasure.Right = "";

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