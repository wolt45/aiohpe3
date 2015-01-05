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
      
      ,APStanding       : "AP Standing"
      ,APDegrees        : kneeXRay.APDegrees
      ,APSeverity       : kneeXRay.APSeverity
      ,APMedial         : kneeXRay.APMedial
      ,APLateral        : kneeXRay.APLateral

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

      ,Lateral30           : "Lateral 30"
      ,Lateral30Degrees    : ""
      ,Lateral30Severity   : kneeXRay.Lateral30Severity
      ,Lateral30Medial     : ""
      ,Lateral30Lateral    : ""

      ,LaurinPatella           : "Laurin (patella) Views"
      ,LaurinPatellaDegrees    : ""
      ,LaurinPatellaSeverity   : kneeXRay.LaurinPatellaSeverity
      ,LaurinPatellaMedial     : ""
      ,LaurinPatellaLateral    : ""
      
    }
    $ipadrbg.context.clinix_KneeXRays.add(newrecord);
    $ipadrbg.context.clinix_KneeXRays.saveChanges();

    kneeXRay.APDate           = "";
    kneeXRay.APDegrees        = "";
    kneeXRay.APSeverity       = "";
    kneeXRay.APMedial         = "";
    kneeXRay.APLateral        = "";
    kneeXRay.VarusDegrees     = "";
    kneeXRay.VarusMedial      = "";
    kneeXRay.VarusLateral     = "";
    kneeXRay.ValgusDegrees    = "";
    kneeXRay.ValgusMedial     = "";
    kneeXRay.ValgusLateral    = "";
    kneeXRay.Lateral30Severity = "";
    kneeXRay.LaurinPatellaSeverity = "";

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