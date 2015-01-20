IOHPEApp.controller('KneeXRaysCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeXRays = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeXRays = function(){
    var promise = $ipadrbg.context.clinix_KneeXRays.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeXRays = pxresult;
      });
    });
  };

  $scope.LoadKneeXRays();

  $scope.addNew = function (kneeXRay) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,APDate           : kneeXRay.APDate
      
      ,APStandingR      : "AP Standing - Right"
      ,APDegreesR       : kneeXRay.APDegreesR
      ,APSeverityR      : kneeXRay.APSeverityR
      ,APMedialR        : kneeXRay.APMedialR
      ,APLateralR       : kneeXRay.APLateralR

      ,APStandingL      : "AP Standing - Left"
      ,APDegreesL       : kneeXRay.APDegreesL
      ,APSeverityL      : kneeXRay.APSeverityL
      ,APMedialL        : kneeXRay.APMedialL
      ,APLateralL       : kneeXRay.APLateralL

      ,Varus            : "Varus Deformity"
      ,VarusDegrees     : kneeXRay.VarusDegrees
      ,VarusSeverity    : ""
      ,VarusMedial      : kneeXRay.VarusMedial
      ,VarusLateral     : kneeXRay.VarusLateral

      ,Valgus           : "Valgus Deformity"
      ,ValgusDegrees    : kneeXRay.ValgusDegrees
      ,ValgusSeverity   : ""
      ,ValgusMedial     : kneeXRay.ValgusMedial
      ,ValgusLateral    : kneeXRay.ValgusLateral

      ,LaurinPatellaSeverityR  : kneeXRay.LaurinPatellaSeverityR
      ,LaurinPatellaSeverityL  : kneeXRay.LaurinPatellaSeverityL
    }
    $ipadrbg.context.clinix_KneeXRays.add(newrecord);
    $ipadrbg.context.clinix_KneeXRays.saveChanges();

    kneeXRay.APDate           = "";

    kneeXRay.APDegreesR       = "";
    kneeXRay.APSeverityR      = "";
    kneeXRay.APMedialR        = "";
    kneeXRay.APLateralR       = "";

    kneeXRay.APDegreesL       = "";
    kneeXRay.APSeverityL      = "";
    kneeXRay.APMedialL        = "";
    kneeXRay.APLateralL       = "";

    kneeXRay.VarusDegrees     = "";
    kneeXRay.VarusMedial      = "";
    kneeXRay.VarusLateral     = "";
    
    kneeXRay.ValgusDegrees    = "";
    kneeXRay.ValgusMedial     = "";
    kneeXRay.ValgusLateral    = "";

    kneeXRay.LaurinPatellaSeverityR = "";
    kneeXRay.LaurinPatellaSeverityL = "";

    $scope.LoadKneeXRays();
  }

  $scope.removeKneeXRays = function (kneeXRay) {
    kneeXRay.remove()
    .then(function() {
      $scope.$apply(function() {
         var hipX = $scope.clinix_KneeXRays;
         hipX.splice(hipX.indexOf(kneeXRay), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});